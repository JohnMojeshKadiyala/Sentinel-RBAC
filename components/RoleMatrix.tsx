
import React, { useState } from 'react';
import { MOCK_ROLES } from '../constants';
import { Permission, Role } from '../types';

const PERMISSIONS: Permission[] = ['READ', 'WRITE', 'DELETE', 'ADMIN', 'EXPORT'];

const RoleMatrix: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>(MOCK_ROLES);

  const togglePermission = (roleId: string, permission: Permission) => {
    setRoles(prev => prev.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permission);
        return {
          ...role,
          permissions: hasPermission 
            ? role.permissions.filter(p => p !== permission)
            : [...role.permissions, permission]
        };
      }
      return role;
    }));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-800">Permission Matrix</h3>
        <p className="text-slate-500 text-sm">Fine-grained access control configuration for each role</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
              <th className="px-6 py-4 text-left min-w-[200px]">Role Name</th>
              {PERMISSIONS.map(p => (
                <th key={p} className="px-6 py-4 text-center">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-slate-800">{role.name}</div>
                    <div className="text-xs text-slate-500 max-w-[200px] truncate">{role.description}</div>
                  </div>
                </td>
                {PERMISSIONS.map(p => (
                  <td key={p} className="px-6 py-4 text-center">
                    <button 
                      onClick={() => togglePermission(role.id, p)}
                      className={`w-6 h-6 rounded border flex items-center justify-center transition-all ${
                        role.permissions.includes(p) 
                          ? 'bg-indigo-600 border-indigo-600 text-white' 
                          : 'border-slate-300 text-transparent hover:border-indigo-400'
                      }`}
                    >
                      <i className="fa-solid fa-check text-[10px]"></i>
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 flex justify-end">
        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
          Save Configuration
        </button>
      </div>
    </div>
  );
};

export default RoleMatrix;
