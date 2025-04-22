// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// dotenv.config();

// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://YOUR_PROJECT.supabase.co'
const supabaseAnonKey = 'YOUR_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
