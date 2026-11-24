"use client";

import { useEffect, useState, useMemo } from 'react';
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

type SystemStatus = {
  status: 'ok' | 'warning' | 'error';
  info?: string;
  error?: string;
  http_code?: number;
  mode?: string;
  count?: number;
};

type SystemsReport = {
  timestamp: string;
  systems: {
    vercel_production: SystemStatus;
    vercel_deployment: SystemStatus;
    api_newsletter: SystemStatus;
    gist_database: SystemStatus;
    email_system: SystemStatus;
    stripe_mode: SystemStatus;
    build_system: SystemStatus;
  };
  summary: {
    total: number;
    ok: number;
    warning: number;
    error: number;
    health_percentage: number;
  };
};

type Tab = 'overview' | 'users' | 'subscribers' | 'unia' | 'systems';

// Sparkline component for mini charts
function Sparkline({ data, color = '#10b981', height = 30 }: { data: number[]; color?: string; height?: number }) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-8">
      <defs>
        <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#gradient-${color.replace('#', '')})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Circular progress component
function CircularProgress({ value, size = 60, strokeWidth = 6, color = '#10b981' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-slate-700"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

// Animated counter
function AnimatedNumber({ value, duration = 1000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString()}</span>;
}

// Status badge component
function StatusBadge({ status }: { status: 'ok' | 'warning' | 'error' }) {
  const styles = {
    ok: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30'
  };
  const icons = { ok: '●', warning: '◐', error: '○' };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      <span className="animate-pulse">{icons[status]}</span>
      {status === 'ok' ? 'Operativo' : status === 'warning' ? 'Advertencia' : 'Error'}
    </span>
  );
}

// Navigation item
function NavItem({ icon, label, active, count, onClick }: { icon: string; label: string; active: boolean; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
        active
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
          active ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
        }`}>
          {count}
        </span>
      )}
    </button>
  );
}

// Metric card component
function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  gradient,
  sparklineData,
  extra
}: {
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
  icon: string;
  gradient: string;
  sparklineData?: number[];
  extra?: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group hover:shadow-xl hover:shadow-slate-900/50">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">
            <AnimatedNumber value={value} />
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>

      {sparklineData && sparklineData.length > 0 && (
        <div className="mb-3">
          <Sparkline data={sparklineData} color={gradient.includes('emerald') ? '#10b981' : gradient.includes('blue') ? '#3b82f6' : gradient.includes('purple') ? '#8b5cf6' : '#f59e0b'} />
        </div>
      )}

      {change !== undefined && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`flex items-center gap-1 font-semibold ${change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change).toFixed(1)}%
          </span>
          <span className="text-slate-500">{changeLabel || 'vs anterior'}</span>
        </div>
      )}

      {extra}
    </div>
  );
}

