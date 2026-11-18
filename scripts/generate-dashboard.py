#!/usr/bin/env python3
"""
Genera dashboard HTML con estado de todos los sistemas
"""

import os
import json
import subprocess
from datetime import datetime

def generate_html_dashboard():
    """Genera dashboard HTML interactivo"""

    # Primero ejecutar check-systems para obtener datos frescos
    print("🔍 Verificando estado de sistemas...")
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    check_script = os.path.join(script_dir, 'check-systems.py')
    subprocess.run(['python3', check_script], cwd=project_dir)

    # Leer el reporte generado
    report_file = os.path.join(script_dir, '..', 'system-status.json')
    if not os.path.exists(report_file):
        print("❌ No se encontró system-status.json")
        return

    with open(report_file, 'r') as f:
        report = json.load(f)

    # Generar HTML
    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - HispanosEnSuiza</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 2rem;
        }}

        .container {{
            max-width: 1400px;
            margin: 0 auto;
        }}

        .header {{
            background: white;
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }}

        .header h1 {{
            color: #1a202c;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 1rem;
        }}

        .header .subtitle {{
            color: #718096;
            font-size: 1rem;
        }}

        .header .timestamp {{
            color: #a0aec0;
            font-size: 0.875rem;
            margin-top: 1rem;
        }}

        .summary-cards {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }}

        .summary-card {{
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }}

        .summary-card h3 {{
            color: #718096;
            font-size: 0.875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 0.5rem;
        }}

        .summary-card .value {{
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }}

        .summary-card .label {{
            color: #a0aec0;
            font-size: 0.875rem;
        }}

        .card-ok {{ border-left: 4px solid #48bb78; }}
        .card-ok .value {{ color: #48bb78; }}

        .card-warning {{ border-left: 4px solid #ed8936; }}
        .card-warning .value {{ color: #ed8936; }}

        .card-error {{ border-left: 4px solid #f56565; }}
        .card-error .value {{ color: #f56565; }}

        .health-indicator {{
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            border-radius: 999px;
            font-weight: 600;
            font-size: 0.875rem;
        }}

        .health-excellent {{
            background: #c6f6d5;
            color: #22543d;
        }}

        .health-good {{
            background: #feebc8;
            color: #7c2d12;
        }}

        .health-critical {{
            background: #fed7d7;
            color: #742a2a;
        }}

        .systems-grid {{
            display: grid;
            gap: 1.5rem;
        }}

        .system-section {{
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }}

        .system-section h2 {{
            color: #1a202c;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }}

        .system-items {{
            display: grid;
            gap: 1rem;
        }}

        .system-item {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;
            border-radius: 8px;
            background: #f7fafc;
            border-left: 3px solid transparent;
            transition: all 0.2s;
        }}

        .system-item:hover {{
            transform: translateX(4px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }}

        .system-item.ok {{ border-left-color: #48bb78; }}
        .system-item.warning {{ border-left-color: #ed8936; }}
        .system-item.error {{ border-left-color: #f56565; }}

        .system-name {{
            font-weight: 500;
            color: #2d3748;
            flex: 1;
        }}

        .system-status {{
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }}

        .status-icon {{
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }}

        .status-icon.ok {{ background: #48bb78; }}
        .status-icon.warning {{ background: #ed8936; }}
        .status-icon.error {{ background: #f56565; }}

        .status-text {{
            font-size: 0.875rem;
            color: #718096;
        }}

        .status-detail {{
            font-size: 0.75rem;
            color: #a0aec0;
            margin-left: 1rem;
        }}

        .refresh-btn {{
            background: #667eea;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 2rem;
        }}

        .refresh-btn:hover {{
            background: #5a67d8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }}

        .footer {{
            text-align: center;
            color: white;
            margin-top: 2rem;
            font-size: 0.875rem;
            opacity: 0.8;
        }}

        @media (max-width: 768px) {{
            body {{ padding: 1rem; }}
            .header h1 {{ font-size: 1.75rem; }}
            .summary-cards {{ grid-template-columns: 1fr; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>
                🇨🇭 Dashboard HispanosEnSuiza
                <span class="health-indicator health-{get_health_class(report['summary']['health_percentage'])}">
                    {get_health_icon(report['summary']['health_percentage'])} {report['summary']['health_percentage']:.0f}% Operativo
                </span>
            </h1>
            <p class="subtitle">Monitor en tiempo real de todos los sistemas</p>
            <p class="timestamp">Última actualización: {datetime.fromisoformat(report['timestamp']).strftime('%d/%m/%Y %H:%M:%S')}</p>
        </div>

        <div class="summary-cards">
            <div class="summary-card card-ok">
                <h3>Operativos</h3>
                <div class="value">{report['summary']['ok']}</div>
                <div class="label">Sistemas funcionando</div>
            </div>

            <div class="summary-card card-warning">
                <h3>Advertencias</h3>
                <div class="value">{report['summary']['warning']}</div>
                <div class="label">Requieren atención</div>
            </div>

            <div class="summary-card card-error">
                <h3>Errores</h3>
                <div class="value">{report['summary']['error']}</div>
                <div class="label">Fallos críticos</div>
            </div>

            <div class="summary-card">
                <h3>Total</h3>
                <div class="value" style="color: #667eea;">{report['summary']['total']}</div>
                <div class="label">Sistemas monitoreados</div>
            </div>
        </div>

        <div class="systems-grid">
            {generate_sections_html(report['systems'])}
        </div>

        <button class="refresh-btn" onclick="location.reload()">🔄 Actualizar Estado</button>

        <div class="footer">
            Dashboard generado automáticamente • HispanosEnSuiza © 2026
        </div>
    </div>

    <script>
        // Auto-refresh cada 5 minutos
        setTimeout(() => location.reload(), 300000);
    </script>
</body>
</html>
"""

    # Guardar HTML
    dashboard_file = os.path.join(script_dir, '..', 'dashboard.html')
    with open(dashboard_file, 'w', encoding='utf-8') as f:
        f.write(html)

    print(f"\n✅ Dashboard generado: {dashboard_file}")
    print(f"   Abrir con: open dashboard.html\n")

    return dashboard_file

def get_health_class(percentage):
    """Retorna clase CSS según porcentaje de salud"""
    if percentage == 100:
        return 'excellent'
    elif percentage >= 80:
        return 'good'
    else:
        return 'critical'

def get_health_icon(percentage):
    """Retorna emoji según porcentaje de salud"""
    if percentage == 100:
        return '🟢'
    elif percentage >= 80:
        return '🟡'
    else:
        return '🔴'

def generate_sections_html(systems):
    """Genera HTML de las secciones de sistemas"""

    sections = {
        'Deployment & Hosting': [
            'vercel_production',
            'latest_deployment'
        ],
        'Frontend Pages': [
            'page_newsletter_landing',
            'page_swiss_starter_pack',
            'page_template_emigrar',
            'page_home_page'
        ],
        'API Endpoints': [
            'api_newsletter_valid',
            'api_newsletter_invalid'
        ],
        'Database & Storage': [
            'gist_database'
        ],
        'Email System': [
            'environment_variables'
        ],
        'Payment System': [
            'stripe_mode'
        ],
        'Build System': [
            'build_system'
        ]
    }

    section_icons = {
        'Deployment & Hosting': '🚀',
        'Frontend Pages': '📄',
        'API Endpoints': '🔌',
        'Database & Storage': '💾',
        'Email System': '📧',
        'Payment System': '💳',
        'Build System': '🔧'
    }

    html = ''

    for section_name, system_keys in sections.items():
        icon = section_icons.get(section_name, '📦')
        html += f'''
        <div class="system-section">
            <h2>{icon} {section_name}</h2>
            <div class="system-items">
        '''

        for key in system_keys:
            if key in systems:
                system = systems[key]
                status = system.get('status', 'unknown')
                name = format_system_name(key)

                detail = ''
                if status == 'ok':
                    if 'http_code' in system:
                        detail = f"HTTP {system['http_code']}"
                    elif 'state' in system:
                        detail = system['state']
                    elif 'mode' in system:
                        detail = f"Mode: {system['mode']}"
                    elif 'files_count' in system:
                        detail = f"{system['files_count']} files"
                    elif 'dependencies' in system:
                        detail = f"{system['dependencies']} packages"
                    elif 'present' in system:
                        detail = f"{len(system['present'])}/{system['total']} vars"
                elif 'error' in system:
                    detail = system['error'][:50]
                elif 'message' in system:
                    detail = system['message']

                status_text = {
                    'ok': 'Operativo',
                    'warning': 'Advertencia',
                    'error': 'Error'
                }.get(status, 'Desconocido')

                html += f'''
                <div class="system-item {status}">
                    <span class="system-name">{name}</span>
                    <div class="system-status">
                        <span class="status-icon {status}"></span>
                        <span class="status-text">{status_text}</span>
                        {f'<span class="status-detail">{detail}</span>' if detail else ''}
                    </div>
                </div>
                '''

        html += '''
            </div>
        </div>
        '''

    return html

def format_system_name(key):
    """Formatea el nombre del sistema"""
    names = {
        'vercel_production': 'Vercel Production',
        'latest_deployment': 'Latest Deployment',
        'page_newsletter_landing': 'Newsletter Landing',
        'page_swiss_starter_pack': 'Swiss Starter Pack',
        'page_template_emigrar': 'Template Emigrar Suiza',
        'page_home_page': 'Home Page',
        'api_newsletter_valid': 'Newsletter API (valid input)',
        'api_newsletter_invalid': 'Newsletter API (validation)',
        'gist_database': 'GitHub Gist Database',
        'environment_variables': 'Environment Variables',
        'stripe_mode': 'Stripe Payment Gateway',
        'build_system': 'Build Dependencies'
    }
    return names.get(key, key.replace('_', ' ').title())

if __name__ == '__main__':
    generate_html_dashboard()
