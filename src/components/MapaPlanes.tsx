"use client";

import { useEffect, useRef } from "react";

type Actividad = {
  slug: string;
  nombre: string;
  descripcion: string;
  tipo: string;
  precio?: string;
  gratuito?: boolean;
  duracion?: string;
  dificultad?: string;
  imagen: string;
  coordenadas?: { lat: number; lng: number };
  cantonSlug: string;
  cantonNombre: string;
};

const TIPO_EMOJI: Record<string, string> = {
  senderismo: "🥾", teleferico: "🚡", esqui: "⛷️", lago: "🏊",
  naturaleza: "🌿", cultura: "🏛️", gastronomia: "🧀", urbano: "🏙️",
  nieve: "❄️", ciclismo: "🚴", familia: "👨‍👩‍👧",
};

const TIPO_COLOR: Record<string, string> = {
  senderismo: "#2d6a4f", teleferico: "#1d3557", esqui: "#023e8a",
  lago: "#0077b6", naturaleza: "#386641", cultura: "#7b2d8b",
  gastronomia: "#b5451b", urbano: "#4a4e69", nieve: "#48cae4",
  ciclismo: "#e76f51", familia: "#e9c46a",
};

export default function MapaPlanes({ actividades }: { actividades: Actividad[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    let L: any;
    let map: any;

    async function initMap() {
      L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");

      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      map = L.map(mapRef.current!, {
        center: [46.8182, 8.2275],
        zoom: 8,
        zoomControl: true,
      });

      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Clear existing markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // Add markers for activities with coordinates
      const actividadesConCoordenadas = actividades.filter(a => a.coordenadas);

      actividadesConCoordenadas.forEach(a => {
        if (!a.coordenadas) return;

        const color = TIPO_COLOR[a.tipo] || "#C8102E";
        const emoji = TIPO_EMOJI[a.tipo] || "📍";

        const icon = L.divIcon({
          className: "",
          html: `<div style="
            background: ${color};
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          "><span style="transform: rotate(45deg); font-size: 14px;">${emoji}</span></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -34],
        });

        const popup = `
          <div style="min-width:200px;font-family:system-ui,sans-serif;">
            <img src="${a.imagen}?w=300&q=70&auto=format&fit=crop" alt="${a.nombre}"
              style="width:100%;height:100px;object-fit:cover;border-radius:8px;margin-bottom:8px;"/>
            <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#1a1a2e;">${a.nombre}</div>
            <div style="font-size:11px;color:#666;margin-bottom:6px;">${emoji} ${a.tipo} · ${a.cantonNombre}</div>
            <div style="font-size:11px;color:#444;margin-bottom:8px;line-height:1.4;">
              ${a.descripcion.slice(0, 80)}...
            </div>
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:8px;flex-wrap:wrap;">
              ${a.duracion ? `<span style="font-size:10px;background:#f0f0f0;padding:2px 6px;border-radius:999px;">⏱ ${a.duracion}</span>` : ""}
              ${a.precio ? `<span style="font-size:10px;background:#fff3e0;padding:2px 6px;border-radius:999px;color:#e65100;">💰 ${a.precio}</span>` :
                a.gratuito ? `<span style="font-size:10px;background:#e8f5e9;padding:2px 6px;border-radius:999px;color:#2e7d32;">🆓 Gratis</span>` : ""}
            </div>
            <a href="/planes/${a.cantonSlug}/${a.slug}"
              style="display:block;text-align:center;background:#C8102E;color:white;padding:6px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;">
              Ver detalles →
            </a>
          </div>
        `;

        const marker = L.marker([a.coordenadas.lat, a.coordenadas.lng], { icon })
          .bindPopup(popup, { maxWidth: 240 })
          .addTo(map);

        markersRef.current.push(marker);
      });

      // Fit bounds if there are markers
      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.1));
      }
    }

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [actividades]);

  const conCoordenadas = actividades.filter(a => a.coordenadas).length;
  const sinCoordenadas = actividades.length - conCoordenadas;

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      {sinCoordenadas > 0 && (
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-gray-500 shadow">
          {conCoordenadas} planes en el mapa · {sinCoordenadas} sin ubicación
        </div>
      )}
      {/* Leyenda */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow text-xs">
        {Object.entries(TIPO_EMOJI).slice(0, 6).map(([tipo, emoji]) => (
          <div key={tipo} className="flex items-center gap-1.5 mb-1">
            <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: TIPO_COLOR[tipo] || "#C8102E" }} />
            <span className="text-gray-600">{emoji} {tipo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
