
import React, { useState, useEffect } from 'react';
import DashboardOverview from './components/DashboardOverview';
import TenantManager from './components/TenantManager';
import RoleMatrix from './components/RoleMatrix';
import UserManager from './components/UserManager';
import AuditAnalytics from './components/AuditAnalytics';
import AISecurityConsultant from './components/AISecurityConsultant';
import Login from './components/Login';

type Tab = 'dashboard' | 'tenants' | 'users' | 'roles' | 'audits';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showArch, setShowArch] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('sentinel_auth');
    if (saved === 'true') setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('sentinel_auth', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('sentinel_auth');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) return <Login onLogin={handleLogin} />;

  const NavItem = ({ id, label, icon }: { id: Tab, label: string, icon: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        activeTab === id 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
          : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      <i className={`fa-solid ${icon} w-5`}></i>
      {isSidebarOpen && <span className="font-medium">{label}</span>}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 sticky top-0 h-screen ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col`}>
        <div className="p-6 flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0 shadow-md">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          {isSidebarOpen && <h1 className="text-xl font-bold tracking-tight text-slate-800">Sentinel<span className="text-indigo-600">RBAC</span></h1>}
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <NavItem id="dashboard" label="Overview" icon="fa-chart-pie" />
          <NavItem id="tenants" label="Tenants" icon="fa-building-shield" />
          <NavItem id="users" label="Users" icon="fa-users-gear" />
          <NavItem id="roles" label="Role Matrix" icon="fa-key" />
          <NavItem id="audits" label="Security Logs" icon="fa-list-check" />
        </nav>

        <div className="p-4 space-y-2 border-t border-slate-100">
          <button 
            onClick={() => setShowArch(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors text-sm font-bold"
          >
            <i className="fa-solid fa-diagram-project"></i>
            {isSidebarOpen && <span>Architecture</span>}
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors text-sm font-bold"
          >
            <i className="fa-solid fa-power-off"></i>
            {isSidebarOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <i className={`fa-solid ${isSidebarOpen ? 'fa-indent' : 'fa-outdent'}`}></i>
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
               <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
               <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Gateway: Active</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Demo Organization</p>
              <p className="text-[10px] text-slate-500">Tenant: Airbus-Global-99</p>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-600 font-bold">
              AA
            </div>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 capitalize tracking-tight flex items-center gap-3">
              {activeTab.replace('audits', 'Audit Trail').replace('roles', 'Access Controls')}
              <span className="text-sm font-normal text-slate-400">|</span>
              <span className="text-sm font-normal text-slate-400">System v2.4.0</span>
            </h2>
            <p className="text-slate-500 mt-1">Enterprise-wide security management interface for multi-tenant infrastructure.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {activeTab === 'dashboard' && <DashboardOverview />}
              {activeTab === 'tenants' && <TenantManager />}
              {activeTab === 'users' && <UserManager />}
              {activeTab === 'roles' && <RoleMatrix />}
              {activeTab === 'audits' && <AuditAnalytics />}
            </div>

            <div className="space-y-6">
              <AISecurityConsultant />
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <i className="fa-solid fa-code text-indigo-600"></i>
                  Technical Stack
                </h4>
                <div className="space-y-3">
                  {[
                    { label: 'Security', val: 'Spring Security + JWT', icon: 'fa-lock' },
                    { label: 'API Engine', val: 'Spring Boot 3.2 (Java 21)', icon: 'fa-bolt' },
                    { label: 'Persistence', val: 'PostgreSQL 16', icon: 'fa-database' },
                    { label: 'Intelligence', val: 'Google Gemini Pro 1.5', icon: 'fa-brain' },
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        <i className={`fa-solid ${tech.icon} text-slate-400 text-xs w-4`}></i>
                        <span className="text-xs font-medium text-slate-600">{tech.label}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-800">{tech.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Architecture Overlay */}
      {showArch && (
        <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl relative">
            <button 
              onClick={() => setShowArch(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Backend Architecture Blueprint</h3>
              <p className="text-slate-500 mb-8">System design for the Multi-Tenant RBAC Security Service</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-indigo-600 mb-4 uppercase text-xs tracking-widest">Client Tier</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> React v19 UI</li>
                    <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Gemini API Integration</li>
                    <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Axios + Interceptors</li>
                  </ul>
                </div>
                <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-600 mb-4 uppercase text-xs tracking-widest">Logic Tier (Spring)</h4>
                  <ul className="space-y-3 text-sm text-slate-700">
                    <li className="flex gap-2"><i className="fa-solid fa-check text-indigo-500 mt-1"></i> OAuth2 / JWT Auth</li>
                    <li className="flex gap-2"><i className="fa-solid fa-check text-indigo-500 mt-1"></i> Multi-Tenant Resolver</li>
                    <li className="flex gap-2"><i className="fa-solid fa-check text-indigo-500 mt-1"></i> Method-Level RBAC</li>
                  </ul>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-indigo-600 mb-4 uppercase text-xs tracking-widest">Data Tier</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Row Level Security (RLS)</li>
                    <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Hibernate / JPA</li>
                    <li className="flex gap-2"><i className="fa-solid fa-check text-emerald-500 mt-1"></i> Flyway Migrations</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-slate-900 rounded-xl text-slate-300">
                <h4 className="font-bold text-white mb-2">Technical Summary for HR/Interviewer</h4>
                <p className="text-sm leading-relaxed">
                  This project demonstrates a full understanding of the Enterprise Security lifecycle. By combining a 
                  React frontend with a conceptual Spring Boot backend, I've implemented Multi-Tenancy (logical separation of organizations), 
                  Role-Based Access Control (fine-grained permissions), and AI-Augmented Security (proactive threat detection). 
                  The architecture is designed to handle high-security environments similar to my work at Airbus.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
