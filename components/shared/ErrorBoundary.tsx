
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Something went wrong</h1>
          <p className="text-slate-500 mb-8 max-w-md">The game encountered a small problem. Please refresh the page to continue.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 transition-all"
          >
            Refresh Now
          </button>
        </div>
      );
    }

    // Fix: In React class components, children must be accessed via this.props.children
    return this.props.children;
  }
}
