"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type Subscriber = {
  email: string;
  nombre?: string;
  createdAt?: string;
  welcomeStep: number;
  welcomeStart?: string;
  blacklisted?: boolean;
};

type User = {
  email: string;
  nombre?: string;
  provider: string;
  createdAt?: string;
  loginCount?: number;
};

type Cita = {
  status: string;
};

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [filterStep, setFilterStep] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get('token') || '';

  useEffect(() => {
    async function loadData() {
      try {
        const [contactsRes, usersRes, citasRes] = await Promise.all([
          fetch(`/api/admin/subscribers?token=${token}`).catch(() => ({ json: async () => [] })),
          fetch(`/api/admin/users?token=${token}`).catch(() => ({ json: async () => ({ users: [] }) })),
          fetch(`/api/admin/citas?token=${token}`).catch(() => ({ json: async () => [] })),
        ]);

        const contactsData = await contactsRes.json();
        const usersData = await usersRes.json();
        const citasData = await citasRes.json();

        // Check for authorization errors
        if (contactsData?.error === 'Unauthorized' || usersData?.error === 'Unauthorized' || citasData?.error === 'Unauthorized') {
          setError('No autorizado. Token inválido.');
          setLoading(false);
          return;
        }

        setContacts(Array.isArray(contactsData) ? contactsData : []);
        setUsers(Array.isArray(usersData?.users) ? usersData.users : []);
        setCitas(Array.isArray(citasData) ? citasData : []);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C8102E] border-t-transparent"></div>
          <p className="mt-4 text-slate-600 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Acceso Denegado</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a
            href="/admin?token=hispanos-admin-2026"
            className="inline-block bg-[#C8102E] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A00D24] transition-colors"
          >
            Intentar de nuevo
          </a>
        </div>
      </div>
    );
  }

  // Stats calculation
  const now = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Zurich' });
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  const usersStats = {
    total: users.length,
    google: users.filter(u => u.provider === 'google').length,
    email: users.filter(u => u.provider === 'email').length,
    today: users.filter(u => new Date(u.createdAt || '') >= todayStart).length,
    thisWeek: users.filter(u => new Date(u.createdAt || '') >= weekStart).length,
  };

  const citasStats = {
    total: citas.length,
    pendientes: citas.filter(c => c.status === 'solicitud').length,
    propuestas: citas.filter(c => c.status === 'propuesta').length,
    confirmadas: citas.filter(c => c.status === 'confirmada').length,
  };

  const total = contacts.length;
  const stepDist: Record<number, number> = {};
  for (const c of contacts) {
    stepDist[c.welcomeStep] = (stepDist[c.welcomeStep] || 0) + 1;
  }
  const completed = stepDist[5] || 0;
  const inProgress = Object.entries(stepDist)
    .filter(([k]) => Number(k) > 0 && Number(k) < 5)
    .reduce((a, [, v]) => a + v, 0);
  const notStarted = stepDist[0] || 0;

  // Filter contacts
  const filteredContacts = contacts.filter(c => {
    const matchesEmail = c.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
                         (c.nombre || '').toLowerCase().includes(searchEmail.toLowerCase());
    const matchesStep = filterStep === null || c.welcomeStep === filterStep;
    return matchesEmail && matchesStep;
  });

  // Filter users
  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    (u.nombre || '').toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C8102E] via-[#A00D24] to-[#0032A0] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-3">
                <span className="text-3xl">🇨🇭</span>
                HispanosEnSuiza
                <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full">Admin</span>
              </h1>
              <p className="text-white/90 text-sm mt-1">
                Última actualización: {now}
              </p>
            </div>
            <div className="flex gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <div className="text-xs text-white/70">Usuarios</div>
                <div className="text-2xl font-bold">{usersStats.total}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <div className="text-xs text-white/70">Suscriptores</div>
                <div className="text-2xl font-bold">{total}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Usuarios Totales</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{usersStats.total}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">
                  +{usersStats.today} hoy · +{usersStats.thisWeek} esta semana
                </p>
              </div>
              <div className="bg-blue-100 rounded-xl p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                🔴 {usersStats.google} Google
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                🟣 {usersStats.email} Email
              </span>
            </div>
          </div>

          {/* Email Subscribers */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Suscriptores Email</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{total}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {inProgress} en secuencia · {completed} completados
                </p>
              </div>
              <div className="bg-indigo-100 rounded-xl p-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all"
                    style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-600">{Math.round((completed / total) * 100)}%</span>
              </div>
            </div>
          </div>

          {/* UNIA Citas */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Citas UNIA</p>
                <p className="text-3xl font-black text-slate-900 mt-2">{citasStats.total}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {citasStats.pendientes} pendientes
                </p>
              </div>
              <div className="bg-amber-100 rounded-xl p-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {citasStats.propuestas > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                  {citasStats.propuestas} propuestas
                </span>
              )}
              {citasStats.confirmadas > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  {citasStats.confirmadas} confirmadas
                </span>
              )}
            </div>
          </div>

          {/* Engagement Rate (calculated) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Engagement Rate</p>
                <p className="text-3xl font-black text-slate-900 mt-2">
                  {Math.round((total / (usersStats.total || 1)) * 100)}%
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Usuarios → Newsletter
                </p>
              </div>
              <div className="bg-emerald-100 rounded-xl p-3">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-600">
                <span className="font-bold text-emerald-600">{inProgress + completed}</span> activos de <span className="font-bold">{total}</span> suscriptores
              </p>
            </div>
          </div>
        </div>

        {/* UNIA Citas Panel */}
        <a
          href={`/admin/citas?token=${token}`}
          className="block mb-8 group"
        >
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl p-6 hover:shadow-lg transition-all hover:border-amber-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-amber-200 rounded-xl p-4">
                  <span className="text-3xl">⚖️</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-amber-900">Gestión de Citas UNIA</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {citasStats.pendientes > 0 && <span className="font-bold">{citasStats.pendientes} citas pendientes de asignar · </span>}
                    {citasStats.propuestas > 0 && <span>{citasStats.propuestas} esperando confirmación del usuario · </span>}
                    {citasStats.confirmadas > 0 && <span className="text-emerald-700 font-semibold">{citasStats.confirmadas} confirmadas</span>}
                    {citasStats.total === 0 && <span>No hay citas registradas todavía</span>}
                  </p>
                </div>
              </div>
              <div className="bg-amber-900 text-white px-6 py-3 rounded-xl font-bold text-sm group-hover:bg-amber-800 transition-colors flex items-center gap-2">
                Ver todas ({citasStats.total})
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </a>

        {/* Email Subscribers Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 rounded-xl p-2">
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Secuencia de Emails</h2>
              <span className="text-sm text-slate-500">({filteredContacts.length} de {total})</span>
            </div>
          </div>

          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por email o nombre..."
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStep(null)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  filterStep === null
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFilterStep(0)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  filterStep === 0
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Sin iniciar ({notStarted})
              </button>
              <button
                onClick={() => setFilterStep(5)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  filterStep === 5
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Completados ({completed})
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Registro</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Progreso</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredContacts.map((c) => (
                  <tr key={c.email} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-900">
                      {c.email}
                      {c.blacklisted && <span className="ml-2 text-red-600">🚫</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 hidden sm:table-cell">
                      {c.nombre || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                      {c.createdAt?.slice(0, 10) || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <EmailProgress step={c.welcomeStep} start={c.welcomeStart} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center text-xs text-slate-500">
            <span className="inline-flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600"></span> Enviado
              <span className="w-3 h-3 rounded-full bg-indigo-200 border-2 border-indigo-600 ml-2"></span> Próximo
              <span className="w-3 h-3 rounded-full bg-slate-200 ml-2"></span> Pendiente
            </span>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-xl p-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Usuarios Registrados</h2>
              <span className="text-sm text-slate-500">({filteredUsers.length} de {users.length})</span>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar usuario por email o nombre..."
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden sm:table-cell">Nombre</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Método</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Registro</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider hidden lg:table-cell">Logins</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {filteredUsers.slice().reverse().map((u) => (
                  <tr key={u.email} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-900">{u.email}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 hidden sm:table-cell">
                      {u.nombre || <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        u.provider === 'google'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {u.provider === 'google' ? '🔴 Google' : '🟣 Email'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                      {u.createdAt?.slice(0, 10) || '—'}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 text-center hidden lg:table-cell">
                      {u.loginCount || 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Datos almacenados en GitHub Gist · users.json + subscribers.json</p>
          <p className="mt-1">Envíos de email: Gmail SMTP · Secuencia automática de bienvenida</p>
        </div>
      </div>
    </div>
  );
}

function EmailProgress({ step, start }: { step: number; start?: string }) {
  const steps = [
    { n: 1, label: 'Bienvenida', day: 0 },
    { n: 2, label: 'Día 3', day: 3 },
    { n: 3, label: 'Día 7', day: 7 },
    { n: 4, label: 'Día 14', day: 14 },
    { n: 5, label: 'Día 21', day: 21 },
  ];

  let statusText = '';
  let statusColor = 'text-slate-500';

  if (step >= 5) {
    statusText = '✓ Completo';
    statusColor = 'text-emerald-600';
  } else if (start) {
    try {
      const startDate = new Date(start.slice(0, 10));
      const next = steps[step];
      const nextDate = new Date(startDate);
      nextDate.setDate(nextDate.getDate() + next.day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diff = Math.round((nextDate.getTime() - today.getTime()) / 86400000);

      if (diff > 0) {
        statusText = `→ ${next.label} en ${diff}d`;
        statusColor = 'text-slate-500';
      } else if (diff === 0) {
        statusText = '→ HOY';
        statusColor = 'text-amber-600 font-bold';
      } else {
        statusText = '→ Pendiente envío';
        statusColor = 'text-red-600';
      }
    } catch {
      statusText = '';
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {steps.map(s => (
          <div
            key={s.n}
            className={`w-3 h-3 rounded-full ${
              s.n <= step
                ? 'bg-indigo-600'
                : s.n === step + 1
                ? 'bg-indigo-200 border-2 border-indigo-600'
                : 'bg-slate-200'
            }`}
            title={s.label}
          />
        ))}
      </div>
      <span className="text-xs text-slate-600 font-medium">{step}/5</span>
      {statusText && (
        <span className={`text-xs ${statusColor} ml-1`}>{statusText}</span>
      )}
    </div>
  );
}
