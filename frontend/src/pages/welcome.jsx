import React from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/mobilecontainer";
import Button from "../components/button";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="flex flex-col justify-between h-screen p-6 pb-12">
        <div className="flex-1 flex flex-col justify-center">
          {/* Logo / CSS Illustration */}
          <div className="flex justify-center mb-10">
            <div className="relative w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-6 animate-pulse">
              <span className="text-white text-3xl font-black italic tracking-wider">PopX</span>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-sm"></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
            Welcome to PopX
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Create an account to manage your profile, customize your settings, and connect with other agencies.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            text="Create Account"
            onClick={() => navigate("/register")}
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          />
          <Button
            text="Already have an account? Login"
            onClick={() => navigate("/login")}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 font-semibold cursor-pointer"
          />
        </div>
      </div>
    </MobileContainer>
  );
};

export default Welcome;
