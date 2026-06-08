import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/mobilecontainer";
import Input from "../components/input";
import Button from "../components/button";
import { AuthContext } from "../context/authcontext";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isAgency, setIsAgency] = useState(false);
  const [localError, setLocalError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { registerUser, loginUser, loading, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();

    // Validations
    if (!fullName || !phoneNumber || !email || !password) {
      setLocalError("Please fill in all required fields.");
      return;
    }

    try {
      // 1. Register user
      await registerUser({
        fullName,
        phoneNumber,
        email,
        password,
        companyName,
        isAgency,
      });

      setSuccessMsg("Account created successfully! Logging you in...");

      // 2. Auto-login on success
      setTimeout(async () => {
        try {
          await loginUser({ email, password });
          navigate("/profile");
        } catch (loginErr) {
          navigate("/login");
        }
      }, 1500);

    } catch (err) {
      // Error handled by AuthContext
    }
  };

  const displayError = localError || error;

  return (
    <MobileContainer>
      <div className="flex flex-col justify-between h-screen p-6">
        <div className="overflow-y-auto pr-1 flex-1 pb-4" style={{ scrollbarWidth: "thin" }}>
          {/* Back button */}
          <button 
            onClick={() => navigate("/")} 
            className="mb-6 flex items-center text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>

          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight mb-2">
            Create your PopX account
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            Fill in the details below to register.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
            />

            <Input
              label="Phone Number *"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
            />

            <Input
              label="Email Address *"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />

            <Input
              label="Password *"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            <Input
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />

            {/* Is Agency selection */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-600 mb-2">
                Are you an agency? *
              </label>
              
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isAgency"
                    checked={isAgency === true}
                    onChange={() => setIsAgency(true)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 accent-purple-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Yes</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isAgency"
                    checked={isAgency === false}
                    onChange={() => setIsAgency(false)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 accent-purple-600"
                  />
                  <span className="text-sm font-medium text-slate-700">No</span>
                </label>
              </div>
            </div>

            {displayError && (
              <div className="text-red-500 text-xs font-semibold bg-red-50 border border-red-200 rounded-md p-3">
                {displayError}
              </div>
            )}

            {successMsg && (
              <div className="text-emerald-600 text-xs font-semibold bg-emerald-50 border border-emerald-200 rounded-md p-3">
                {successMsg}
              </div>
            )}

            <Button
              text={loading ? "Creating..." : "Create Account"}
              onClick={handleSubmit}
              className={`text-white shadow-md hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer ${
                loading ? "bg-purple-400" : "bg-purple-600 hover:bg-purple-700"
              }`}
              disabled={loading}
            />
          </form>
        </div>

        <div className="text-center pt-2 pb-2">
          <p className="text-slate-500 text-xs">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-purple-600 font-bold hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </MobileContainer>
  );
};

export default Register;
