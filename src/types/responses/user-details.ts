import type { Role } from "../global/commonTypes";

export interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  isEmailVerified: string;
}

export interface IUserResponse {
  data: {
    message: string;
    data: UserDetails;
    statusCode: number;
  };
}
