
// Mock Supabase client for UI-only preview environment
// This prevents crashes related to missing environment variables
export const supabase = {
  auth: {
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: { id: 'mock-id' } }, error: null }),
    signUp: async () => ({ data: { user: { id: 'mock-id' } }, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (cb: any) => {
      return { data: { subscription: { unsubscribe: () => {} } } };
    }
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => ({ data: null, error: null }),
        order: () => ({ limit: () => ({ data: [], error: null }) })
      }),
      order: () => ({ data: [], error: null })
    }),
    insert: () => ({ error: null }),
    rpc: () => ({ error: null })
  })
};
