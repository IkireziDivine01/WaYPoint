
// Define application-specific types here without duplicating Database type
export type UserRole = "student" | "educator" | "administrator";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}
