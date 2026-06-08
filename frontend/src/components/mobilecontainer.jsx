const MobileContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f7f8f9] flex justify-center items-center">
      <div className="w-[375px] min-h-screen bg-white shadow-md">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;