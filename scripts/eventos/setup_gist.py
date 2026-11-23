#!/usr/bin/env python3
"""
Script para crear el Gist inicial de eventos
"""

from github import Github, InputFileContent
import os
import json
from dotenv import load_dotenv

load_dotenv()

def create_eventos_gist():
    """Crear Gist para almacenar eventos"""
    github = Github(os.getenv('GITHUB_TOKEN'))
    user = github.get_user()

    # Contenido inicial
    initial_data = {
        'eventos': [],
        'total': 0,
        'fecha_actualizacion': '',
        'ciudades': [
            {"nombre": "Zürich", "canton": "Zürich"},
            {"nombre": "Ginebra", "canton": "Genève"},
            {"nombre": "Basilea", "canton": "Basel-Stadt"},
            {"nombre": "Berna", "canton": "Bern"},
            {"nombre": "Lausana", "canton": "Vaud"},
            {"nombre": "Lucerna", "canton": "Luzern"},
            {"nombre": "Lugano", "canton": "Ticino"},
            {"nombre": "St. Gallen", "canton": "St. Gallen"},
            {"nombre": "Winterthur", "canton": "Zürich"},
            {"nombre": "Biel/Bienne", "canton": "Bern"}
        ]
    }

    content = json.dumps(initial_data, ensure_ascii=False, indent=2)

    gist = user.create_gist(
        public=False,
        files={'eventos-suiza.json': InputFileContent(content)},
        description='Eventos en Suiza para HispanosEnSuiza.ch'
    )

    print(f"✅ Gist creado exitosamente!")
    print(f"📋 Gist ID: {gist.id}")
    print(f"🔗 URL: {gist.html_url}")
    print(f"\n⚙️  Agrega estas variables a .env.local:")
    print(f"GIST_ID_EVENTOS={gist.id}")
    print(f"NEXT_PUBLIC_GIST_ID_EVENTOS={gist.id}")

    return gist.id

if __name__ == "__main__":
    create_eventos_gist()
