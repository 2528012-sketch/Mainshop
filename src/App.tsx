import React, { useEffect, useState } from "react";
import { AuthScreen } from "./AuthScreen";

// ==========================================
// ProfileCard Component
// ==========================================

interface ProfileCardProps {
  onLogout: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ onLogout }) => {
  const username = localStorage.getItem("auth_user") || "Anonymous User";

  return (
    <div className="min-h-screen bg-cyan-300 p-6 flex flex-col items-center justify-center font-sans">
      <div className="bg-white border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full space-y-6">

        <div className="inline-block bg-pink-400 border-2 border-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Active Session
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black uppercase tracking-tight break-words">
            {username}
          </h2>

          <p className="font-mono text-xs text-gray-600 border-l-4 border-black pl-2">
            Status: Authenticated (Local)
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-xs font-bold">

          <div className="bg-yellow-200 border-2 border-black p-3">
            <span>ROLE</span>
            <p className="text-lg font-black">ADMIN</p>
          </div>

          <div className="bg-purple-200 border-2 border-black p-3">
            <span>STORAGE</span>
            <p className="text-lg font-black">LOCAL</p>
          </div>

        </div>

        <button
          onClick={onLogout}
          className="w-full bg-red-400 hover:bg-red-500 text-black font-black uppercase py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
        >
          Log Out
        </button>

      </div>
    </div>
  );
};

// ==========================================
// App Component
// ==========================================

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

  // Check whether a user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Called after successful login/signup
  const handleLoginSuccess = (username: string) => {
    localStorage.setItem("auth_user", username);
    setUser(username);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <main>
      {user ? (
        <ProfileCard onLogout={handleLogout} />
      ) : (
        <AuthScreen onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  );
};

export default App;