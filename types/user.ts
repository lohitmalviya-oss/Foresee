
export type AuthProviderType = 'google' | 'email' | 'phone';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  provider: AuthProviderType;
  credibilityScore: number;
  createdAt: string;
}
