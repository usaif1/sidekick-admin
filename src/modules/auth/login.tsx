import React, { useState } from 'react';
import sidekick from "@/assets/sidekick-logo.png"
import { useNavigate } from 'react-router';

const SplitLoginCard = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    loginId: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', credentials);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Main Container */}
      <div className="bg-white rounded-lg shadow-xl w-[600px] h-[600px] relative overflow-hidden rounded-t-[20px]">
        {/* Upper Half (Empty) */}
        <div className=" bg-[#18F27A] flex items-center justify-center h-[200px] rounded-t-[20px]">
          {/* Optional: Add decorative elements here */}
          <img width={280} height={40} src={sidekick} alt="sidekick_logo" />
        </div>

        {/* Lower Half (Form) */}
        <div className="absolute bottom-0 w-full h-1/2 bg-white p-8 rounded-t-2xl ">
          <div className="flex flex-col justify-center h-full ">
           <div className=" text-center w-[552px] h-[85px] gap-3 mb-8
">
           <h2 className=" font-[Plus_Jakarta_Sans] font-bold text-[34px] leading-none tracking-[0">
              Welcome!
            </h2>

            <p className="font-[Plus_Jakarta_Sans] font-normal text-[24px] leading-none tracking-[0]">Please sign in to continue to the portal.</p>
           </div>
            
            <form onSubmit={handleSubmit} className="space-y-6  mb-22 ">
              <div className="gap-8">
                <label 
                  htmlFor="loginId" 
                  className=" w-[552px] h-[18px] gap-5 pr-5 pl-5 block text-gray-600 mb-2 text-sm"
                >
                  Email ID
                </label>
                <input
                  type="text"
                  id="loginId"
                  className="w-full px-4 py-3 border border-[#296AEB] rounded-lg focus:ring-[#296AEB] focus:border-[#296AEB]
"
                  placeholder="XXXX"
                  value={credentials.loginId}
                  onChange={(e) => setCredentials({...credentials, loginId: e.target.value})}
                />
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="w-[552px] h-[18px] gap-5 pr-5 pl-5 block text-gray-600 mb-2 text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border  rounded-lg border-[#296AEB]  focus:ring-[#296AEB] focus:border-[#296AEB]"
                  placeholder="XXXX"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>

              <button
                type="submit"
                className=" bg-[#18F27A] w-[220px] h-[60px] rounded-[30px] gap-3 mx-auto block py-4 px-5
"
                disabled={!credentials.loginId || !credentials.password}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitLoginCard;