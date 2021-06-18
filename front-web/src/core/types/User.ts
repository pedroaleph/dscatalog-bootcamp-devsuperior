export type UserResponse = {
  content: User[];
  totalPages: number;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Role[];
}

export type Role = {
  id: number;
  authority: string;
}