// Data table component
function DataTable({
  columns,
  data,
  renderRow,
  emptyMessage = "No hay datos"
}: {
  columns: { key: string; label: string; width?: string }[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
  emptyMessage?: string;
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider ${col.width || ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {data.length > 0 ? (
              data.map((item, idx) => renderRow(item, idx))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [systemsReport, setSystemsReport] = useState<SystemsReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'email' | 'date' | 'step'>('date');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const token = searchParams.get('token') || '';

  useEffect(() => {
    async function loadData() {
      try {
        const [contactsRes, usersRes, citasRes, systemsRes] = await Promise.all([
          fetch(`/api/admin/subscribers?token=${token}`).catch(() => ({ json: async () => [] })),
          fetch(`/api/admin/users?token=${token}`).catch(() => ({ json: async () => ({ users: [] }) })),
          fetch(`/api/admin/citas?token=${token}`).catch(() => ({ json: async () => [] })),
          fetch(`/api/admin/systems?token=${token}`).catch(() => ({ json: async () => null })),
        ]);

        const contactsData = await contactsRes.json();
        const usersData = await usersRes.json();
        const citasData = await citasRes.json();
        const systemsData = await systemsRes.json();

        if (contactsData?.error === 'Unauthorized' || usersData?.error === 'Unauthorized' || citasData?.error === 'Unauthorized') {
          setError('No autorizado. Token inválido.');
          setLoading(false);
          return;
        }

        setContacts(Array.isArray(contactsData) ? contactsData : []);
        setUsers(Array.isArray(usersData?.users) ? usersData.users : []);
        setCitas(Array.isArray(citasData) ? citasData : []);
        setSystemsReport(systemsData?.error ? null : systemsData);
      } catch (error) {
        console.error('Error loading data:', error);
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  // Calculate stats
  const stats = useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    const monthStart = new Date(todayStart);
    monthStart.setDate(monthStart.getDate() - 30);

    // Last 7 days data for sparklines
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(todayStart);
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const usersByDay = last7Days.map(day => {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      return users.filter(u => {
        const created = u.createdAt ? new Date(u.createdAt) : null;
        return created && created >= day && created < nextDay;
      }).length;
    });

    const subscribersByDay = last7Days.map(day => {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      return contacts.filter(c => {
        const created = c.createdAt ? new Date(c.createdAt) : null;
        return created && created >= day && created < nextDay;
      }).length;
    });

    const citasByDay = last7Days.map(day => {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);
      return citas.filter(c => {
        const created = c.createdAt ? new Date(c.createdAt) : null;
        return created && created >= day && created < nextDay;
      }).length;
    });

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
    const userGrowthRate = usersYesterday > 0 ? ((usersToday - usersYesterday) / usersYesterday * 100) : usersToday > 0 ? 100 : 0;
    const conversionRate = totalUsers > 0 ? (activeSubscribers / totalUsers * 100) : 0;

    return {
      totalUsers, usersToday, usersYesterday, usersThisWeek, usersThisMonth, googleUsers, emailUsers,
      totalSubscribers, activeSubscribers, blacklistedSubscribers, step0, step1to4, step5, subscribersToday, subscribersThisWeek,
      totalCitas, citasPendientes, citasPropuestas, citasConfirmadas, citasToday, citasThisWeek,
      userGrowthRate, conversionRate,
      usersByDay, subscribersByDay, citasByDay
    };
  }, [users, contacts, citas]);

  // Filter and sort data
  const filteredData = useMemo(() => {
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
  }, [activeTab, users, contacts, citas, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-500/30 rounded-full animate-spin border-t-indigo-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🇨🇭</span>
            </div>
          </div>
          <p className="mt-6 text-slate-400 font-medium">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-red-500/20 flex items-center justify-center">
            <span className="text-4xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Acceso Denegado</h1>
          <p className="text-slate-400 mb-8">{error}</p>
          <a
            href="/admin?token=hispanos-admin-2026"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
          >
            <span>Reintentar</span>
            <span>→</span>
          </a>
        </div>
      </div>
    );
  }

  const now = new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-slate-900/50 backdrop-blur-sm border-r border-slate-800/50 flex flex-col transition-all duration-300 fixed h-full z-20`}>
        {/* Logo */}
        <div className="p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-xl shadow-lg">
              🇨🇭
            </div>
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">HispanosEnSuiza</h1>
                <p className="text-xs text-slate-500">Admin Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon="📊"
            label="Overview"
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          />
          <NavItem
            icon="👥"
            label="Usuarios"
            active={activeTab === 'users'}
            count={stats.totalUsers}
            onClick={() => setActiveTab('users')}
          />
          <NavItem
            icon="✉️"
            label="Suscriptores"
            active={activeTab === 'subscribers'}
            count={stats.totalSubscribers}
            onClick={() => setActiveTab('subscribers')}
          />
          <NavItem
            icon="🤝"
            label="Citas UNIA"
            active={activeTab === 'unia'}
            count={stats.totalCitas}
            onClick={() => setActiveTab('unia')}
          />
          <NavItem
            icon="⚙️"
            label="Sistemas"
            active={activeTab === 'systems'}
            count={systemsReport?.summary.health_percentage ? Math.round(systemsReport.summary.health_percentage) : undefined}
            onClick={() => setActiveTab('systems')}
          />
        </nav>

        {/* System Health Mini */}
        {systemsReport && !sidebarCollapsed && (
          <div className="p-4 border-t border-slate-800/50">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-400">Estado del Sistema</span>
                <StatusBadge status={systemsReport.summary.health_percentage >= 90 ? 'ok' : systemsReport.summary.health_percentage >= 70 ? 'warning' : 'error'} />
              </div>
              <div className="flex items-center gap-3">
                <CircularProgress
                  value={systemsReport.summary.health_percentage}
                  size={50}
                  color={systemsReport.summary.health_percentage >= 90 ? '#10b981' : systemsReport.summary.health_percentage >= 70 ? '#f59e0b' : '#ef4444'}
                />
                <div>
                  <div className="text-2xl font-bold text-white">{systemsReport.summary.health_percentage.toFixed(0)}%</div>
                  <div className="text-xs text-slate-500">{systemsReport.summary.ok}/{systemsReport.summary.total} activos</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-4 border-t border-slate-800/50 text-slate-500 hover:text-white transition-colors"
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-72'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {activeTab === 'overview' && 'Panel General'}
                {activeTab === 'users' && 'Gestión de Usuarios'}
                {activeTab === 'subscribers' && 'Suscriptores Email'}
                {activeTab === 'unia' && 'Citas UNIA'}
                {activeTab === 'systems' && 'Estado de Sistemas'}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                {now.toLocaleDateString('es-ES', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-400">Hoy: <span className="text-white font-semibold">{stats.usersToday}</span> usuarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  <span className="text-slate-400"><span className="text-white font-semibold">{stats.subscribersToday}</span> suscriptores</span>
                </div>
              </div>

              {/* Time */}
              <div className="text-sm text-slate-400 bg-slate-800/50 px-4 py-2 rounded-lg">
                {now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* System Alert */}
              {systemsReport && systemsReport.summary.health_percentage < 80 && (
                <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center text-2xl">
                    ⚠️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-red-400 font-semibold">Alerta: Problemas en el Sistema</h3>
                    <p className="text-slate-400 text-sm mt-0.5">
                      {systemsReport.summary.error} error(es) y {systemsReport.summary.warning} advertencia(s) detectadas.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('systems')}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Ver detalles →
                  </button>
                </div>
              )}

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <MetricCard
                  title="Total Usuarios"
                  value={stats.totalUsers}
                  change={stats.userGrowthRate}
                  changeLabel="vs ayer"
                  icon="👥"
                  gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
                  sparklineData={stats.usersByDay}
                  extra={
                    <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Hoy</span>
                        <p className="text-white font-semibold">{stats.usersToday}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Semana</span>
                        <p className="text-white font-semibold">{stats.usersThisWeek}</p>
                      </div>
                    </div>
                  }
                />

                <MetricCard
                  title="Suscriptores Email"
                  value={stats.totalSubscribers}
                  icon="✉️"
                  gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
                  sparklineData={stats.subscribersByDay}
                  extra={
                    <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-400">{stats.activeSubscribers} activos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-slate-400">{stats.blacklistedSubscribers} bloqueados</span>
                      </div>
                    </div>
                  }
                />

                <MetricCard
                  title="Citas UNIA"
                  value={stats.totalCitas}
                  icon="📅"
                  gradient="bg-gradient-to-br from-purple-500 to-pink-500"
                  sparklineData={stats.citasByDay}
                  extra={
                    <div className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <div className="text-amber-400 font-bold">{stats.citasPendientes}</div>
                        <span className="text-slate-500">Pendiente</span>
                      </div>
                      <div className="text-center">
                        <div className="text-blue-400 font-bold">{stats.citasPropuestas}</div>
                        <span className="text-slate-500">Propuesta</span>
                      </div>
                      <div className="text-center">
                        <div className="text-emerald-400 font-bold">{stats.citasConfirmadas}</div>
                        <span className="text-slate-500">Confirmada</span>
                      </div>
                    </div>
                  }
                />

                <MetricCard
                  title="Tasa Conversión"
                  value={Math.round(stats.conversionRate)}
                  icon="📈"
                  gradient="bg-gradient-to-br from-amber-500 to-orange-500"
                  extra={
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                        <span>Suscriptores / Usuarios</span>
                        <span>{stats.conversionRate.toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-1000"
                          style={{ width: `${Math.min(stats.conversionRate, 100)}%` }}
                        />
                      </div>
                    </div>
                  }
                />
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Distribution */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-6">Distribución de Usuarios</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <span className="text-blue-400">G</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">Google OAuth</p>
                            <p className="text-xs text-slate-500">Inicio con Google</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{stats.googleUsers}</p>
                          <p className="text-xs text-slate-500">{stats.totalUsers > 0 ? (stats.googleUsers/stats.totalUsers*100).toFixed(1) : 0}%</p>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-1000"
                          style={{ width: `${stats.totalUsers > 0 ? (stats.googleUsers/stats.totalUsers*100) : 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <span className="text-emerald-400">@</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">Email/Password</p>
                            <p className="text-xs text-slate-500">Registro tradicional</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">{stats.emailUsers}</p>
                          <p className="text-xs text-slate-500">{stats.totalUsers > 0 ? (stats.emailUsers/stats.totalUsers*100).toFixed(1) : 0}%</p>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
                          style={{ width: `${stats.totalUsers > 0 ? (stats.emailUsers/stats.totalUsers*100) : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Sequence Progress */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-6">Progreso Secuencia Email</h3>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <div className="relative inline-block">
                        <CircularProgress value={stats.totalSubscribers > 0 ? (stats.step0/stats.totalSubscribers*100) : 0} size={80} color="#64748b" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">{stats.step0}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Sin iniciar</p>
                    </div>
                    <div className="text-center">
                      <div className="relative inline-block">
                        <CircularProgress value={stats.totalSubscribers > 0 ? (stats.step1to4/stats.totalSubscribers*100) : 0} size={80} color="#f59e0b" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">{stats.step1to4}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">En progreso</p>
                    </div>
                    <div className="text-center">
                      <div className="relative inline-block">
                        <CircularProgress value={stats.totalSubscribers > 0 ? (stats.step5/stats.totalSubscribers*100) : 0} size={80} color="#10b981" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-bold text-white">{stats.step5}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">Completado</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-slate-500"></span>
                      <span>Step 0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      <span>Steps 1-4</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                      <span>Step 5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-5 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-400 mb-1">Usuarios este mes</p>
                      <p className="text-2xl font-bold text-white">{stats.usersThisMonth}</p>
                    </div>
                    <div className="text-3xl opacity-50">📅</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-5 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-emerald-400 mb-1">Suscriptores semana</p>
                      <p className="text-2xl font-bold text-white">{stats.subscribersThisWeek}</p>
                    </div>
                    <div className="text-3xl opacity-50">📬</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl p-5 border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-amber-400 mb-1">Citas pendientes</p>
                      <p className="text-2xl font-bold text-white">{stats.citasPendientes}</p>
                    </div>
                    <div className="text-3xl opacity-50">⏳</div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-5 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-purple-400 mb-1">Citas confirmadas</p>
                      <p className="text-2xl font-bold text-white">{stats.citasConfirmadas}</p>
                    </div>
                    <div className="text-3xl opacity-50">✅</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search & Filters */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar por email o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="date">Más recientes</option>
                  <option value="email">Email A-Z</option>
                </select>
              </div>

              {/* Table */}
              <DataTable
                columns={[
                  { key: 'user', label: 'Usuario' },
                  { key: 'provider', label: 'Proveedor' },
                  { key: 'logins', label: 'Logins' },
                  { key: 'date', label: 'Registrado' }
                ]}
                data={filteredData.slice(0, 50)}
                renderRow={(user: User, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {(user.nombre || user.email)[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.nombre || 'Sin nombre'}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                        user.provider === 'google'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {user.provider === 'google' ? '🔵 Google' : '✉️ Email'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{user.loginCount || 1}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                  </tr>
                )}
                emptyMessage="No se encontraron usuarios"
              />

              {filteredData.length > 50 && (
                <div className="text-center text-sm text-slate-500">
                  Mostrando 50 de {filteredData.length} usuarios
                </div>
              )}
            </div>
          )}

          {/* SUBSCRIBERS TAB */}
          {activeTab === 'subscribers' && (
            <div className="space-y-6">
              {/* Search & Filters */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar por email o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="date">Más recientes</option>
                  <option value="email">Email A-Z</option>
                  <option value="step">Por progreso</option>
                </select>
              </div>

              {/* Table */}
              <DataTable
                columns={[
                  { key: 'subscriber', label: 'Suscriptor' },
                  { key: 'progress', label: 'Progreso' },
                  { key: 'status', label: 'Estado' },
                  { key: 'date', label: 'Registrado' }
                ]}
                data={filteredData.slice(0, 50)}
                renderRow={(sub: Subscriber, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                          {(sub.nombre || sub.email)[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-medium">{sub.nombre || 'Sin nombre'}</p>
                          <p className="text-sm text-slate-500">{sub.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                          {[0, 1, 2, 3, 4, 5].map((step) => (
                            <div
                              key={step}
                              className={`w-2.5 h-2.5 rounded-full transition-all ${
                                sub.welcomeStep >= step
                                  ? 'bg-emerald-500'
                                  : 'bg-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400 font-medium">
                          {sub.welcomeStep}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                        sub.blacklisted
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {sub.blacklisted ? '🚫 Bloqueado' : '✅ Activo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                  </tr>
                )}
                emptyMessage="No se encontraron suscriptores"
              />

              {filteredData.length > 50 && (
                <div className="text-center text-sm text-slate-500">
                  Mostrando 50 de {filteredData.length} suscriptores
                </div>
              )}
            </div>
          )}

          {/* UNIA TAB */}
          {activeTab === 'unia' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-1">Total Citas</p>
                      <p className="text-2xl font-bold text-white">{stats.totalCitas}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-xl">
                      📋
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 rounded-xl p-5 border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-amber-400 mb-1">Solicitudes</p>
                      <p className="text-2xl font-bold text-white">{stats.citasPendientes}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-xl">
                      ⏳
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 rounded-xl p-5 border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-blue-400 mb-1">Propuestas</p>
                      <p className="text-2xl font-bold text-white">{stats.citasPropuestas}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-xl">
                      📋
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 rounded-xl p-5 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-emerald-400 mb-1">Confirmadas</p>
                      <p className="text-2xl font-bold text-white">{stats.citasConfirmadas}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xl">
                      ✅
                    </div>
                  </div>
                </div>
              </div>

              {/* Table */}
              <DataTable
                columns={[
                  { key: 'id', label: '#' },
                  { key: 'status', label: 'Estado' },
                  { key: 'date', label: 'Fecha' }
                ]}
                data={filteredData.slice(0, 50)}
                renderRow={(cita: Cita, idx) => (
                  <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">#{idx + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                        cita.status === 'confirmada'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : cita.status === 'propuesta'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {cita.status === 'confirmada' ? '✅ Confirmada' :
                         cita.status === 'propuesta' ? '📋 Propuesta' :
                         '⏳ Solicitud'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {cita.createdAt ? new Date(cita.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'N/A'}
                    </td>
                  </tr>
                )}
                emptyMessage="No hay citas registradas"
              />

              {filteredData.length > 50 && (
                <div className="text-center text-sm text-slate-500">
                  Mostrando 50 de {filteredData.length} citas
                </div>
              )}
            </div>
          )}

          {/* SYSTEMS TAB */}
          {activeTab === 'systems' && systemsReport && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <CircularProgress
                      value={systemsReport.summary.health_percentage}
                      size={120}
                      strokeWidth={10}
                      color={systemsReport.summary.health_percentage >= 90 ? '#10b981' : systemsReport.summary.health_percentage >= 70 ? '#f59e0b' : '#ef4444'}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-white">{systemsReport.summary.health_percentage.toFixed(0)}%</span>
                      <span className="text-xs text-slate-500">Salud</span>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-1">{systemsReport.summary.total}</div>
                      <div className="text-sm text-slate-500">Total</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">{systemsReport.summary.ok}</div>
                      <div className="text-sm text-slate-500">Operativos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-amber-400 mb-1">{systemsReport.summary.warning}</div>
                      <div className="text-sm text-slate-500">Advertencias</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-1">{systemsReport.summary.error}</div>
                      <div className="text-sm text-slate-500">Errores</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Systems Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(systemsReport.systems).map(([key, system]) => {
                  const labels: Record<string, { icon: string; name: string }> = {
                    vercel_production: { icon: '🚀', name: 'Vercel Production' },
                    vercel_deployment: { icon: '📦', name: 'Latest Deployment' },
                    api_newsletter: { icon: '🔌', name: 'Newsletter API' },
                    gist_database: { icon: '💾', name: 'GitHub Gist Database' },
                    email_system: { icon: '📧', name: 'Email System' },
                    stripe_mode: { icon: '💳', name: 'Stripe Payment' },
                    build_system: { icon: '🔧', name: 'Build System' }
                  };

                  const { icon, name } = labels[key] || { icon: '⚙️', name: key };

                  return (
                    <div
                      key={key}
                      className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border-l-4 border border-slate-700/50 ${
                        system.status === 'ok' ? 'border-l-emerald-500' :
                        system.status === 'warning' ? 'border-l-amber-500' :
                        'border-l-red-500'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                            system.status === 'ok' ? 'bg-emerald-500/20' :
                            system.status === 'warning' ? 'bg-amber-500/20' :
                            'bg-red-500/20'
                          }`}>
                            {icon}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{name}</h3>
                            <p className="text-sm text-slate-500 mt-1 max-w-xs">
                              {system.info || system.error || 'Sin información'}
                            </p>
                          </div>
                        </div>
                        <StatusBadge status={system.status} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Last Updated */}
              <div className="text-center text-sm text-slate-500">
                Última actualización: {new Date(systemsReport.timestamp).toLocaleString('es-ES', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
