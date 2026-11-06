
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Activity,
  Settings,
  LogOut,
  Bell,
  Search,
  UserCheck,
  UserX,
  LockKeyhole,
  TrendingUp,
  MoreHorizontal,
  Clock,
  Menu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Total Users",
    value: "2,450",
    change: "+12.5%",
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    title: "Active Users",
    value: "1,892",
    change: "+8.2%",
    icon: UserCheck,
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    title: "Successful Logins",
    value: "8,549",
    change: "+18.4%",
    icon: ShieldCheck,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    title: "Failed Logins",
    value: "126",
    change: "-4.3%",
    icon: UserX,
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
];

const activities = [
  {
    user: "John Smith",
    email: "john@gmail.com",
    action: "Successful Login",
    time: "2 minutes ago",
    status: "Success",
  },
  {
    user: "Sarah Wilson",
    email: "sarah@gmail.com",
    action: "Password Changed",
    time: "15 minutes ago",
    status: "Success",
  },
  {
    user: "Alex Johnson",
    email: "alex@gmail.com",
    action: "Failed Login",
    time: "28 minutes ago",
    status: "Failed",
  },
  {
    user: "Emma Davis",
    email: "emma@gmail.com",
    action: "New Account",
    time: "1 hour ago",
    status: "Success",
  },
];

const chartData = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 95 },
  { day: "Sun", value: 75 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    

      <div className="flex min-h-[calc(100vh-24px)] overflow-hidden rounded-3xl bg-[#0e172b] shadow-2xl shadow-purple-900/20">

        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-[#111c33] p-6 lg:flex">

          <div className="mb-12 flex items-center gap-2">
            
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>

          <nav className="flex-1 space-y-2">
            {[
              { name: "Dashboard", icon: LayoutDashboard, active: true },
              { name: "Users", icon: Users },
              { name: "Authentication", icon: LockKeyhole },
              { name: "Security Logs", icon: Activity },
              { name: "Settings", icon: Settings },
            ].map((item) => (
              <button
                key={item.name}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  item.active
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={19} />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
            <ShieldCheck className="mb-3 text-purple-400" size={28} />
            <h3 className="font-semibold text-white">Security Status</h3>
            <p className="mt-1 text-xs text-slate-400">
              Your authentication system is protected.
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-green-400">System Secure</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-7 lg:p-9">

          {/* Top Navbar */}
          <header className="mb-9 flex items-center justify-between gap-4">
            <div>
              
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Dashboard
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Welcome back! Here's what's happening today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 hover:bg-white/10">
                <Bell size={19} />
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-bold text-white">
                  A
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-white">
                    Admin
                  </p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          {/* Welcome Banner */}
          <section className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-6 sm:p-8">
            <div className="relative z-10">
              <p className="text-sm text-purple-100">Welcome to AuthNexa</p>
              <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Manage Your Security
              </h2>
              <p className="mt-2 max-w-lg text-sm text-purple-100">
                Monitor users, track authentication activities and
                keep your platform secure from one place.
              </p>
            </div>
            <ShieldCheck className="absolute -right-5 -top-8 h-48 w-48 text-white/10" />
          </section>

          {/* Statistics */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-white/10 bg-[#19253d] p-5 transition hover:-translate-y-1 hover:border-purple-400/40"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${stat.bg}`}>
                      <Icon className={stat.color} size={23} />
                    </div>
                    <MoreHorizontal className="text-slate-500" />
                  </div>

                  <p className="mt-5 text-sm text-slate-400">
                    {stat.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">
                      {stat.value}
                    </h3>
                    <span className="text-xs text-green-400">
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Analytics and Security */}
          <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* Login Analytics */}
            <div className="rounded-2xl border border-white/10 bg-[#19253d] p-6 xl:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white">
                    Login Analytics
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Weekly authentication activity
                  </p>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                  This Week
                </span>
              </div>

              <div className="mt-8 flex h-52 items-end justify-around gap-3 border-b border-white/10 pb-2">
                {chartData.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                  >
                    <div
                      className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-indigo-600 to-cyan-400 transition-all hover:opacity-75"
                      style={{ height: `${item.value}%` }}
                    />
                    <span className="text-xs text-slate-400">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Overview */}
            <div className="rounded-2xl border border-white/10 bg-[#19253d] p-6">
              <h3 className="font-bold text-white">
                Security Overview
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Current system status
              </p>

              <div className="my-8 flex flex-col items-center">
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-green-400/20 border-t-green-400">
                  <div className="text-center">
                    <ShieldCheck className="mx-auto text-green-400" size={30} />
                    <p className="mt-1 text-sm font-bold text-white">Secure</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">System Status</span>
                  <span className="text-green-400">Protected</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Threat Detection</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Last Scan</span>
                  <span className="text-white">Today</span>
                </div>
              </div>
            </div>
          </section>

          {/* Recent Activities */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#19253d]">
            <div className="flex flex-wrap items-center justify-between gap-3 p-6">
              <div>
                <h3 className="font-bold text-white">Recent Activities</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Latest user authentication events
                </p>
              </div>
              <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="border-y border-white/10 bg-white/[0.03] text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">User</th>
                    <th className="px-6 py-4 font-medium">Activity</th>
                    <th className="px-6 py-4 font-medium">Time</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity.email}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">
                          {activity.user}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {activity.email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {activity.action}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {activity.time}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            activity.status === "Success"
                              ? "bg-green-400/10 text-green-400"
                              : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <footer className="mt-8 text-center text-xs text-slate-500">
            © 2026 AuthNexa. All rights reserved.
          </footer>

        </main>
      </div>
    
  );
}
