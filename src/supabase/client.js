import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uxqmfdbewviwgzgjnxxo.supabase.co";
const supabaseAnonKey = "sb_publishable_Rm23_DyGamogd3Tx3WMLCg_F8ZgVJz3";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
