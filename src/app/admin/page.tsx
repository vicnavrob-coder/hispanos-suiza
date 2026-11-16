"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
  createdAt?: string;
};

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'subscribers' | 'unia'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'email' | 'date' | 'step'>('date');

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-slate-800"></div>
          <p className="mt-4 text-slate-600 font-medium">Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Acceso Denegado</h1>
          <p className="text-slate-600 mb-6">{error}</p>
          <a
            href="/admin?token=hispanos-admin-2026"
            className="inline-block bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Reintentar
          </a>
        </div>
      </div>
    );
  }

  // Calculate stats
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(todayStart);
  monthStart.setDate(monthStart.getDate() - 30);

  // User stats
  const totalUsers = users.length;
  const usersToday = users.filter(u => u.createdAt && new Date(u.createdAt) >= todayStart).length;
  const usersYesterday = users.filter(u => u.createdAt && new Date(u.createdAt) >= yesterdayStart && new Date(u.createdAt) < todayStart).length;
  const usersThisWeek = users.filter(u => u.createdAt && new Date(u.createdAt) >= weekStart).length;
  const usersThisMonth = users.filter(u => u.createdAt && new Date(u.createdAt) >= monthStart).length;
  const googleUsers = users.filter(u => u.provider === 'google').length;
  const emailUsers = users.filter(u => u.provider === 'email').length;

  // Subscriber stats
  const totalSubscribers = contacts.length;
  const activeSubscribers = contacts.filter(c => !c.blacklisted).length;
  const blacklistedSubscribers = contacts.filter(c => c.blacklisted).length;
  const step0 = contacts.filter(c => c.welcomeStep === 0).length;
  const step1to4 = contacts.filter(c => c.welcomeStep > 0 && c.welcomeStep < 5).length;
  const step5 = contacts.filter(c => c.welcomeStep === 5).length;
  const subscribersToday = contacts.filter(c => c.createdAt && new Date(c.createdAt) >= todayStart).length;
  const subscribersThisWeek = contacts.filter(c => c.createdAt && new Date(c.createdAt) >= weekStart).length;

  // UNIA stats
  const totalCitas = citas.length;
  const citasPendientes = citas.filter(c => c.status === 'solicitud').length;
  const citasPropuestas = citas.filter(c => c.status === 'propuesta').length;
  const citasConfirmadas = citas.filter(c => c.status === 'confirmada').length;
  const citasToday = citas.filter(c => c.createdAt && new Date(c.createdAt) >= todayStart).length;
  const citasThisWeek = citas.filter(c => c.createdAt && new Date(c.createdAt) >= weekStart).length;

  // Growth rate
  const userGrowthRate = usersYesterday > 0 ? ((usersToday - usersYesterday) / usersYesterday * 100) : 0;
  const conversionRate = totalUsers > 0 ? (activeSubscribers / totalUsers * 100) : 0;

  // Filter and sort
  const filteredData = (() => {
    switch (activeTab) {
      case 'users':
        return users
          .filter(u =>
            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (u.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => {
            if (sortBy === 'email') return a.email.localeCompare(b.email);
            if (sortBy === 'date') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            return 0;
          });
      case 'subscribers':
        return contacts
          .filter(c =>
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (c.nombre || '').toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => {
            if (sortBy === 'email') return a.email.localeCompare(b.email);
            if (sortBy === 'date') return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            if (sortBy === 'step') return b.welcomeStep - a.welcomeStep;
            return 0;
          });
      case 'unia':
        return citas.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      default:
        return [];
    }
  })();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇨🇭</span>
                <h1 className="text-xl font-bold text-slate-900">HispanosEnSuiza</h1>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                Admin Dashboard
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-sm text-slate-500">
                {now.toLocaleDateString('es-ES', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'overview'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'users'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              👤 Usuarios ({totalUsers})
            </button>
            <button
              onClick={() => setActiveTab('subscribers')}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'subscribers'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              ✉️ Suscriptores ({totalSubscribers})
            </button>
            <button
              onClick={() => setActiveTab('unia')}
              className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'unia'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              🤝 UNIA Citas ({totalCitas})
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Users */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-slate-600">Total Usuarios</div>
                  <div className="text-2xl">👥</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{totalUsers.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`font-semibold ${userGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {userGrowthRate >= 0 ? '↗' : '↘'} {Math.abs(userGrowthRate).toFixed(1)}%
                  </span>
                  <span className="text-slate-500">vs ayer</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between mb-1">
                    <span>Hoy: {usersToday}</span>
                    <span>Semana: {usersThisWeek}</span>
                  </div>
                </div>
              </div>

              {/* Total Subscribers */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-slate-600">Suscriptores Email</div>
                  <div className="text-2xl">📬</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{totalSubscribers.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-blue-600">{activeSubscribers} activos</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{blacklistedSubscribers} bloqueados</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between mb-1">
                    <span>Hoy: {subscribersToday}</span>
                    <span>Semana: {subscribersThisWeek}</span>
                  </div>
                </div>
              </div>

              {/* UNIA Citas */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-slate-600">Citas UNIA</div>
                  <div className="text-2xl">📅</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{totalCitas.toLocaleString()}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-orange-600">{citasPendientes} pendientes</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-green-600">{citasConfirmadas} confirmadas</span>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between mb-1">
                    <span>Hoy: {citasToday}</span>
                    <span>Semana: {citasThisWeek}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-slate-600">Tasa Conversión</div>
                  <div className="text-2xl">📈</div>
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1">{conversionRate.toFixed(1)}%</div>
                <div className="text-xs text-slate-500">Suscriptores / Usuarios</div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all"
                      style={{ width: `${Math.min(conversionRate, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Distribution */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Distribución de Usuarios</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        Google OAuth
                      </span>
                      <span className="font-semibold text-slate-900">{googleUsers} ({totalUsers > 0 ? (googleUsers/totalUsers*100).toFixed(1) : 0}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${totalUsers > 0 ? (googleUsers/totalUsers*100) : 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        Email/Password
                      </span>
                      <span className="font-semibold text-slate-900">{emailUsers} ({totalUsers > 0 ? (emailUsers/totalUsers*100).toFixed(1) : 0}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${totalUsers > 0 ? (emailUsers/totalUsers*100) : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Sequence Progress */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Progreso Secuencia Email</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-slate-400"></span>
                        No iniciado (Step 0)
                      </span>
                      <span className="font-semibold text-slate-900">{step0} ({totalSubscribers > 0 ? (step0/totalSubscribers*100).toFixed(1) : 0}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-400 rounded-full transition-all"
                        style={{ width: `${totalSubscribers > 0 ? (step0/totalSubscribers*100) : 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-orange-500"></span>
                        En progreso (Step 1-4)
                      </span>
                      <span className="font-semibold text-slate-900">{step1to4} ({totalSubscribers > 0 ? (step1to4/totalSubscribers*100).toFixed(1) : 0}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{ width: `${totalSubscribers > 0 ? (step1to4/totalSubscribers*100) : 0}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600 flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        Completado (Step 5)
                      </span>
                      <span className="font-semibold text-slate-900">{step5} ({totalSubscribers > 0 ? (step5/totalSubscribers*100).toFixed(1) : 0}%)</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all"
                        style={{ width: `${totalSubscribers > 0 ? (step5/totalSubscribers*100) : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="text-xs font-medium text-blue-700 mb-1">Usuarios Mes</div>
                <div className="text-2xl font-bold text-blue-900">{usersThisMonth}</div>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="text-xs font-medium text-green-700 mb-1">Suscriptores Semana</div>
                <div className="text-2xl font-bold text-green-900">{subscribersThisWeek}</div>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <div className="text-xs font-medium text-orange-700 mb-1">Citas Pendientes</div>
                <div className="text-2xl font-bold text-orange-900">{citasPendientes}</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="text-xs font-medium text-purple-700 mb-1">Citas Confirmadas</div>
                <div className="text-2xl font-bold text-purple-900">{citasConfirmadas}</div>
              </div>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Buscar por email o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="date">Más recientes</option>
                  <option value="email">Email A-Z</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Usuario</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Provider</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Logins</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Registrado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredData.slice(0, 50).map((user: any, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {(user.nombre || user.email)[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{user.nombre || 'Sin nombre'}</div>
                              <div className="text-xs text-slate-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                            user.provider === 'google'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.provider === 'google' ? '🔵 Google' : '✉️ Email'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">{user.loginCount || 1}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredData.length > 50 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600 text-center">
                  Mostrando 50 de {filteredData.length} usuarios
                </div>
              )}
              {filteredData.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-500">
                  No se encontraron usuarios
                </div>
              )}
            </div>
          </div>
        )}

        {/* SUBSCRIBERS TAB */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Buscar por email o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                >
                  <option value="date">Más recientes</option>
                  <option value="email">Email A-Z</option>
                  <option value="step">Por progreso</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Suscriptor</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Progreso</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Registrado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredData.slice(0, 50).map((sub: any, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {(sub.nombre || sub.email)[0].toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-slate-900">{sub.nombre || 'Sin nombre'}</div>
                              <div className="text-xs text-slate-500">{sub.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                              {[0, 1, 2, 3, 4, 5].map((step) => (
                                <div
                                  key={step}
                                  className={`w-2 h-2 rounded-full ${
                                    sub.welcomeStep >= step
                                      ? 'bg-green-500'
                                      : 'bg-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-600">
                              {sub.welcomeStep}/5
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                            sub.blacklisted
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {sub.blacklisted ? '🚫 Bloqueado' : '✅ Activo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredData.length > 50 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600 text-center">
                  Mostrando 50 de {filteredData.length} suscriptores
                </div>
              )}
              {filteredData.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-500">
                  No se encontraron suscriptores
                </div>
              )}
            </div>
          </div>
        )}

        {/* UNIA TAB */}
        {activeTab === 'unia' && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="text-xs font-medium text-slate-600 mb-1">Total</div>
                <div className="text-2xl font-bold text-slate-900">{totalCitas}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <div className="text-xs font-medium text-orange-700 mb-1">Solicitudes</div>
                <div className="text-2xl font-bold text-orange-900">{citasPendientes}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-xs font-medium text-blue-700 mb-1">Propuestas</div>
                <div className="text-2xl font-bold text-blue-900">{citasPropuestas}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-xs font-medium text-green-700 mb-1">Confirmadas</div>
                <div className="text-2xl font-bold text-green-900">{citasConfirmadas}</div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">#</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredData.slice(0, 50).map((cita: any, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">#{idx + 1}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                            cita.status === 'confirmada'
                              ? 'bg-green-100 text-green-700'
                              : cita.status === 'propuesta'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {cita.status === 'confirmada' ? '✅ Confirmada' :
                             cita.status === 'propuesta' ? '📋 Propuesta' :
                             '⏳ Solicitud'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {cita.createdAt ? new Date(cita.createdAt).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }) : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredData.length > 50 && (
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600 text-center">
                  Mostrando 50 de {filteredData.length} citas
                </div>
              )}
              {filteredData.length === 0 && (
                <div className="px-6 py-12 text-center text-slate-500">
                  No hay citas registradas
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
