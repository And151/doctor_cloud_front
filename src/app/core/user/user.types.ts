export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  type: UserTypes;
  roleId: IUserRoles;
}


export type IUserRoles = UserRole.USER | UserRole.SUPER_ADMIN | UserRole.ADMIN;

export enum UserRole {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  USER = 3
}

export enum UserRoleName {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user'
}

export enum UserTypes {
  DOCTOR = "doctor",
  USER = "user"
}