
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, Prediction } from '../types/index';

interface AppState {
  user: UserProfile | null;
  predictions: Prediction[];
  reputation: number;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null) => void;
  setPredictions: (predictions: Prediction[]) => void;
  setReputation: (rep: number) => void;
  setAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [reputation, setReputation] = useState<number>(0);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <AppContext.Provider 
      value={{ 
        user, 
        predictions, 
        reputation, 
        isAuthenticated,
        setUser, 
        setPredictions, 
        setReputation, 
        setAuthenticated
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
