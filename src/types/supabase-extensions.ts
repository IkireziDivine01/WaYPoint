
import { Database as SupabaseDatabase } from "@/integrations/supabase/types";

/**
 * Extended type definitions for tables not yet in the generated Supabase types
 */

export interface RolePrivilege {
  id: string;
  role: SupabaseDatabase["public"]["Enums"]["user_role"];
  privilege_name: string;
  privilege_description: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Extend the Database type with our additional tables using declaration merging
declare module '@/integrations/supabase/types' {
  interface Database {
    public: {
      Tables: {
        role_privileges: {
          Row: RolePrivilege;
          Insert: Omit<RolePrivilege, 'id' | 'created_at' | 'updated_at'>;
          Update: Partial<Omit<RolePrivilege, 'id' | 'created_at' | 'updated_at'>>;
          Relationships: never[];
        };
      } & SupabaseDatabase["public"]["Tables"];
    }
  }
}
