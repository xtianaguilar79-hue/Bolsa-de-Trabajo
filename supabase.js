// supabase.js
const SUPABASE_URL = 'https://hmyxiighjsyfgjcrsuil.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhteXhpaWdoanN5ZmdqY3JzdWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzUyODEsImV4cCI6MjA3NzE1MTI4MX0.GxuPLLNQMbjcFlyFRHeJti6h6cwIQy_OU-n8i9XH-sk';

// Exportar cliente de Supabase
export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);