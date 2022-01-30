export interface AuthReq {
  userName: string;
  Password: string;
}

export interface UserRoles {
  roleId: number;
  roleName: string;
}

export interface User {
  userId?: number;
  userName?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isTrialUser?: boolean;
  userRoles: UserRoles[] | undefined;
}
