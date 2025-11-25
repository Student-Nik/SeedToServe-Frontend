// src/pages/GoogleLogin.jsx
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

const GoogleLogin = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);

    // Redirect to backend Google OAuth
    window.location.href = "http://localhost:8080/oauth2/authorize/google";
  };

  return (
    <>
      <Button
        className="w-full flex items-center justify-centerS gap-2 bg-white text-black hover:bg-White-100"
        onClick={handleGoogleLogin}
      >
        <FcGoogle />
        {loading ? "Loading..." : "Continue with Google"}
      </Button>
    </>
  );
};

export default GoogleLogin;
