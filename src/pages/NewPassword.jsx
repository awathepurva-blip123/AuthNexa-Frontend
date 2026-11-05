
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function NewPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    sessionStorage.getItem("resetEmail") ||
    "";

  const [otp, setOtp] = useState(
    location.state?.otp || sessionStorage.getItem("resetOtp") || ""
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email) {
      setErrorMessage(
        "Email not found. Please restart the password reset process."
      );
      return;
    }

    if (!otp.trim()) {
      setErrorMessage("Please enter the OTP sent to your email.");
      return;
    }

    if (!password || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      // Send email, OTP, and new password to the backend.
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          email: email.trim(),
          otp: otp.trim(),
          newPassword: password,
        }
      
      );

      // The backend validates the OTP and resets the password.
      if (response.data.success) {
        sessionStorage.removeItem("resetEmail");
        sessionStorage.removeItem("resetOtp");

        alert(
          response.data.message ||
            "Password has been reset successfully!"
        );

        navigate("/login", { replace: true });
      } else {
        setErrorMessage(
          response.data.message || "Password reset failed."
        );
      }
    } catch (error) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message
      );

      setErrorMessage(
        error.response?.data?.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-violet-300 to-purple-400 px-4 py-10">

      {/* Main Card */}
      <div className="w-full max-w-lg rounded-2xl border border-slate-700/50 bg-slate-950 px-7 py-10 shadow-2xl sm:px-10">

        <h1 className="mb-4 text-center text-3xl font-bold text-white">
          Reset Password
        </h1>

        <p className="mb-6 text-center text-sm text-indigo-200">
          Enter your OTP and create a new password.
        </p>

        {email && (
          <p className="mb-6 break-all text-center text-sm text-slate-300">
            Email: <span className="text-indigo-300">{email}</span>
          </p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* OTP Input */}
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Enter OTP
          </label>

          <div className="mb-6 flex items-center gap-3 rounded-full bg-slate-700 px-5 transition focus-within:ring-2 focus-within:ring-indigo-500">

            {/* OTP Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0 text-indigo-200"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 00-5 5v3H6a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2v-7a2 2 0 00-2-2h-1V7a5 5 0 00-5-5zm-3 8V7a3 3 0 116 0v3H9z"
                clipRule="evenodd"
              />
            </svg>

            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="Enter OTP sent to your email"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full min-w-0 bg-transparent py-4 text-sm tracking-widest text-white outline-none placeholder:tracking-normal placeholder:text-slate-300"
            />
          </div>

          {/* New Password */}
          <label
            htmlFor="newPassword"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            New Password
          </label>

          <div className="mb-2 flex items-center gap-3 rounded-full bg-slate-700 px-5 transition focus-within:ring-2 focus-within:ring-indigo-500">

            {/* Lock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0 text-indigo-200"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25V9h-.75A2.25 2.25 0 003.75 11.25v8.25A2.25 2.25 0 006 21.75h12a2.25 2.25 0 002.25-2.25v-8.25A2.25 2.25 0 0018 9h-.75V6.75A5.25 5.25 0 0012 1.5zm-3 7.5V6.75a3 3 0 016 0V9H9z"
                clipRule="evenodd"
              />
            </svg>

            <input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              disabled={loading}
              className="w-full min-w-0 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-300"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="shrink-0 text-indigo-200 hover:text-white"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* Hide Password Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.9 5.2A10.8 10.8 0 0112 5c5.2 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.3 3.2M6.2 6.2C3.8 7.8 2.1 10 1.5 12c1 2.5 4.3 7 10.5 7 1.1 0 2.1-.2 3-.5"
                  />
                </svg>
              ) : (
                /* Show Password Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          <p className="mb-6 pl-2 text-xs text-slate-400">
            Password must contain at least 8 characters.
          </p>

          {/* Confirm Password */}
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Confirm Password
          </label>

          <div className="mb-2 flex items-center gap-3 rounded-full bg-slate-700 px-5 transition focus-within:ring-2 focus-within:ring-indigo-500">

            {/* Lock Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0 text-indigo-200"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25V9h-.75A2.25 2.25 0 003.75 11.25v8.25A2.25 2.25 0 006 21.75h12a2.25 2.25 0 002.25-2.25v-8.25A2.25 2.25 0 0018 9h-.75V6.75A5.25 5.25 0 0012 1.5zm-3 7.5V6.75a3 3 0 016 0V9H9z"
                clipRule="evenodd"
              />
            </svg>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              disabled={loading}
              className="w-full min-w-0 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-300"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword((prev) => !prev)
              }
              className="shrink-0 text-indigo-200 hover:text-white"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? (
                /* Hide Password Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.9 5.2A10.8 10.8 0 0112 5c5.2 0 8.5 4.5 9.5 7-.4 1-1.2 2.1-2.3 3.2M6.2 6.2C3.8 7.8 2.1 10 1.5 12c1 2.5 4.3 7 10.5 7 1.1 0 2.1-.2 3-.5"
                  />
                </svg>
              ) : (
                /* Show Password Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {/* Password Match Message */}
          {confirmPassword && (
            <p
              className={`mb-6 pl-2 text-xs ${
                password === confirmPassword
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {password === confirmPassword
                ? "Passwords match."
                : "Passwords do not match."}
            </p>
          )}

          {!confirmPassword && <div className="mb-6" />}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-800 py-3.5 text-base font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:from-indigo-600 hover:to-indigo-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Updating Password..." : "Reset Password"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-slate-400">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-indigo-300 transition hover:text-white"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default NewPassword;

