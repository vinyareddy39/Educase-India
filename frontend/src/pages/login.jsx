import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/mobilecontainer";
import Input from "../components/input";
import Button from "../components/button";
import { AuthContext } from "../context/authcontext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  
  const { loginUser, loading, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    try {
      await loginUser({ email, password });
      navigate("/profile");
    } catch (err) {
      // Error is handled by context, but we catch to prevent unhandled promise rejection
    }
  };

  const displayError = localError || error;

  return (
    <MobileContainer>
      <div className="flex flex-col justify-between h-screen p-6">
        <div>
          {/* Back button */}
          <button 
            onClick={() => navigate("/")} 
            className="mb-8 flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>

          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">
            Signin to your PopX account
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            {displayError && (
              <div className="text-red-500 text-xs font-semibold bg-red-50 border border-red-200 rounded-md p-3">
                {displayError}
              </div>
            )}

            <Button
              text={loading ? "Signing in..." : "Login"}
              onClick={handleSubmit}
              className={`text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer ${
                loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
              }`}
              disabled={loading}
            />
          </form>
        </div>

        <div className="text-center pb-6">
          <p className="text-slate-500 text-xs">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-purple-600 font-bold hover:underline cursor-pointer"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Login;
