export interface DashboardLayoutProps {
  admin: React.ReactNode;
  provider: React.ReactNode;
  customer: React.ReactNode;
}

export type UserRole = "ADMIN" | "PROVIDER" | "CUSTOMER";