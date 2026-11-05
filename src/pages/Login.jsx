
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        " https://authnexa-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || data.error || `Login failed (${response.status})`
        );
      }

      // Store authentication token if returned by backend.
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setSuccess(data.message || "Login successful!");

      // Navigate after successful login.
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Check your backend."
          : err.message || "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-violet-300 to-purple-400 px-4 py-24">

      <div className="w-full max-w-md rounded-xl bg-[#0d172b] px-7 py-10 text-white shadow-2xl sm:px-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Login Account
          </h1>

          <p className="text-indigo-300 mt-3 text-sm">
            Login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-7 space-y-4">

          {/* Email */}
          <div className="flex items-center gap-3 rounded-full bg-[#303c5d] px-5 py-3">

            <Mail size={19} className="shrink-0 text-indigo-200" />

            <input
              type="email"
              name="email"
              placeholder="Email ID"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-300"
            />

          </div>

          {/* Password */}
          <div className="flex items-center gap-3 rounded-full bg-[#303c5d] px-5 py-3">

            <LockKeyhole size={19} className="shrink-0 text-indigo-200" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-300"
            />

            {/* Show / Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-indigo-200 hover:text-white transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">

            <Link
              to="/reset-password"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Error Message */}
          {error && (
            <p
              className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300"
              role="alert"
            >
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p
              className="rounded-lg bg-green-500/10 p-3 text-sm text-green-300"
              role="status"
            >
              {success}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-800 py-3 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-slate-300">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-sky-400 underline hover:text-sky-300"
          >
            Sign Up
          </Link>

        </p>

      </div>
    </div>
  );
}

export default Login;
