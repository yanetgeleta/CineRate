import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { toast } from "sonner";

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finalizeLogin = async () => {
      const token = searchParams.get("token");
      if (token) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/user`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (response.ok) {
            const data = await response.json();
            login(data.user, token);
            navigate("/");
          } else {
            navigate("/login?error=invalid_token");
          }
        } catch (err) {
          toast.error("Unexpected error");
          console.error("Login Success Error:", err);
          navigate("/login?error=invalid_token");
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    };
    finalizeLogin();
  }, [searchParams, login, navigate]);
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[60vh]">
      <ClipLoader
        loading={loading}
        aria-label="Loading Movies Spinner"
        data-testid="loader"
        className="h-screen mt-20"
        color="white"
      />
    </div>
  );
};

export default LoginSuccess;
