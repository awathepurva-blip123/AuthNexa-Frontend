import { Link } from "react-router-dom";

function ForgotPassword() {
return ( <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-200 via-violet-300 to-purple-400 px-5 py-24"> <section className="w-full max-w-md rounded-xl bg-[#0d172c] p-8 text-center shadow-2xl sm:p-10"> <h1 className="text-3xl font-bold text-white">
Forgot Password? </h1>


    <p className="mt-4 text-sm leading-6 text-indigo-200">
      Password recovery will be available here.
    </p>

    <Link
      to="/login"
      className="mt-7 inline-block text-sm font-medium text-blue-400 underline hover:text-blue-300"
    >
    Back to Login
    </Link>
  </section>
</main>


);
}

export default ForgotPassword;
