
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_TENANTS, MOCK_USERS, MOCK_AUDITS } from '../constants';

const DashboardOverview: React.FC = () => {
  const tenantData = [
    { name: 'Active', value: MOCK_TENANTS.filter(t => t.status === 'ACTIVE').length },
    { name: 'Provisioning', value: MOCK_TENANTS.filter(t => t.status === 'PROVISIONING').length },
    { name: 'Suspended', value: MOCK_TENANTS.filter(t => t.status === 'SUSPENDED').length },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#ef4444'];

  const auditStats = [
    { name: 'Success', count: MOCK_AUDITS.filter(a => a.status === 'SUCCESS').length },
    { name: 'Failure', count: MOCK_AUDITS.filter(a => a.status === 'FAILURE').length },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Tenants', value: MOCK_TENANTS.length, icon: 'fa-building', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Users', value: MOCK_USERS.length, icon: 'fa-users', color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Active Sessions', value: 12, icon: 'fa-bolt', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Failed Access', value: 3, icon: 'fa-shield-halved', color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-xl`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Tenant Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tenantData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tenantData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-sm mt-4">
            {tenantData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                <span>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Security Events (Success vs Failure)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={auditStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
