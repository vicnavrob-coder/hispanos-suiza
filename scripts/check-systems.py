#!/usr/bin/env python3
"""
Sistema de verificación de estado - HispanosEnSuiza
Verifica el estado de todos los sistemas del proyecto
"""

import os
import json
import subprocess
import urllib.request
import urllib.error
from datetime import datetime
from typing import Dict, Any

# Colores para terminal
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def check_url(url: str, timeout: int = 10) -> Dict[str, Any]:
    """Verifica si una URL responde correctamente"""
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=timeout) as response:
            return {
                'status': 'ok',
                'http_code': response.status,
                'response_time': 'OK'
            }
    except urllib.error.HTTPError as e:
        return {
            'status': 'error',
            'http_code': e.code,
            'error': str(e)
        }
    except Exception as e:
        return {
            'status': 'error',
            'http_code': 0,
            'error': str(e)
        }

def check_api_endpoint(url: str, method: str = 'GET', data: Dict = None) -> Dict[str, Any]:
    """Verifica un endpoint de API"""
    try:
        if method == 'POST' and data:
            data_bytes = json.dumps(data).encode('utf-8')
            req = urllib.request.Request(
                url,
                data=data_bytes,
                headers={
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            )
        else:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

        with urllib.request.urlopen(req, timeout=10) as response:
            body = response.read().decode('utf-8')
            return {
                'status': 'ok',
                'http_code': response.status,
                'response': json.loads(body) if body else None
            }
    except Exception as e:
        return {
            'status': 'error',
            'error': str(e)
        }

def check_vercel_deployment() -> Dict[str, Any]:
    """Verifica el estado del deployment en Vercel"""
    token = os.getenv('VERCEL_TOKEN', '')
    if not token:
        return {'status': 'warning', 'message': 'No VERCEL_TOKEN found'}

    try:
        req = urllib.request.Request(
            'https://api.vercel.com/v6/deployments?limit=1&projectId=prj_hql17gTDPY4Jn1ucW2GbAI94gmFq',
            headers={'Authorization': f'Bearer {token}'}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            if data.get('deployments'):
                latest = data['deployments'][0]
                return {
                    'status': 'ok',
                    'state': latest.get('readyState', 'UNKNOWN'),
                    'created': latest.get('created'),
                    'url': latest.get('url')
                }
    except Exception as e:
        return {'status': 'error', 'error': str(e)}

    return {'status': 'error', 'message': 'No deployments found'}

def check_github_gist(gist_id: str, token: str) -> Dict[str, Any]:
    """Verifica acceso a GitHub Gist (database)"""
    try:
        req = urllib.request.Request(
            f'https://api.github.com/gists/{gist_id}',
            headers={
                'Authorization': f'token {token}',
                'Accept': 'application/vnd.github.v3+json'
            }
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            files = data.get('files', {})
            return {
                'status': 'ok',
                'files_count': len(files),
                'updated_at': data.get('updated_at')
            }
    except Exception as e:
        return {'status': 'error', 'error': str(e)}

def check_env_vars() -> Dict[str, Any]:
    """Verifica variables de entorno críticas"""
    required_vars = [
        'NEWSLETTER_GMAIL_USER',
        'NEWSLETTER_GMAIL_PASS',
        'STRIPE_SECRET_KEY',
        'GITHUB_TOKEN',
    ]

    missing = []
    present = []

    # Check in .env.local
    env_file = os.path.join(os.path.dirname(__file__), '..', '.env.local')
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            content = f.read()
            for var in required_vars:
                if f'{var}=' in content:
                    present.append(var)
                else:
                    missing.append(var)
    else:
        missing = required_vars

    return {
        'status': 'ok' if not missing else 'warning',
        'present': present,
        'missing': missing,
        'total': len(required_vars)
    }

def check_build_status() -> Dict[str, Any]:
    """Verifica si el build local funciona"""
    try:
        # Check if node_modules exists
        node_modules = os.path.join(os.path.dirname(__file__), '..', 'node_modules')
        if not os.path.exists(node_modules):
            return {
                'status': 'warning',
                'message': 'node_modules not found - run npm install'
            }

        # Check package.json
        package_json = os.path.join(os.path.dirname(__file__), '..', 'package.json')
        if os.path.exists(package_json):
            with open(package_json, 'r') as f:
                data = json.load(f)
                return {
                    'status': 'ok',
                    'version': data.get('version'),
                    'dependencies': len(data.get('dependencies', {}))
                }

        return {'status': 'warning', 'message': 'package.json not found'}
    except Exception as e:
        return {'status': 'error', 'error': str(e)}

def generate_report() -> Dict[str, Any]:
    """Genera reporte completo del estado de todos los sistemas"""

    print(f"\n{BLUE}╔══════════════════════════════════════════════════════════════╗{RESET}")
    print(f"{BLUE}║{RESET}        🔍 VERIFICACIÓN DE SISTEMAS - HispanosEnSuiza       {BLUE}║{RESET}")
    print(f"{BLUE}╚══════════════════════════════════════════════════════════════╝{RESET}\n")

    report = {
        'timestamp': datetime.now().isoformat(),
        'systems': {}
    }

    # 1. DEPLOYMENT & HOSTING
    print(f"{BLUE}━━━ 1. DEPLOYMENT & HOSTING ━━━{RESET}")

    print("  • Vercel Production...", end=' ')
    prod_check = check_url('https://hispanosensuiza.ch')
    report['systems']['vercel_production'] = prod_check
    print(f"{GREEN}✓{RESET}" if prod_check['status'] == 'ok' else f"{RED}✗{RESET}")

    print("  • Latest Deployment...", end=' ')
    deploy_check = check_vercel_deployment()
    report['systems']['latest_deployment'] = deploy_check
    if deploy_check['status'] == 'ok':
        print(f"{GREEN}✓{RESET} ({deploy_check.get('state')})")
    else:
        print(f"{YELLOW}⚠{RESET}")

    # 2. FRONTEND PAGES
    print(f"\n{BLUE}━━━ 2. FRONTEND PAGES ━━━{RESET}")

    pages = {
        'Newsletter Landing': 'https://hispanosensuiza.ch/newsletter',
        'Swiss Starter Pack': 'https://hispanosensuiza.ch/productos/swiss-starter-pack',
        'Template Emigrar': 'https://hispanosensuiza.ch/productos/template-emigrar-suiza',
        'Home Page': 'https://hispanosensuiza.ch',
    }

    for name, url in pages.items():
        print(f"  • {name}...", end=' ')
        check = check_url(url)
        report['systems'][f'page_{name.lower().replace(" ", "_")}'] = check
        print(f"{GREEN}✓{RESET} (HTTP {check['http_code']})" if check['status'] == 'ok' else f"{RED}✗{RESET}")

    # 3. API ENDPOINTS
    print(f"\n{BLUE}━━━ 3. API ENDPOINTS ━━━{RESET}")

    print("  • Newsletter API (valid)...", end=' ')
    api_check = check_api_endpoint(
        'https://hispanosensuiza.ch/api/newsletter',
        method='POST',
        data={'email': 'test@example.com', 'nombre': 'Test', 'origen': 'newsletter'}
    )
    report['systems']['api_newsletter_valid'] = api_check
    if api_check['status'] == 'ok':
        resp = api_check.get('response', {})
        is_valid = resp.get('ok') is not None
        print(f"{GREEN}✓{RESET}" if is_valid else f"{YELLOW}⚠{RESET}")
    else:
        print(f"{RED}✗{RESET}")

    print("  • Newsletter API (invalid)...", end=' ')
    api_invalid = check_api_endpoint(
        'https://hispanosensuiza.ch/api/newsletter',
        method='POST',
        data={'email': 'test@example.com', 'nombre': 'Test', 'origen': 'invalid'}
    )
    report['systems']['api_newsletter_invalid'] = api_invalid
    if api_invalid['status'] == 'ok':
        resp = api_invalid.get('response', {})
        rejects = 'error' in resp
        print(f"{GREEN}✓ (rejects correctly){RESET}" if rejects else f"{YELLOW}⚠{RESET}")
    else:
        print(f"{RED}✗{RESET}")

    # 4. DATABASE (GitHub Gist)
    print(f"\n{BLUE}━━━ 4. DATABASE (GitHub Gist) ━━━{RESET}")

    github_token = os.getenv('GITHUB_TOKEN', '')
    if github_token:
        print("  • Subscribers Gist...", end=' ')
        # Gist ID from env or default
        gist_check = check_github_gist(
            'a0c5d852317cdc395f37e9d4f237bd26',  # Template purchases
            github_token
        )
        report['systems']['gist_database'] = gist_check
        print(f"{GREEN}✓{RESET}" if gist_check['status'] == 'ok' else f"{RED}✗{RESET}")
    else:
        print(f"  • Subscribers Gist... {YELLOW}⚠ (no token){RESET}")
        report['systems']['gist_database'] = {'status': 'warning', 'message': 'No GITHUB_TOKEN'}

    # 5. EMAIL SYSTEM
    print(f"\n{BLUE}━━━ 5. EMAIL SYSTEM ━━━{RESET}")

    env_check = check_env_vars()
    report['systems']['environment_variables'] = env_check

    if env_check['status'] == 'ok':
        print(f"  • Gmail SMTP Config... {GREEN}✓{RESET} ({len(env_check['present'])}/{env_check['total']})")
    else:
        print(f"  • Gmail SMTP Config... {YELLOW}⚠{RESET} (missing: {', '.join(env_check['missing'])})")

    # 6. PAYMENT SYSTEM
    print(f"\n{BLUE}━━━ 6. PAYMENT SYSTEM ━━━{RESET}")

    stripe_key = os.getenv('STRIPE_SECRET_KEY', '')
    if stripe_key and stripe_key.startswith('rk_live_'):
        print(f"  • Stripe (LIVE mode)... {GREEN}✓{RESET}")
        report['systems']['stripe_mode'] = {'status': 'ok', 'mode': 'LIVE'}
    elif stripe_key:
        print(f"  • Stripe... {YELLOW}⚠ (TEST mode){RESET}")
        report['systems']['stripe_mode'] = {'status': 'warning', 'mode': 'TEST'}
    else:
        print(f"  • Stripe... {RED}✗ (no key){RESET}")
        report['systems']['stripe_mode'] = {'status': 'error', 'mode': 'MISSING'}

    # 7. BUILD SYSTEM
    print(f"\n{BLUE}━━━ 7. BUILD SYSTEM ━━━{RESET}")

    build_check = check_build_status()
    report['systems']['build_system'] = build_check

    if build_check['status'] == 'ok':
        print(f"  • Dependencies... {GREEN}✓{RESET} ({build_check.get('dependencies')} packages)")
    else:
        print(f"  • Dependencies... {YELLOW}⚠{RESET} ({build_check.get('message')})")

    # SUMMARY
    print(f"\n{BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━{RESET}")

    total_systems = len(report['systems'])
    ok_systems = sum(1 for s in report['systems'].values() if s.get('status') == 'ok')
    warning_systems = sum(1 for s in report['systems'].values() if s.get('status') == 'warning')
    error_systems = sum(1 for s in report['systems'].values() if s.get('status') == 'error')

    print(f"\n{BLUE}RESUMEN:{RESET}")
    print(f"  {GREEN}✓{RESET} Operativos: {ok_systems}/{total_systems}")
    if warning_systems > 0:
        print(f"  {YELLOW}⚠{RESET} Advertencias: {warning_systems}")
    if error_systems > 0:
        print(f"  {RED}✗{RESET} Errores: {error_systems}")

    health_percentage = (ok_systems / total_systems * 100) if total_systems > 0 else 0

    if health_percentage == 100:
        print(f"\n  {GREEN}Estado General: 🟢 EXCELENTE ({health_percentage:.0f}%){RESET}")
    elif health_percentage >= 80:
        print(f"\n  {YELLOW}Estado General: 🟡 BUENO ({health_percentage:.0f}%){RESET}")
    else:
        print(f"\n  {RED}Estado General: 🔴 CRÍTICO ({health_percentage:.0f}%){RESET}")

    report['summary'] = {
        'total': total_systems,
        'ok': ok_systems,
        'warning': warning_systems,
        'error': error_systems,
        'health_percentage': health_percentage
    }

    # Save report
    report_file = os.path.join(os.path.dirname(__file__), '..', 'system-status.json')
    with open(report_file, 'w') as f:
        json.dump(report, f, indent=2)

    print(f"\n  Reporte guardado: system-status.json")
    print()

    return report

if __name__ == '__main__':
    # Load environment variables
    env_file = os.path.join(os.path.dirname(__file__), '..', '.env.local')
    if os.path.exists(env_file):
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    os.environ[key] = value

    generate_report()
