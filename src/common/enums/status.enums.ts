export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  TENANT_ADMIN = 'tenant_admin',
  EMPLOYEE = 'employee',
  INDIVIDUAL_CUSTOMER = 'individual_customer',
}

export enum team_member_role {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export enum subscription_status {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export enum payment_status {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum alert_status {
  UNRESOLVED = 'unresolved',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
}

export enum verdict {
  MALICIOUS = 'malicious',
  BENIGN = 'benign',
}
