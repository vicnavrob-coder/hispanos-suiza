"use client";
import { useState } from "react";
import Link from "next/link";
import { CIUDADES, type CiudadData } from "@/lib/data";
import { useAuth } from "@/contexts/AuthContext";

// ─── formatters ───────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);
const fmtDec = (n: number) =>
  new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const neto = (bruto: number, c: CiudadData) => Math.round(bruto * (1 - c.tasa - 0.064));

function totalMensual(c: CiudadData) {
  return c.alquiler1HabPeriferia + c.transporte + c.alimentacion + c.seguroMedico + c.ocio;
}
function salarioEquiv(base: CiudadData, dest: CiudadData, sal: number) {
  const ratio = totalMensual(dest) / totalMensual(base);
  return Math.round((sal * (1 - base.tasa) * ratio) / (1 - dest.tasa));
}

// ─── sub-components ───────────────────────────
function RatingBar({ value, max = 5, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300"
          style={{ background: i < value ? color : "#E8E5E0" }} />
      ))}
    </div>
  );
}

const ROWS = [
  { label: "Alquiler 1 hab. centro",    key: "alquiler1HabCentro" as const,    icon: "🏠" },
  { label: "Alquiler 1 hab. periferia", key: "alquiler1HabPeriferia" as const,  icon: "🏡" },
  { label: "Hab. compartida (WG)",      key: "habitacionCompartida" as const,   icon: "🛏️" },
  { label: "Transporte público",        key: "transporte" as const,             icon: "🚆" },
  { label: "Alimentación mensual",      key: "alimentacion" as const,           icon: "🛒" },
  { label: "Restaurante (menú)",        key: "restauranteMedio" as const,       icon: "🍽️" },
  { label: "Café",                      key: "cafe" as const,                   icon: "☕" },
  { label: "Seguro médico KVG",         key: "seguroMedico" as const,           icon: "🛡️" },
  { label: "Ocio mensual",              key: "ocio" as const,                   icon: "🎭" },
];

