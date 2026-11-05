import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
   const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      // Replace this URL with your actual backend OTP verification endpoint.
      const response = await axios.post(
        " https://authnexa-backend.onrender.com/api/auth/send-reset-otp",
        {
          email
        }
      );

      alert(response.data.message || "Email sent successfully!");

      // Change this route to your actual reset-new-password page.
      navigate("/reset-new-password", {
        state: { email },
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Email send failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-violet-300 to-purple-400 px-4 pb-10 pt-24">
      {/* Reset Password Card */}
      <section className="w-full max-w-[460px] rounded-xl border border-white/10 bg-[#0d172c] px-7 py-10 shadow-2xl shadow-black/20 sm:px-10 sm:py-11">
        {/* Heading */}
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Reset password
          </h1>

          <p className="mt-5 text-sm text-indigo-200">
            Enter your registered email address
          </p>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex h-12 items-center gap-3 rounded-full bg-[#303c5d] px-5 focus-within:ring-2 focus-within:ring-indigo-400">
            {/* Email Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0 text-indigo-200"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            <input
              type="email"
              name="email"
              placeholder="Email id"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              required
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="h-12 w-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-800 text-sm font-semibold text-white shadow-md transition hover:brightness-110 active:scale-[0.98]"
          >
            Submit
          </button>
        </form>

        {/* Back to Signup */}
        <p className="mt-6 text-center text-sm text-slate-300">
          Remember your password?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-400 underline underline-offset-2 hover:text-blue-300"
          >
            Back to Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default ResetPassword;