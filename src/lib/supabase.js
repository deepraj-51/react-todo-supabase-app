import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://augwyfiawnafmucrgxjs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1Z3d5Zmlhd25hZm11Y3JneGpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5Mzk0OTMsImV4cCI6MjA3NjUxNTQ5M30.KvN938cGvHJHLyKjeRM7ernjMaD9aLoE-wY8Ht4wzVU' // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
