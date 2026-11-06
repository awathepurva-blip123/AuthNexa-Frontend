
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isSignup = location.pathname === "/signup";
  const isResetPassword = location.pathname === "/reset-password";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <nav
      className={`relative z-20 flex w-full items-center justify-between px-6 py-5 sm:px-10 ${
        isDashboard
          ? "bg-[#111c33] border-b border-white/10"
          : "absolute left-0 top-0 bg-transparent"
      }`}
    >
      <Link to="/" className="flex items-center">
        <img
          src="/AuthNexa.png"
          alt="AuthNexa Logo"
          className="h-auto w-44 object-contain sm:w-56 md:w-64"
        />
      </Link>

      {isHome && (
        <Link
          to="/login"
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Login
        </Link>
      )}

      {isSignup && (
        <Link
          to="/login"
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-900 transition hover:border-indigo-500"
        >
          Login
        </Link>
      )}

      {isResetPassword && (
        <Link
          to="/login"
          className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-900 transition hover:border-indigo-500"
        >
          Back
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
