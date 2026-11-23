#!/usr/bin/env python3
"""
Script de scraping automático de eventos en Suiza
Recopila eventos de múltiples fuentes y los traduce al español
"""

import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime, timedelta
from anthropic import Anthropic
from github import Github
import re
from typing import List, Dict, Optional
import time

# Configuración
CIUDADES = {
    "zurich": {"nombre": "Zürich", "canton": "Zürich", "idioma": "alemán"},
    "geneva": {"nombre": "Ginebra", "canton": "Genève", "idioma": "francés"},
    "basel": {"nombre": "Basilea", "canton": "Basel-Stadt", "idioma": "alemán"},
    "bern": {"nombre": "Berna", "canton": "Bern", "idioma": "alemán"},
    "lausanne": {"nombre": "Lausana", "canton": "Vaud", "idioma": "francés"},
    "lucerne": {"nombre": "Lucerna", "canton": "Luzern", "idioma": "alemán"},
    "lugano": {"nombre": "Lugano", "canton": "Ticino", "idioma": "italiano"},
    "st-gallen": {"nombre": "St. Gallen", "canton": "St. Gallen", "idioma": "alemán"},
    "winterthur": {"nombre": "Winterthur", "canton": "Zürich", "idioma": "alemán"},
    "biel": {"nombre": "Biel/Bienne", "canton": "Bern", "idioma": "alemán/francés"}
}

CATEGORIAS = {
    "christmas": "🎄 Mercadillos Navideños",
    "culture": "🎭 Cultura y Arte",
    "music": "🎵 Música y Conciertos",
    "sports": "🏃 Deportes",
    "food": "🍴 Gastronomía",
    "festival": "🎊 Festivales",
    "family": "👨‍👩‍👧 Familia y Niños",
    "outdoor": "🌳 Aire Libre",
    "other": "🎉 Otros Eventos"
}

