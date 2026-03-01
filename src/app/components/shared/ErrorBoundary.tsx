import { Component, type ReactNode } from "react";
import { PrimaryButton } from "./PrimaryButton";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.warn("[ErrorBoundary] Uncaught React error:", error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-dvh flex items-center justify-center bg-[#f6f8fc] px-6">
          <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 max-w-[400px] w-full text-center">
            <div className="size-[64px] rounded-full bg-[#fef2f2] flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="font-['Lexend',sans-serif] font-bold text-[22px] text-[#0f172a] mb-2">
              Something went wrong
            </h2>
            <p className="font-['Inter',sans-serif] text-[14px] text-[#64748b] leading-[22px] mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <p className="font-['Inter',sans-serif] text-[12px] text-[#94a3b8] bg-[#f8fafc] rounded-[12px] px-4 py-3 mb-6 text-left break-all">
              {this.state.error?.message || "Unknown error"}
            </p>
            <PrimaryButton onClick={() => window.location.reload()}>
              Refresh Page
            </PrimaryButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}