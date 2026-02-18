
import React, { useState } from 'react';
import { MOCK_TENANTS } from '../constants';
import { Tenant } from '../types';

const TenantManager: React.FC = () => {
  const [tenants] = useState<Tenant[]>(MOCK_TENANTS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'SUSPENDED': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'PROVISIONING': return 'bg-sky-100 text-sky-700 border-sky-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Organization Management</h3>
          <p className="text-slate-500 text-sm">Manage multi-tenant isolation and provisioning</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm">
          <i className="fa-solid fa-plus text-xs"></i>
          <span>Add Tenant</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Organization Name</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tenants.map((tenant) => (
              <tr key={tenant.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {tenant.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-800">{tenant.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">{tenant.domain}</td>
                <td className="px-6 py-4 text-slate-600">{tenant.createdAt}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(tenant.status)}`}>
                    {tenant.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Settings">
                      <i className="fa-solid fa-gear"></i>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors" title="Suspend">
                      <i className="fa-solid fa-ban"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantManager;
