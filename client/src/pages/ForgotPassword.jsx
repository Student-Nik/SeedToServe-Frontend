import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "@/services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const otpRefs = useRef([]);

  const otp = otpDigits.join("");

  const handleOtpChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pasted)) return;

    e.preventDefault();
    const digits = pasted.slice(0, 6).split("");
    const next = ["", "", "", "", "", ""];
    digits.forEach((d, i) => (next[i] = d));
    setOtpDigits(next);
    otpRefs.current[Math.min(digits.length, 5)]?.focus();
  };

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

    if (otp.length < 6) {
      setError("Please enter the 6-digit OTP.");
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

      const response = await resetPassword(email, otp, newPassword);

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
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] px-4 py-8 sm:py-12">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl sm:rounded-2xl shadow-lg border border-[#2F4C3B]/10 overflow-hidden">

        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#2F4C3B] via-[#E24A3B] to-[#E8A33D]" />

        <div className="p-6 sm:p-8 md:p-10">

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div
              className={`h-1.5 w-8 sm:w-10 rounded-full transition-colors ${
                step === 1 ? "bg-[#E24A3B]" : "bg-[#2F4C3B]"
              }`}
            />
            <div
              className={`h-1.5 w-8 sm:w-10 rounded-full transition-colors ${
                step === 2 ? "bg-[#E24A3B]" : "bg-gray-200"
              }`}
            />
          </div>

          {/* Header */}
          <div className="text-center mb-7 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2F4C3B] tracking-tight">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              {step === 1
                ? "Enter your registered email to receive a verification code"
                : "Enter the code sent to your email and set a new password"}
            </p>
          </div>

          {/* Messages */}
          {message && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm flex items-start gap-2">
              <span className="mt-0.5">✓</span>
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <span className="mt-0.5">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2F4C3B] mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoFocus
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-[#E24A3B]/40 focus:border-[#E24A3B] text-sm sm:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-[#E24A3B] text-white font-semibold text-sm sm:text-base hover:bg-[#c93d2f] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5">

              {/* Email (readonly summary) */}
              <div className="flex items-center justify-between bg-[#FDF8F3] border border-[#2F4C3B]/10 rounded-lg px-4 py-3">
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Sending code to</p>
                  <p className="text-sm font-medium text-[#2F4C3B] truncate">{email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtpDigits(["", "", "", "", "", ""]);
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                    setMessage("");
                  }}
                  className="text-xs sm:text-sm font-medium text-[#E24A3B] hover:underline whitespace-nowrap ml-3 flex-shrink-0"
                >
                  Change
                </button>
              </div>

              {/* OTP */}
              <div>
                <label className="block text-sm font-medium text-[#2F4C3B] mb-3">
                  Enter OTP
                </label>

                <div
                  className="flex justify-between gap-1.5 sm:gap-2"
                  onPaste={handleOtpPaste}
                >
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-lg outline-none transition-all focus:ring-2 focus:ring-[#E24A3B]/40 focus:border-[#E24A3B]"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="mt-2 text-xs sm:text-sm text-[#2F4C3B] hover:text-[#E24A3B] font-medium disabled:opacity-50"
                >
                  Didn't receive the code? Resend
                </button>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-[#2F4C3B] mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-[#E24A3B]/40 focus:border-[#E24A3B] text-sm sm:text-base"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-[#2F4C3B] mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-[#E24A3B]/40 focus:border-[#E24A3B] text-sm sm:text-base"
                />
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-[#E24A3B] text-white font-semibold text-sm sm:text-base hover:bg-[#c93d2f] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtpDigits(["", "", "", "", "", ""]);
                    setNewPassword("");
                    setConfirmPassword("");
                    setError("");
                    setMessage("");
                  }}
                  className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  Change Email
                </button>
              </div>
            </form>
          )}

          {/* Login */}
          <div className="text-center mt-7 pt-6 border-t border-gray-100">
            <button
              onClick={() => navigate("/login")}
              className="text-[#E24A3B] font-medium hover:underline text-sm sm:text-base"
            >
              ← Back to Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;