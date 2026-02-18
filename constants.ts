
import { Tenant, Role, User, SecurityAudit } from './types';

export const MOCK_TENANTS: Tenant[] = [
  { id: 't-1', name: 'Airbus Global', domain: 'airbus.com', status: 'ACTIVE', createdAt: '2023-01-15' },
  { id: 't-2', name: 'Boeing Aero', domain: 'boeing.com', status: 'ACTIVE', createdAt: '2023-03-22' },
  { id: 't-3', name: 'SpaceX Systems', domain: 'spacex.com', status: 'PROVISIONING', createdAt: '2024-01-10' },
  { id: 't-4', name: 'Blue Origin', domain: 'blueorigin.com', status: 'SUSPENDED', createdAt: '2022-11-05' },
];

export const MOCK_ROLES: Role[] = [
  { id: 'r-admin', name: 'Org Admin', description: 'Full access to all tenant resources.', permissions: ['READ', 'WRITE', 'DELETE', 'ADMIN', 'EXPORT'] },
  { id: 'r-manager', name: 'Manager', description: 'Can edit resources but not delete.', permissions: ['READ', 'WRITE', 'EXPORT'] },
  { id: 'r-editor', name: 'Editor', description: 'Can create and modify items.', permissions: ['READ', 'WRITE'] },
  { id: 'r-viewer', name: 'Viewer', description: 'Read-only access to basic data.', permissions: ['READ'] },
];

export const MOCK_USERS: User[] = [
  { id: 'u-1', email: 'john.doe@airbus.com', fullName: 'John Doe', tenantId: 't-1', roleId: 'r-admin', status: 'ACTIVE', lastLogin: '2024-05-20T10:30:00Z' },
  { id: 'u-2', email: 'jane.smith@airbus.com', fullName: 'Jane Smith', tenantId: 't-1', roleId: 'r-manager', status: 'ACTIVE', lastLogin: '2024-05-19T14:20:00Z' },
  { id: 'u-3', email: 'alice.w@boeing.com', fullName: 'Alice Wong', tenantId: 't-2', roleId: 'r-editor', status: 'ACTIVE', lastLogin: '2024-05-21T09:00:00Z' },
  { id: 'u-4', email: 'bob.m@spacex.com', fullName: 'Bob Miller', tenantId: 't-3', roleId: 'r-viewer', status: 'ACTIVE' },
  { id: 'u-5', email: 'claire.t@blueorigin.com', fullName: 'Claire Thompson', tenantId: 't-4', roleId: 'r-editor', status: 'INACTIVE' },
];

export const MOCK_AUDITS: SecurityAudit[] = [
  { id: 'a-1', timestamp: '2024-05-21T10:15:00Z', actor: 'john.doe@airbus.com', action: 'CREATE_USER', resource: 'user:jane.doe@airbus.com', status: 'SUCCESS' },
  { id: 'a-2', timestamp: '2024-05-21T10:20:00Z', actor: 'alice.w@boeing.com', action: 'DELETE_FILE', resource: 'doc:budget_2024.pdf', status: 'FAILURE' },
  { id: 'a-3', timestamp: '2024-05-21T11:05:00Z', actor: 'system', action: 'TENANT_PROVISION', resource: 'tenant:spacex.com', status: 'SUCCESS' },
  { id: 'a-4', timestamp: '2024-05-21T11:45:00Z', actor: 'bob.m@spacex.com', action: 'LOGIN_ATTEMPT', resource: 'auth_service', status: 'FAILURE' },
  { id: 'a-5', timestamp: '2024-05-21T11:46:00Z', actor: 'bob.m@spacex.com', action: 'LOGIN_ATTEMPT', resource: 'auth_service', status: 'FAILURE' },
];
