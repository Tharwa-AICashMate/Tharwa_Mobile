import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://dojfpoupdhrpgvidugte.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvamZwb3VwZGhycGd2aWR1Z3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzcyNzgsImV4cCI6MjA2MDMxMzI3OH0.4kaEa-0B_MPaMaulilc06zMQGcPsRKYqgrp5jWHwKZQ";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})