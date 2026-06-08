import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileContainer from "../components/mobilecontainer";
import { AuthContext } from "../context/authcontext";

const Profile = () => {
  const { user, isAuthenticated, loading, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (loading) {
    return (
      <MobileContainer>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 text-sm mt-4 font-semibold">Loading profile...</p>
        </div>
      </MobileContainer>
    );
  }

  if (!user) {
    return null;
  }

  // Get initials for avatar placeholder
  const getInitials = (name) => {
    if (!name) return "PX";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <MobileContainer>
      <div className="flex flex-col justify-between h-screen bg-[#f8f9fa]">
        
        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Header */}
          <div className="bg-white px-6 pt-6 pb-4 border-b border-slate-100 shadow-sm">
            <h1 className="text-lg font-bold text-slate-800">Account Settings</h1>
          </div>

          {/* User Details Card */}
          <div className="bg-white p-6 flex items-center gap-4 border-b border-slate-100 shadow-sm">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-md">
                {getInitials(user.fullName)}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-purple-600 rounded-full border-2 border-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-purple-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-3 h-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold text-slate-800 truncate">{user.fullName}</h2>
              <p className="text-sm text-slate-400 truncate mb-1">{user.email}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                user.isAgency 
                  ? "bg-purple-100 text-purple-700" 
                  : "bg-indigo-100 text-indigo-700"
              }`}>
                {user.isAgency ? "Agency Account" : "Personal Account"}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Contact Information
              </h3>
              
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 space-y-4">
                <div>
                  <span className="block text-xs text-slate-400 font-semibold mb-0.5">Phone Number</span>
                  <span className="text-sm font-semibold text-slate-800">{user.phoneNumber}</span>
                </div>
                
                {user.companyName && (
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold mb-0.5">Company Name</span>
                    <span className="text-sm font-semibold text-slate-800">{user.companyName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional info cards to pop user experience */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Account Security & Info
              </h3>
              
              <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Status</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Active
                  </span>
                </div>
                <div className="h-px bg-slate-100"></div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Verified Account</span>
                  <span className="text-slate-800 font-semibold">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Logout Button */}
        <div className="p-6 bg-white border-t border-slate-100 shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full h-12 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-colors border border-red-200 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
            Logout
          </button>
        </div>

      </div>
    </MobileContainer>
  );
};

export default Profile;
