import { useState, useEffect } from "react";

export function useAuth() {
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for mock session
    const storedSession = localStorage.getItem("mock_session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string) => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockSession = { user: { email } };
    setSession(mockSession);
    localStorage.setItem("mock_session", JSON.stringify(mockSession));

    setLoading(false);
    return { error: null };
  };

  const signUp = async (email: string) => {
    // For a mock, sign up is the same as sign in
    return signIn(email);
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    setSession(null);
    localStorage.removeItem("mock_session");
    setLoading(false);
  };

  return {
    session,
    loading,
    signIn,
    signUp,
    signOut,
  };
}
