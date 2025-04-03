
/**
 * Core application types for the WayPoint application
 */

// User roles in the application
export type UserRole = "student" | "educator" | "administrator";

// User profile information
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  avatar_url?: string;
}
