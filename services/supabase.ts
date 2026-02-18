import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://astmywxxdjegvmjytzty.supabase.co'
const supabaseAnonKey = 'sb_publishable_nseCry8tN2d3Jt1BmnCaHA_qNryS7-J'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
