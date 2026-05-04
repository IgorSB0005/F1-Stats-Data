"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useAuth } from "@/lib/auth/auth-context";
import { TEAM_OPTIONS } from "@/lib/constants/teams";
import SignInBtn from "@/components/signBtn";

export default function ProfilePage() {
  const { user, loading, updateProfile, deleteAccount } = useAuth();
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    setFavoriteTeam(user?.favorite_team || "");
  }, [user]);

  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    setStatus(null);

    if (!user) {
      setStatus({ type: "error", message: "Please sign in first." });
      return;
    }

    const payload: { favorite_team?: string | null; password?: string } = {};

    if (favoriteTeam !== (user.favorite_team || "")) {
      payload.favorite_team = favoriteTeam || null;
    }

    if (password.trim()) {
      payload.password = password.trim();
    }

    if (!payload.favorite_team && !payload.password) {
      setStatus({ type: "error", message: "No changes to update." });
      return;
    }

    setSaving(true);

    try {
      await updateProfile(payload);
      setPassword("");
      setStatus({ type: "success", message: "Profile updated." });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Update failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);

    try {
      await deleteAccount();
      setDeleteOpen(false);
      window.location.href = "/home";
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Delete failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/anotherPic/dashBackground.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.12),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.45em] text-red-500">
            Personal Cabinet
          </p>
          <h1 className="mt-4 text-4xl font-black text-white sm:text-6xl">
            Driver Profile
          </h1>
          <div className="mx-auto mt-6 h-[2px] w-40 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        </div>

        {loading && (
          <div className="carbon-panel rounded-[2.5rem] border border-white/10 p-10 text-center text-gray-300">
            Loading profile...
          </div>
        )}

        {!loading && !user && (
          <div className="carbon-panel rounded-[2.5rem] border border-white/10 p-10 text-center">
            <p className="text-lg text-gray-300">
              Sign in to access your personalized garage.
            </p>
            <div className="mt-6 flex justify-center">
              <SignInBtn />
            </div>
          </div>
        )}

        {!loading && user && (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="carbon-panel rounded-[2.5rem] border border-white/10 p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.4em] text-red-500">
                Profile Overview
              </p>
              <h2 className="mt-4 text-3xl font-black text-white">{user.username}</h2>
              <p className="mt-3 text-sm text-gray-400">
                Favorite Team: {user.favorite_team || "No preference yet"}
              </p>

              <div className="mt-10 rounded-3xl border border-white/10 bg-black/50 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                  Update Preferences
                </p>
                <form onSubmit={handleUpdate} className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      Favorite Team
                    </label>
                    <select
                      value={favoriteTeam}
                      onChange={(event) => setFavoriteTeam(event.target.value)}
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

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-[0.3em] text-gray-400">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Leave blank to keep current"
                      className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500"
                    />
                  </div>

                  {status && (
                    <p
                      className={`text-sm ${
                        status.type === "success" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {status.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-400 disabled:opacity-60"
                  >
                    {saving ? "Saving" : "Update Profile"}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              <div className="carbon-panel rounded-[2.5rem] border border-white/10 p-8">
                <p className="text-xs uppercase tracking-[0.4em] text-red-500">
                  Security
                </p>
                <h3 className="mt-4 text-2xl font-black text-white">
                  Manage Account
                </h3>
                <p className="mt-4 text-sm text-gray-400">
                  Delete your account permanently. This action cannot be undone.
                </p>

                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  className="mt-6 w-full rounded-2xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-red-200 transition hover:bg-red-500 hover:text-white"
                >
                  Delete Account
                </button>
              </div>

              <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.4em] text-red-500">
                  Pro Tip
                </p>
                <p className="mt-4 text-sm text-gray-300">
                  Pick your favorite team to prioritize matching F1 headlines on the
                  dashboard news feed.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog open={deleteOpen} onClose={setDeleteOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="carbon-panel w-full max-w-md rounded-3xl border border-white/10 p-6 text-center shadow-2xl">
              <h3 className="text-2xl font-black text-white">Confirm Delete</h3>
              <p className="mt-4 text-sm text-gray-300">
                This will permanently remove your account and preferences.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-red-500/60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving}
                  className="rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-400 disabled:opacity-60"
                >
                  {saving ? "Deleting" : "Confirm Delete"}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