// ─── City picker card ─────────────────────────
function CityCard({
  ciudad, selected, slot, onSelect,
}: {
  ciudad: CiudadData;
  selected: "A" | "B" | null;
  slot: "A" | "B";
  onSelect: () => void;
}) {
  const isSelected = selected !== null;
  const isOther = selected !== null && selected !== slot;
  return (
    <button
      onClick={onSelect}
      className="relative rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 w-full"
      style={{
        border: isSelected ? `2px solid ${ciudad.color}` : "2px solid #E8E5E0",
        background: isSelected ? ciudad.colorLight : "white",
        opacity: isOther ? 0.45 : 1,
        boxShadow: isSelected ? `0 0 0 3px ${ciudad.color}22` : "none",
      }}
    >
      {isSelected && (
        <span
          className="absolute -top-2.5 -right-2.5 text-white text-xs font-black px-2 py-0.5 rounded-full shadow"
          style={{ background: ciudad.color, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
        >
          {selected}
        </span>
      )}
      <div className="text-2xl mb-1.5">{ciudad.emoji}</div>
      <div className="font-bold text-[#0A0A0A] text-sm leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
        {ciudad.nombre}
      </div>
      <div className="text-xs text-[#9CA3AF] mt-0.5">{ciudad.idioma.split(" ")[0]}</div>
      <div className="text-xs font-semibold mt-2" style={{ color: ciudad.color }}>
        {fmt(totalMensual(ciudad))}/mes
      </div>
    </button>
  );
}

// ─── main page ────────────────────────────────
export default function ComparadorCiudadesPage() {
  const { user, openModal } = useAuth();
  const [slugA, setSlugA] = useState("zurich");
  const [slugB, setSlugB] = useState("ginebra");
  const [salario, setSalario] = useState("6000");
  const [showEquiv, setShowEquiv] = useState(false);

  const A = CIUDADES.find((c) => c.slug === slugA)!;
  const B = CIUDADES.find((c) => c.slug === slugB)!;

  const totalA = totalMensual(A);
  const totalB = totalMensual(B);
  const diff = totalB - totalA;
  const sal = parseFloat(salario) || 6000;
  const maxTotal = Math.max(...CIUDADES.map(totalMensual));

  function selectCity(slug: string) {
    if (slug === slugA) return;
    if (slug === slugB) return;
    // pick the one to replace based on last clicked — toggle: click A city replaces A
    setSlugB(slug);
  }
  function pickA(slug: string) { if (slug !== slugB) setSlugA(slug); }
  function pickB(slug: string) { if (slug !== slugA) setSlugB(slug); }

  function handleEquiv() {
    if (!user) { openModal(() => setShowEquiv(true)); return; }
    setShowEquiv(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* ── breadcrumb + title ── */}
      <div className="mb-6">
        <nav className="text-xs text-[#9CA3AF] mb-3 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#C8102E] transition-colors">Inicio</Link>
          <span>›</span>
          <Link href="/herramientas" className="hover:text-[#C8102E] transition-colors">Herramientas</Link>
          <span>›</span>
          <span className="text-[#6B7280]">Comparador de ciudades</span>
        </nav>
        <h1 className="text-3xl font-black text-[#0A0A0A] leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          Compara el coste de vida<br />
          <span style={{ color: "#C8102E" }}>ciudad por ciudad</span>
        </h1>
        <p className="text-[#6B7280] mt-2 text-sm">
          Selecciona dos ciudades · Compara costes · Calcula tu equivalencia salarial
        </p>
      </div>

      {/* ── city picker ── */}
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-px flex-1" style={{ background: "#E8E5E0" }} />
          <span className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">Elige dos ciudades</span>
          <div className="h-px flex-1" style={{ background: "#E8E5E0" }} />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-3">
          {CIUDADES.map((c) => (
            <CityCard
              key={c.slug}
              ciudad={c}
              selected={c.slug === slugA ? "A" : c.slug === slugB ? "B" : null}
              slot={c.slug === slugA ? "A" : "B"}
              onSelect={() => {
                if (c.slug === slugA || c.slug === slugB) return;
                setSlugB(c.slug);
              }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-1">
          <div>
            <label className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider block mb-1">
              Ciudad A
            </label>
            <select value={slugA} onChange={(e) => pickA(e.target.value)}
              className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-[#0A0A0A] focus:outline-none"
              style={{ border: `2px solid ${A.color}`, background: A.colorLight, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
              {CIUDADES.filter((c) => c.slug !== slugB).map((c) => (
                <option key={c.slug} value={c.slug}>{c.emoji} {c.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-[#9CA3AF] font-semibold uppercase tracking-wider block mb-1">
              Ciudad B
            </label>
            <select value={slugB} onChange={(e) => pickB(e.target.value)}
              className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-[#0A0A0A] focus:outline-none"
              style={{ border: `2px solid ${B.color}`, background: B.colorLight, fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
              {CIUDADES.filter((c) => c.slug !== slugA).map((c) => (
                <option key={c.slug} value={c.slug}>{c.emoji} {c.nombre}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── VS hero ── */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #E8E5E0" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Ciudad A */}
          <div className="p-5 md:p-7" style={{ background: A.colorLight, borderRight: "1px solid #E8E5E0", borderBottom: "1px solid #E8E5E0" }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{A.emoji}</span>
              <div>
                <div className="font-black text-xl text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {A.nombre}
                </div>
                <div className="text-xs text-[#6B7280]">{A.idioma}</div>
              </div>
              <span className="ml-auto text-xs font-black text-white px-2.5 py-1 rounded-full"
                style={{ background: A.color }}>A</span>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="text-xs text-[#9CA3AF] mb-0.5">Coste mensual est.</div>
                <div className="text-3xl font-black" style={{ color: A.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {fmt(totalA)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Salario medio</div>
                  <div className="font-bold text-[#0A0A0A] text-sm">{fmt(A.salarioMedio)}</div>
                </div>
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Impuestos</div>
                  <div className="font-bold text-sm" style={{ color: A.color }}>{(A.tasa * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Alquiler 1 hab.</div>
                  <div className="font-bold text-[#0A0A0A] text-sm">{fmt(A.alquiler1HabPeriferia)}</div>
                </div>
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Seguro médico</div>
                  <div className="font-bold text-[#0A0A0A] text-sm">{fmt(A.seguroMedico)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ciudad B */}
          <div className="p-5 md:p-7" style={{ background: B.colorLight }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{B.emoji}</span>
              <div>
                <div className="font-black text-xl text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {B.nombre}
                </div>
                <div className="text-xs text-[#6B7280]">{B.idioma}</div>
              </div>
              <span className="ml-auto text-xs font-black text-white px-2.5 py-1 rounded-full"
                style={{ background: B.color }}>B</span>
            </div>
            <div className="space-y-2.5">
              <div>
                <div className="text-xs text-[#9CA3AF] mb-0.5">Coste mensual est.</div>
                <div className="text-3xl font-black" style={{ color: B.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {fmt(totalB)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Salario medio</div>
                  <div className="font-bold text-[#0A0A0A] text-sm">{fmt(B.salarioMedio)}</div>
                </div>
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Impuestos</div>
                  <div className="font-bold text-sm" style={{ color: B.color }}>{(B.tasa * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Alquiler 1 hab.</div>
                  <div className="font-bold text-[#0A0A0A] text-sm">{fmt(B.alquiler1HabPeriferia)}</div>
                </div>
                <div className="bg-white rounded-lg p-2.5" style={{ border: "1px solid #E8E5E0" }}>
                  <div className="text-xs text-[#9CA3AF]">Seguro médico</div>
                  <div className="font-bold text-[#0A0A0A] text-sm">{fmt(B.seguroMedico)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* diferencia banner */}
        <div
          className="px-6 py-3 flex items-center justify-center gap-3 text-sm font-semibold"
          style={{
            background: diff > 0 ? "#FFF1F3" : diff < 0 ? "#F0FDF4" : "#F8F6F3",
            borderTop: "1px solid #E8E5E0",
            color: diff > 0 ? "#C8102E" : diff < 0 ? "#15803d" : "#6B7280",
          }}
        >
          {diff === 0 ? (
            <span>Las dos ciudades tienen el mismo coste estimado</span>
          ) : diff > 0 ? (
            <>
              <span>{B.nombre} es</span>
              <span className="text-lg font-black">{fmt(Math.abs(diff))}</span>
              <span>más cara al mes que {A.nombre}</span>
            </>
          ) : (
            <>
              <span>{B.nombre} es</span>
              <span className="text-lg font-black">{fmt(Math.abs(diff))}</span>
              <span>más barata al mes que {A.nombre}</span>
            </>
          )}
        </div>
      </div>

      {/* ── tabla comparativa (duel layout) ── */}
      <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #E8E5E0" }}>
        <div className="overflow-x-auto">
        <div className="min-w-[420px]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 text-xs font-bold uppercase tracking-wider"
          style={{ background: "#F8F6F3", borderBottom: "1px solid #E8E5E0" }}>
          <span style={{ color: A.color }}>{A.emoji} {A.nombre}</span>
          <span className="text-center text-[#9CA3AF] px-4">Concepto</span>
          <span className="text-right" style={{ color: B.color }}>{B.emoji} {B.nombre}</span>
        </div>

        <div className="divide-y" style={{ borderColor: "#F8F6F3" }}>
          {ROWS.map(({ label, key, icon }) => {
            const vA = A[key];
            const vB = B[key];
            const aWins = vA < vB;
            const bWins = vB < vA;
            const isDec = key === "cafe";
            return (
              <div key={key}
                className="grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3.5 hover:bg-[#FAFAF9] transition-colors">
                {/* A */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-base font-black tabular-nums"
                    style={{ color: aWins ? "#15803d" : "#0A0A0A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {isDec ? fmtDec(vA) : fmt(vA)}
                  </span>
                  {aWins && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: "#15803d" }}>✓</span>
                  )}
                </div>
                {/* center label */}
                <div className="text-center px-3">
                  <div className="text-sm">{icon}</div>
                  <div className="text-xs text-[#9CA3AF] whitespace-nowrap">{label}</div>
                </div>
                {/* B */}
                <div className="flex items-center gap-2 justify-end">
                  {bWins && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: "#15803d" }}>✓</span>
                  )}
                  <span
                    className="text-base font-black tabular-nums"
                    style={{ color: bWins ? "#15803d" : "#0A0A0A", fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {isDec ? fmtDec(vB) : fmt(vB)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* total row */}
        <div className="grid grid-cols-2 gap-px" style={{ borderTop: "2px solid #E8E5E0" }}>
          <div className="p-5 text-center" style={{ background: A.colorLight }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: A.color }}>
              Total {A.nombre}
            </div>
            <div className="text-3xl font-black" style={{ color: A.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {fmt(totalA)}
            </div>
            <div className="text-xs text-[#9CA3AF] mt-1">al mes</div>
          </div>
          <div className="p-5 text-center" style={{ background: B.colorLight }}>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: B.color }}>
              Total {B.nombre}
            </div>
            <div className="text-3xl font-black" style={{ color: B.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
              {fmt(totalB)}
            </div>
            <div className="text-xs text-[#9CA3AF] mt-1">al mes</div>
          </div>
        </div>
        </div>{/* end min-w */}
        </div>{/* end overflow-x-auto */}
      </div>

      {/* ── lo que te queda ── */}
      <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #E8E5E0" }}>
        <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid #E8E5E0", background: "#F8F6F3" }}>
          <span className="text-lg">💰</span>
          <h2 className="font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Lo que te queda del salario medio
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-px" style={{ background: "#E8E5E0" }}>
          {[A, B].map((c) => {
            const netoC = neto(c.salarioMedio, c);
            const gastos = totalMensual(c);
            const restante = netoC - gastos;
            const pct = Math.round((restante / netoC) * 100);
            return (
              <div key={c.slug} className="bg-white p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span>{c.emoji}</span>
                  <span className="font-bold text-sm text-[#0A0A0A]">{c.nombre}</span>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Salario neto est.</span>
                    <span className="font-bold text-[#0A0A0A]">{fmt(netoC)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B7280]">Gastos fijos</span>
                    <span className="font-semibold text-[#C8102E]">− {fmt(gastos)}</span>
                  </div>
                  <div className="h-px" style={{ background: "#E8E5E0" }} />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0A0A0A]">Te queda</span>
                    <span className="text-xl font-black" style={{
                      color: restante > 0 ? "#15803d" : "#C8102E",
                      fontFamily: "var(--font-playfair), Georgia, serif"
                    }}>
                      {fmt(restante)}
                    </span>
                  </div>
                </div>
                {/* progress bar */}
                <div className="w-full bg-[#F0EDEA] rounded-full h-2.5 overflow-hidden">
                  <div className="h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(0, pct)}%`, background: restante > 1000 ? "#15803d" : restante > 0 ? c.color : "#C8102E" }} />
                </div>
                <div className="text-xs text-[#9CA3AF] mt-1.5">{pct}% del neto disponible tras gastos</div>
              </div>
            );
          })}
        </div>
        <div className="px-5 py-3 text-xs text-[#9CA3AF]" style={{ borderTop: "1px solid #E8E5E0", background: "#FAFAF9" }}>
          * Gastos = alquiler periferia + transporte + alimentación + seguro médico + ocio estimado. No incluye ropa, viajes ni imprevistos.
        </div>
      </div>

      {/* ── equivalencia salarial (gateada) ── */}
      <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #E8E5E0", background: "white" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #E8E5E0", background: "#0A0A0A" }}>
          <h2 className="font-bold text-white" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            🧮 Equivalencia salarial
          </h2>
          <p className="text-white/60 text-xs mt-0.5">
            ¿Cuánto necesitas en {B.nombre} para vivir igual que en {A.nombre}?
          </p>
        </div>

        <div className="p-5">
          {/* input siempre visible */}
          <div className="flex gap-3 items-end mb-5">
            <div className="flex-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#374151] block mb-1.5">
                Tu salario bruto en {A.nombre}
              </label>
              <div className="relative">
                <input
                  type="number" value={salario}
                  onChange={(e) => { setSalario(e.target.value); setShowEquiv(false); }}
                  min={3000} max={30000} step={500}
                  className="w-full rounded-xl px-4 py-3 font-bold text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#C8102E] pr-16"
                  style={{ border: "1px solid #E8E5E0", background: "#FAFAFA", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#9CA3AF]">CHF</span>
              </div>
            </div>
            <button onClick={handleEquiv}
              className="px-5 py-3 rounded-xl text-white font-bold text-sm whitespace-nowrap transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#C8102E", fontFamily: "var(--font-dm-sans), system-ui, sans-serif" }}>
              {user ? "Calcular →" : "🔒 Ver gratis"}
            </button>
          </div>

          {/* resultado o gate */}
          {showEquiv && user ? (
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
              <div className="rounded-2xl p-5 text-center" style={{ background: A.colorLight, border: `1px solid ${A.color}33` }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: A.color }}>
                  {A.emoji} {A.nombre}
                </div>
                <div className="text-3xl font-black" style={{ color: A.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {fmt(sal)}
                </div>
                <div className="text-xs text-[#9CA3AF] mt-1">bruto/mes</div>
                <div className="text-sm font-bold mt-2 text-[#374151]">≈ {fmt(neto(sal, A))} neto</div>
              </div>

              <div className="text-center flex-shrink-0">
                <div className="text-2xl text-[#9CA3AF] mb-1">⇄</div>
                <div className="text-xs font-semibold" style={{ color: diff > 0 ? "#C8102E" : "#15803d" }}>
                  {diff > 0 ? `+${fmt(Math.abs(diff))}/mes` : `−${fmt(Math.abs(diff))}/mes`}
                </div>
              </div>

              <div className="rounded-2xl p-5 text-center" style={{ background: B.colorLight, border: `1px solid ${B.color}33` }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: B.color }}>
                  {B.emoji} {B.nombre}
                </div>
                <div className="text-3xl font-black" style={{ color: B.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {fmt(salarioEquiv(A, B, sal))}
                </div>
                <div className="text-xs text-[#9CA3AF] mt-1">bruto/mes necesario</div>
                <div className="text-sm font-bold mt-2 text-[#374151]">≈ {fmt(neto(salarioEquiv(A, B, sal), B))} neto</div>
              </div>
            </div>
          ) : !user ? (
            <div className="rounded-2xl p-8 text-center" style={{ background: "#F8F6F3", border: "2px dashed #E8E5E0" }}>
              <div className="w-12 h-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-xl mx-auto mb-3">🔒</div>
              <p className="font-bold text-[#0A0A0A] mb-1">Resultado disponible para miembros</p>
              <p className="text-sm text-[#6B7280] mb-4 max-w-xs mx-auto">
                Regístrate gratis — tarda 30 segundos — y calcula exactamente cuánto necesitas ganar en {B.nombre}.
              </p>
              <button onClick={handleEquiv}
                className="px-7 py-3 rounded-full text-white font-bold text-sm transition-all hover:opacity-90"
                style={{ background: "#C8102E" }}>
                Crear cuenta gratis →
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* ── para hispanohablantes ── */}
      <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #E8E5E0" }}>
        <div className="px-5 py-4" style={{ borderBottom: "1px solid #E8E5E0", background: "#F8F6F3" }}>
          <h2 className="font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Para hispanohablantes
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: "#E8E5E0" }}>
          {[A, B].map((c) => (
            <div key={c.slug} className="p-5">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">{c.emoji}</span>
                <div>
                  <div className="font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{c.nombre}</div>
                  <div className="text-xs text-[#9CA3AF]">{c.idioma}</div>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                {[
                  { label: "Comunidad hispana", val: c.nivelEspanol },
                  { label: "Mercado laboral", val: c.empleabilidad },
                  { label: "Calidad de vida", val: c.calidadVida },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#6B7280]">{label}</span>
                      <span className="font-semibold" style={{ color: c.color }}>{val}/5</span>
                    </div>
                    <RatingBar value={val} color={c.color} />
                  </div>
                ))}
              </div>
              <div className="space-y-1.5">
                {c.pros.map((p) => (
                  <div key={p} className="flex gap-2 text-xs text-[#374151]">
                    <span className="font-bold flex-shrink-0" style={{ color: "#15803d" }}>+</span>
                    {p}
                  </div>
                ))}
                {c.contras.map((p) => (
                  <div key={p} className="flex gap-2 text-xs text-[#374151]">
                    <span className="font-bold flex-shrink-0 text-[#C8102E]">−</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ranking 6 ciudades ── */}
      <div className="bg-white rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid #E8E5E0" }}>
        <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #E8E5E0", background: "#F8F6F3" }}>
          <h2 className="font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Las 6 ciudades — de menor a mayor coste
          </h2>
          <span className="text-xs text-[#9CA3AF]">coste mensual estimado</span>
        </div>
        <div className="p-4 space-y-2.5">
          {[...CIUDADES].sort((a, b) => totalMensual(a) - totalMensual(b)).map((c, i) => {
            const total = totalMensual(c);
            const pct = Math.round((total / maxTotal) * 100);
            const sel = c.slug === slugA || c.slug === slugB;
            return (
              <div key={c.slug}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                style={{ background: sel ? c.colorLight : "transparent", border: sel ? `1px solid ${c.color}33` : "1px solid transparent" }}>
                <span className="text-sm font-black w-5 text-center text-[#9CA3AF]">{i + 1}</span>
                <span className="text-lg w-6">{c.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-[#0A0A0A]">{c.nombre}</span>
                    {sel && (
                      <span className="text-xs font-bold text-white px-1.5 py-0.5 rounded-full"
                        style={{ background: c.color }}>
                        {c.slug === slugA ? "A" : "B"}
                      </span>
                    )}
                    <span className="text-xs text-[#9CA3AF]">{c.idioma.split(" ")[0]}</span>
                  </div>
                  <div className="w-full bg-[#F0EDEA] rounded-full h-1.5 overflow-hidden">
                    <div className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: c.color }} />
                  </div>
                </div>
                <span className="font-black text-sm tabular-nums flex-shrink-0"
                  style={{ color: c.color, fontFamily: "var(--font-playfair), Georgia, serif" }}>
                  {fmt(total)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CTA final ── */}
      <div className="rounded-2xl p-7 text-white" style={{ background: "#0A0A0A", borderTop: "4px solid #C8102E" }}>
        <h3 className="font-black text-xl mb-1.5" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          ¿Ya tienes ciudad elegida?
        </h3>
        <p className="text-white/60 text-sm mb-5">Calcula tu sueldo neto exacto, busca trabajo o encuentra piso.</p>
        <div className="flex flex-wrap gap-2.5">
          <Link href="/herramientas/salario-neto"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: "#C8102E" }}>
            Calculadora salario neto →
          </Link>
          <Link href="/trabajo"
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}>
            Buscar trabajo →
          </Link>
          <Link href="/vivienda"
            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-colors hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.25)", color: "white" }}>
            Buscar vivienda →
          </Link>
        </div>
      </div>
    </div>
  );
}