class EventosScraper:
    def __init__(self):
        self.anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
        self.github = Github(os.getenv('GITHUB_TOKEN'))
        self.eventos = []

    def scrape_myswitzerland(self, ciudad_key: str) -> List[Dict]:
        """Scrape eventos de MySwitzerland.com"""
        ciudad = CIUDADES[ciudad_key]
        eventos = []

        try:
            # URL de MySwitzerland para eventos
            url = f"https://www.myswitzerland.com/en/destinations/{ciudad_key}/events/"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }

            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                print(f"⚠️  Error scraping {ciudad['nombre']}: Status {response.status_code}")
                return eventos

            soup = BeautifulSoup(response.content, 'html.parser')

            # Buscar eventos en la página
            # Nota: La estructura puede variar, esto es un ejemplo genérico
            eventos_elements = soup.find_all(['article', 'div'], class_=re.compile('event|card'))

            for elemento in eventos_elements[:10]:  # Limitar a 10 eventos por ciudad
                try:
                    titulo_elem = elemento.find(['h2', 'h3', 'h4'])
                    if not titulo_elem:
                        continue

                    titulo = titulo_elem.get_text(strip=True)

                    # Buscar descripción
                    desc_elem = elemento.find(['p', 'div'], class_=re.compile('desc|text|summary'))
                    descripcion = desc_elem.get_text(strip=True) if desc_elem else ""

                    # Buscar fecha
                    fecha_elem = elemento.find(['time', 'span'], class_=re.compile('date|time'))
                    fecha_texto = fecha_elem.get_text(strip=True) if fecha_elem else ""

                    # Buscar link
                    link_elem = elemento.find('a', href=True)
                    link = link_elem['href'] if link_elem else ""
                    if link and not link.startswith('http'):
                        link = f"https://www.myswitzerland.com{link}"

                    # Buscar imagen
                    img_elem = elemento.find('img')
                    imagen = img_elem.get('src', '') if img_elem else ""
                    if imagen and not imagen.startswith('http'):
                        imagen = f"https://www.myswitzerland.com{imagen}"

                    evento = {
                        'titulo_original': titulo,
                        'descripcion_original': descripcion[:500],  # Limitar descripción
                        'fecha_texto': fecha_texto,
                        'ciudad': ciudad['nombre'],
                        'canton': ciudad['canton'],
                        'idioma_original': ciudad['idioma'],
                        'link': link,
                        'imagen': imagen,
                        'fuente': 'MySwitzerland',
                        'fecha_scraping': datetime.now().isoformat()
                    }

                    eventos.append(evento)

                except Exception as e:
                    print(f"⚠️  Error procesando evento: {e}")
                    continue

            print(f"✅ {ciudad['nombre']}: {len(eventos)} eventos encontrados")

        except Exception as e:
            print(f"❌ Error scraping {ciudad['nombre']}: {e}")

        return eventos

    def scrape_all_sources(self) -> List[Dict]:
        """Scrape todas las fuentes para todas las ciudades"""
        all_eventos = []

        for ciudad_key in CIUDADES.keys():
            print(f"\n🔍 Scraping eventos de {CIUDADES[ciudad_key]['nombre']}...")

            # MySwitzerland
            eventos_ms = self.scrape_myswitzerland(ciudad_key)
            all_eventos.extend(eventos_ms)

            # Pequeña pausa entre requests para ser respetuosos
            time.sleep(1)

        return all_eventos

    def translate_text(self, texto: str, idioma_origen: str) -> str:
        """Traducir texto usando Claude"""
        if not texto or len(texto) < 5:
            return texto

        try:
            message = self.anthropic.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=1024,
                messages=[{
                    "role": "user",
                    "content": f"""Traduce el siguiente texto del {idioma_origen} al español.
Mantén el formato y sé preciso con nombres propios y fechas.

Texto:
{texto}

Traducción al español:"""
                }]
            )

            return message.content[0].text.strip()

        except Exception as e:
            print(f"⚠️  Error traduciendo: {e}")
            return texto

    def categorize_event(self, titulo: str, descripcion: str) -> str:
        """Categorizar evento usando IA"""
        try:
            message = self.anthropic.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=100,
                messages=[{
                    "role": "user",
                    "content": f"""Categoriza este evento en UNA de estas categorías:
- christmas (mercadillos navideños, eventos de Navidad)
- culture (teatro, museos, arte, exposiciones)
- music (conciertos, festivales musicales)
- sports (deportes, carreras, actividades físicas)
- food (gastronomía, mercados, vino)
- festival (festivales generales, celebraciones)
- family (eventos familiares, niños)
- outdoor (naturaleza, hiking, actividades al aire libre)
- other (otros)

Título: {titulo}
Descripción: {descripcion[:200]}

Responde SOLO con la categoría (una palabra):"""
                }]
            )

            categoria = message.content[0].text.strip().lower()
            if categoria in CATEGORIAS:
                return categoria
            return "other"

        except Exception as e:
            print(f"⚠️  Error categorizando: {e}")
            return "other"

    def parse_fecha(self, fecha_texto: str) -> Optional[str]:
        """Intentar parsear fecha a formato ISO"""
        # Implementación básica - puede mejorarse
        try:
            # Buscar patrones de fecha comunes
            # DD.MM.YYYY, DD/MM/YYYY, etc.
            patterns = [
                r'(\d{1,2})\.(\d{1,2})\.(\d{4})',
                r'(\d{1,2})/(\d{1,2})/(\d{4})',
                r'(\d{4})-(\d{1,2})-(\d{1,2})'
            ]

            for pattern in patterns:
                match = re.search(pattern, fecha_texto)
                if match:
                    if pattern == patterns[2]:  # ISO format
                        return f"{match.group(1)}-{match.group(2):0>2}-{match.group(3):0>2}"
                    else:
                        # DD.MM.YYYY or DD/MM/YYYY
                        return f"{match.group(3)}-{match.group(2):0>2}-{match.group(1):0>2}"

            # Si no hay fecha específica, poner "próximamente"
            return None

        except:
            return None

    def process_eventos(self, eventos: List[Dict]) -> List[Dict]:
        """Procesar y enriquecer eventos"""
        procesados = []

        for idx, evento in enumerate(eventos):
            print(f"📝 Procesando evento {idx+1}/{len(eventos)}: {evento['titulo_original'][:50]}...")

            # Traducir título y descripción
            titulo_es = self.translate_text(
                evento['titulo_original'],
                evento['idioma_original']
            )

            descripcion_es = ""
            if evento['descripcion_original']:
                descripcion_es = self.translate_text(
                    evento['descripcion_original'],
                    evento['idioma_original']
                )

            # Categorizar
            categoria = self.categorize_event(titulo_es, descripcion_es)

            # Parsear fecha
            fecha_iso = self.parse_fecha(evento['fecha_texto'])

            # Crear evento procesado
            evento_procesado = {
                'id': f"event_{datetime.now().strftime('%Y%m%d')}_{idx}",
                'titulo': titulo_es,
                'titulo_original': evento['titulo_original'],
                'descripcion': descripcion_es,
                'descripcion_original': evento['descripcion_original'],
                'fecha': fecha_iso if fecha_iso else "Por confirmar",
                'fecha_texto': evento['fecha_texto'],
                'ciudad': evento['ciudad'],
                'canton': evento['canton'],
                'categoria': categoria,
                'categoria_nombre': CATEGORIAS[categoria],
                'idioma_original': evento['idioma_original'],
                'link': evento['link'],
                'imagen': evento['imagen'],
                'fuente': evento['fuente'],
                'fecha_scraping': evento['fecha_scraping'],
                'precio': 'Variable',  # TODO: extraer precio si disponible
                'ubicacion': {
                    'ciudad': evento['ciudad'],
                    'canton': evento['canton']
                }
            }

            procesados.append(evento_procesado)

            # Pausa para no saturar API de Anthropic
            time.sleep(0.5)

        return procesados

    def deduplicate(self, eventos: List[Dict]) -> List[Dict]:
        """Eliminar eventos duplicados"""
        seen = set()
        unicos = []

        for evento in eventos:
            # Crear hash único basado en título + ciudad
            key = f"{evento['titulo']}_{evento['ciudad']}".lower()
            if key not in seen:
                seen.add(key)
                unicos.append(evento)

        print(f"\n🔄 Deduplicación: {len(eventos)} → {len(unicos)} eventos únicos")
        return unicos

    def save_to_gist(self, eventos: List[Dict]):
        """Guardar eventos en GitHub Gist"""
        try:
            gist_id = os.getenv('GIST_ID_EVENTOS')
            if not gist_id:
                print("❌ GIST_ID_EVENTOS no configurado")
                return

            gist = self.github.get_gist(gist_id)

            # Preparar contenido
            data = {
                'eventos': eventos,
                'total': len(eventos),
                'fecha_actualizacion': datetime.now().isoformat(),
                'ciudades': list(CIUDADES.values())
            }

            gist.edit(
                files={'eventos-suiza.json': {'content': json.dumps(data, ensure_ascii=False, indent=2)}}
            )

            print(f"\n✅ Guardados {len(eventos)} eventos en Gist")

        except Exception as e:
            print(f"❌ Error guardando en Gist: {e}")
            # Fallback: guardar localmente
            with open('eventos-backup.json', 'w', encoding='utf-8') as f:
                json.dump({'eventos': eventos}, f, ensure_ascii=False, indent=2)
            print("💾 Backup guardado localmente en eventos-backup.json")

    def run(self):
        """Ejecutar pipeline completo"""
        print("🚀 Iniciando scraping de eventos...")
        print(f"📅 Fecha: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")

        # 1. Scrape todas las fuentes
        eventos_raw = self.scrape_all_sources()
        print(f"\n📊 Total eventos scraped: {len(eventos_raw)}")

        if not eventos_raw:
            print("⚠️  No se encontraron eventos")
            return

        # 2. Procesar y traducir
        print("\n🔄 Procesando y traduciendo eventos...")
        eventos_procesados = self.process_eventos(eventos_raw)

        # 3. Deduplicar
        eventos_unicos = self.deduplicate(eventos_procesados)

        # 4. Guardar
        self.save_to_gist(eventos_unicos)

        print("\n✅ ¡Scraping completado exitosamente!")
        print(f"📊 Resumen: {len(eventos_unicos)} eventos guardados")

        # Resumen por ciudad
        from collections import Counter
        ciudades_count = Counter([e['ciudad'] for e in eventos_unicos])
        print("\n📍 Eventos por ciudad:")
        for ciudad, count in ciudades_count.most_common():
            print(f"  - {ciudad}: {count}")

        # Resumen por categoría
        categorias_count = Counter([e['categoria_nombre'] for e in eventos_unicos])
        print("\n🏷️  Eventos por categoría:")
        for cat, count in categorias_count.most_common():
            print(f"  - {cat}: {count}")


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    scraper = EventosScraper()
    scraper.run()
