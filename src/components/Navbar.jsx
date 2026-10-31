
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isSignup = location.pathname === "/signup";
  const isResetPassword = location.pathname === "/reset-password";

  return (
    <nav className="absolute left-0 top-0 z-20 flex w-full items-center justify-between bg-transparent px-6 py-5 sm:px-10">

      {/* AuthNexa Logo */}
      <Link to="/" className="flex items-center">
        <img
          src="/AuthNexa.png"
          alt="AuthNexa Logo"
          className="h-auto w-44 object-contain sm:w-56 md:w-64"
        />
      </Link>

      {/* Navigation Buttons */}
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
