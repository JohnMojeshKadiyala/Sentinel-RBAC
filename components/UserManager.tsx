
import React from 'react';
import { MOCK_USERS, MOCK_TENANTS, MOCK_ROLES } from '../constants';

const UserManager: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Identity Directory</h3>
          <p className="text-slate-500 text-sm">Manage users, their organizational context, and security profiles</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
            <input 
              type="text" 
              placeholder="Search directory..." 
              className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <i className="fa-solid fa-user-plus text-xs"></i>
            <span>Invite User</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User Identity</th>
              <th className="px-6 py-4">Tenant</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Last Activity</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_USERS.map((user) => {
              const tenant = MOCK_TENANTS.find(t => t.id === user.tenantId);
              const role = MOCK_ROLES.find(r => r.id === user.roleId);
              
              return (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full border-2 border-slate-100 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/150?u=${user.id}`} alt="" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 leading-none">{user.fullName}</p>
                        <p className="text-xs text-slate-500 mt-1">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                      {tenant?.name || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.roleId === 'r-admin' ? 'bg-indigo-500' : 'bg-slate-400'}`}></div>
                      <span className="text-sm text-slate-600 font-medium">{role?.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      user.status === 'ACTIVE' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-all">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-all">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
