
export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'ADMIN' | 'EXPORT';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'PROVISIONING';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  tenantId: string;
  roleId: string;
  status: 'ACTIVE' | 'INACTIVE';
  lastLogin?: string;
}

export interface SecurityAudit {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  status: 'SUCCESS' | 'FAILURE';
}
