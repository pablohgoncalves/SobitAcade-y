import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export function useAdmin() {
  const { session } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      // In mock mode, we'll just say the logged-in user is always an admin
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
    setLoading(false);
  }, [session]);

  return { isAdmin, loading };
}
