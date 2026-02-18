# Sentinel RBAC - Enterprise Multi-Tenant Security System 🛡️

**Sentinel RBAC** is a Role-Based Access Control (RBAC) dashboard. It demonstrates enterprise-grade security patterns for multi-tenant SaaS environments. This project uses a React frontend and a Java/Spring Boot backend architecture.

---

## 🎯 Recruiter Highlights
- **Architecture-First Design**: Includes an "Architecture" module to showcase technical depth in Spring Boot and Java.
- **Enterprise Patterns**: Implements multi-tenant data isolation and permission matrices.
- **Production-Ready UI**: Built with Tailwind CSS and TypeScript.

---

## ✨ Key Features
- **Multi-Tenant Isolation**: Ensures tenant-specific data separation.
- **Role Matrix**: Manages permissions for different user roles.
- **Audit Analysis**: Includes security logging and system monitoring modules.
- **Dynamic Dashboard**: Visualizes tenant activities and system health.

---

## 🛠️ Tech Stack
- **Frontend**: React.js (Functional Components, Hooks), TypeScript, Tailwind CSS.
- **Backend (Architectural Design)**: Java 17+, Spring Boot, Spring Security.
- **State Management**: Context API / Modern React patterns.
- **Tools**: Google AI Studio (Gemini 1.5 Flash), GitHub.

---

## 📂 Project Structure
Based on the workspace layout:
- `AuditAnalysis.tsx`: Handles security log visualization.
- `RoleMatrix.tsx`: The core engine for permission management.
- `TenantManager.tsx`: Manages multi-tenant lifecycle.
- `Architecture.tsx`: Explains the Spring Boot backend depth.

---

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1.  **Clone the repository**:
    ```bash
    git clone https://github.com
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm start
    ```

---

## 🛡️ Security Implementation
This project follows the **Principle of Least Privilege (PoLP)**. The backend architecture assumes a JWT-based authentication flow with Spring Security to validate tenant-specific roles at the API level.
