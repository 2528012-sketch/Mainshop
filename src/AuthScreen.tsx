import React, { useState } from "react";

interface AuthScreenProps {
  onLoginSuccess: (username: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Please enter a username.");
      return;
    }

    const cleanUsername = username.trim();

    // Save user locally
    localStorage.setItem("auth_user", cleanUsername);

    // Tell App that login was successful
    onLoginSuccess(cleanUsername);
  };

  return (
    <div className="min-h-screen bg-cyan-300 p-6 flex items-center justify-center font-sans">

      <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full">

        <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Authentication
        </div>

        <h1 className="text-4xl font-black uppercase mt-6 mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-mono text-sm font-bold mb-2">
              USERNAME
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter username"
              className="w-full border-2 border-black p-3 font-mono outline-none focus:bg-yellow-100"
            />
          </div>

          {error && (
            <p className="text-red-600 font-mono text-sm font-bold">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-400 hover:bg-green-500 text-black font-black uppercase py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
};