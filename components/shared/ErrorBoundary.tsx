
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// Extending React.Component explicitly with generic types to ensure 'props' and 'state' are correctly inherited
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

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

    // In React class components, children must be accessed via this.props.children
    return this.props.children;
  }
}
