import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  async function handleSignup(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Change this URL to match your backend registration endpoint.
      const response = await fetch(
        "http://localhost:3000/api/auth/register",
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
          data.message || data.error || `Registration failed (${response.status})`
        );
      }

      setSuccess(data.message || "Account created successfully!");

      // Navigate only after successful registration.
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.message === "Failed to fetch"
          ? "Cannot connect to the server. Check that your backend is running and the API URL is correct."
          : err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200 via-violet-300 to-purple-400 px-4 py-24">
      <Navbar />

      <div className="w-full max-w-md rounded-xl bg-[#0d172b] px-7 py-10 text-white shadow-2xl sm:px-10">
        <h1 className="text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mt-3 text-center text-sm text-indigo-300">
          Create your account
        </p>

        <form onSubmit={handleSignup} className="mt-7 space-y-4">
          <div className="flex items-center gap-3 rounded-full bg-[#303c5d] px-5 py-3">
            <UserRound size={19} className="shrink-0 text-indigo-200" />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              aria-label="Full Name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-300"
            />
          </div>

          <div className="flex items-center gap-3 rounded-full bg-[#303c5d] px-5 py-3">
            <Mail size={19} className="shrink-0 text-indigo-200" />

            <input
              type="email"
              name="email"
              placeholder="Email id"
              aria-label="Email ID"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-300"
            />
          </div>

          <div className="flex items-center w-full rounded-full bg-slate-700 px-6 py-4">
            <LockKeyhole
              size={22}
              className="text-indigo-200 shrink-0"
            />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="ml-4 w-full bg-transparent text-white placeholder-gray-300 outline-none"
            />

            {/* Show / Hide Password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-3 text-indigo-200 hover:text-white transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >

              {showPassword ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}
            </button>
          </div>

          <div className="flex justify-start">
            <Link
              to="/reset-password"
              className="text-sm text-indigo-400 transition hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-lg bg-green-500/10 p-3 text-sm text-green-300" role="status">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-800 py-3 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-400 underline hover:text-sky-300"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
