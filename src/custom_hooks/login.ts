"use client";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      return await res.json();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
