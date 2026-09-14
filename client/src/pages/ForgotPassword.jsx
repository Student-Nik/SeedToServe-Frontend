import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "@/services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email);

      setMessage(response.message || "OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword(
        email,
        otp,
        newPassword
      );

      setMessage(response.message || "Password reset successfully.");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2F4C3B]">
            {step === 1 ? "Forgot Password?" : "Reset Password"}
          </h1>

          <p className="text-gray-500 mt-2">
            {step === 1
              ? "Enter your email to receive an OTP"
              : "Enter the OTP and your new password"}
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E24A3B]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg bg-[#E24A3B] text-white font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>

            {/* Email */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 mb-4"
            />

            {/* OTP */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP
            </label>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E24A3B] mb-4"
            />

            {/* New Password */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E24A3B] mb-4"
            />

            {/* Confirm Password */}
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#E24A3B]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 rounded-lg bg-[#E24A3B] text-white font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setOtp("");
                setNewPassword("");
                setConfirmPassword("");
                setError("");
                setMessage("");
              }}
              className="w-full mt-3 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Change Email
            </button>

          </form>
        )}

        {/* Login */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/login")}
            className="text-[#E24A3B] font-medium hover:underline"
          >
            Back to Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;