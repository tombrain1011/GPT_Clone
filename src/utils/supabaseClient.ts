import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dujvyveqbypkygyzbynt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1anZ5dmVxYnlwa3lneXpieW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMzQ5MDMsImV4cCI6MjA0NDYxMDkwM30.LAklmydQqJVi4KUTgRAhZzi_DaNLKhNyHWmzqL4X0o8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
