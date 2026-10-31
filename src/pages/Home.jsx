import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#fdf5ff] to-white px-5 pb-10 pt-28 text-center">
      {/* Robot Image */}
      <div className="mb-8 flex h-44 w-52 items-center justify-center sm:h-52">
        <img
          src="/robot.png"
          alt="Friendly robot assistant"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Greeting */}
      <p className="mb-4 text-xl font-medium text-slate-950 sm:text-3xl">
        Hey GreatStack! <span>👋🏻</span>
      </p>

      {/* Main Heading */}
      <h1 className="text-4xl font-bold tracking-tight text-[#111827] sm:text-5xl md:text-7xl">
        Welcome to AuthNexa
      </h1>

      {/* Description */}
      <p className="mt-7 max-w-3xl text-base leading-8 text-slate-700 sm:text-xl">
        Let's start with a quick product tour and we will have you up and
        running in no time!
      </p>

      {/* Get Started Button */}
      <Link
        to="/signup"
        className="mt-12 inline-flex min-w-52 items-center justify-center rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-lg font-medium text-slate-900 shadow-sm transition duration-300 hover:border-indigo-500 hover:bg-indigo-50"
      >
        Get Started
      </Link>
    </main>
  );
}

export default Home;