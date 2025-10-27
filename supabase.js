// supabase.js
const supabaseUrl = 'https://hmyxiighjsyfgjcrsuil.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhteXhpaWdoanN5ZmdqY3JzdWlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NzUyODEsImV4cCI6MjA3NzE1MTI4MX0.GxuPLLNQMbjcFlyFRHeJti6h6cwIQy_OU-n8i9XH-sk';

// 👉 Reemplaza con tus claves (las ves en Settings > API en Supabase)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function createClient(supabaseUrl, supabaseAnonKey) {
  return {
    auth: {
      async signInWithPassword({ email, password }) {
        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: 'POST',
          headers: { 'apikey': supabaseAnonKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, gotrue_meta_security: {} })
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        localStorage.setItem('sb-token', data.access_token);
        return { data: { user: { email } } };
      },
      async signOut() {
        localStorage.removeItem('sb-token');
      },
      async getSession() {
        const token = localStorage.getItem('sb-token');
        return token ? { access_token: token } : null;
      }
    },
    from(table) {
      return {
        async select(columns = '*') {
          const token = localStorage.getItem('sb-token');
          const res = await fetch(`${supabaseUrl}/rest/v1/${table}?select=${columns}`, {
            headers: { 
              'apikey': supabaseAnonKey,
              'Authorization': `Bearer ${token}`
            }
          });
          if (!res.ok) throw new Error('No autorizado');
          return { data: await res.json() };
        }
      };
    }
  };
}