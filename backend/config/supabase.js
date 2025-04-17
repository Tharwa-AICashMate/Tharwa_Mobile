import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://dojfpoupdhrpgvidugte.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvamZwb3VwZGhycGd2aWR1Z3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MzcyNzgsImV4cCI6MjA2MDMxMzI3OH0.4kaEa-0B_MPaMaulilc06zMQGcPsRKYqgrp5jWHwKZQ"
);
