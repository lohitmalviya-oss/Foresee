
import { User, AuthProviderType } from '../types/user';

// Persistent mock database in memory
const MOCK_USERS: User[] = [
  {
    id: 'u_initial_1',
    name: 'Lead Analyst',
    email: 'analyst@foresee.io',
    provider: 'email',
    credibilityScore: 1250,
    createdAt: new Date().toISOString()
  }
];

export const authService = {
  async login(email: string, pass: string): Promise<User> {
    console.log('[AuthService] Attempting Login:', email);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      // Custom error for UI to catch and offer registration
      throw new Error('user-not-found');
    }
    
    // In a real app, password verification happens here
    return user;
  },

  async register(name: string, email: string, pass: string): Promise<User> {
    console.log('[AuthService] Attempting Registration:', email);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (MOCK_USERS.find(u => u.email === email)) {
      throw new Error('email-already-in-use');
    }

    const newUser: User = {
      id: `u_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      provider: 'email',
      credibilityScore: 0,
      createdAt: new Date().toISOString()
    };
    
    MOCK_USERS.push(newUser);
    return newUser;
  },

  async loginWithGoogle(): Promise<User> {
    console.log('[AuthService] Attempting Google login');
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockEmail = 'google_user@example.com';
    let user = MOCK_USERS.find(u => u.email === mockEmail);
    if (!user) {
      user = {
        id: `u_g_${Math.random().toString(36).substr(2, 9)}`,
        name: 'Google Analyst',
        email: mockEmail,
        provider: 'google',
        credibilityScore: 0,
        createdAt: new Date().toISOString()
      };
      MOCK_USERS.push(user);
    }
    return user;
  },

  async sendOTP(phone: string): Promise<boolean> {
    console.log('[AuthService] Sending OTP to:', phone);
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  },

  async verifyOTP(phone: string, otp: string): Promise<User> {
    console.log('[AuthService] Verifying OTP for:', phone);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp !== '123456') throw new Error('invalid-otp');

    let user = MOCK_USERS.find(u => u.phone === phone);
    if (!user) {
      user = {
        id: `u_p_${Math.random().toString(36).substr(2, 9)}`,
        name: `User ${phone.slice(-4)}`,
        phone,
        provider: 'phone',
        credibilityScore: 0,
        createdAt: new Date().toISOString()
      };
      MOCK_USERS.push(user);
    }
    return user;
  },

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
