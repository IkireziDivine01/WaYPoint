
import type { Database as SupabaseDatabase } from '@/integrations/supabase/types';

// Re-export the Database type to avoid conflicts
export type Database = SupabaseDatabase;

// Add additional type mappings
export type DbSchema = Database['public'];
export type Tables = DbSchema['Tables'];
export type Profiles = Tables['profiles']['Row'];
