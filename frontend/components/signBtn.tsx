"use client";

import { useState, type FormEvent } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Link from "next/link";
import { TEAM_OPTIONS } from "@/lib/constants/teams";
import { useAuth } from "@/lib/auth/auth-context";

type SignInBtnProps = {
  variant?: "default" | "mobile";
};

export default function SignInBtn({ variant = "default" }: SignInBtnProps) {
  const { user, login, register, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    favorite_team: "",
  });

  const containerClass =
    variant === "mobile"
      ? "flex flex-col gap-3"
      : "flex items-center gap-3";

  const buttonBase =
    "inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300";

  const primaryButton =
    "border-red-500/60 bg-red-500/10 text-white hover:bg-red-500";

  const ghostButton =
    "border-white/20 text-white hover:border-red-500/60 hover:text-red-200";

  const fullWidth = variant === "mobile" ? "w-full" : "";

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(loginForm.username, loginForm.password);
      setLoginOpen(false);
      setLoginForm({ username: "", password: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register({
        username: registerForm.username,
        password: registerForm.password,
        favorite_team: registerForm.favorite_team || null,
      });
      setRegisterOpen(false);
      setRegisterForm({ username: "", password: "", favorite_team: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className={containerClass}>
        <Link
          href="/profile"
          className={`${buttonBase} ${ghostButton} ${fullWidth}`}
        >
          Profile
        </Link>
        <button
          type="button"
          onClick={logout}
          className={`${buttonBase} ${primaryButton} ${fullWidth}`}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setLoginOpen(true);
        }}
        className={`${buttonBase} ${ghostButton} ${fullWidth}`}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => {
          setError(null);
          setRegisterOpen(true);
        }}
        className={`${buttonBase} ${primaryButton} ${fullWidth}`}
      >
        Register
      </button>

      <Dialog open={loginOpen} onClose={setLoginOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="carbon-panel relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_55%)]" />
              <div className="relative space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-red-400">
                    Driver Login
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white">
                    Back To The Grid
                  </h2>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Username
                    </label>
                    <input
                      value={loginForm.username}
                      onChange={(event) =>
                        setLoginForm((prev) => ({
                          ...prev,
                          username: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                      placeholder="Your username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Password
                    </label>
                    <input
                      value={loginForm.password}
                      onChange={(event) =>
                        setLoginForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                      type="password"
                      className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                      placeholder="********"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-400 disabled:opacity-60"
                  >
                    {loading ? "Signing In" : "Start Session"}
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog open={registerOpen} onClose={setRegisterOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="carbon-panel relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 p-6 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),transparent_55%)]" />
              <div className="relative space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-red-400">
                    New Garage
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white">
                    Create Your Team Pass
                  </h2>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Username
                    </label>
                    <input
                      value={registerForm.username}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          username: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Password
                    </label>
                    <input
                      value={registerForm.password}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          password: event.target.value,
                        }))
                      }
                      type="password"
                      className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                      placeholder="At least 8 characters"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Favorite Team
                    </label>
                    <select
                      value={registerForm.favorite_team}
                      onChange={(event) =>
                        setRegisterForm((prev) => ({
                          ...prev,
                          favorite_team: event.target.value,
                        }))
                      }
                      className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                    >
                      <option value="">No preference</option>
                      {TEAM_OPTIONS.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-400 disabled:opacity-60"
                  >
                    {loading ? "Creating" : "Join The Grid"}
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
