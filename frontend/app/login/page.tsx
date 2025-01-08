"use client";
import React, { useContext, useState } from "react";
import LoginComponent from "../Components/Login/page";
import SignupComponent from "../Components/Signup/page"; 

const Login = () => {
   // 1: ログイン, 2: 新規作成
  const [tab_flg, setTabFlg] = useState(1);

  return (
    <div>
      <div className="z-0 flex min-h-full flex-col justify-center px-6 pt-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center space-x-4">
          <button
            onClick={() => setTabFlg(1)}
            className={`px-4 py-2 text-2xl font-bold leading-9 tracking-tight ${
              tab_flg === 1 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            } rounded-md transition duration-300`}
          >
            ログイン
          </button>
          <button
            onClick={() => setTabFlg(2)}
            className={`px-4 py-2 text-2xl font-bold leading-9 tracking-tight ${
              tab_flg === 2 ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
            } rounded-md transition duration-300`}
          >
            新規登録
          </button>
        </div>
      </div>
  
      {tab_flg === 1 ? (
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          <LoginComponent/>
        </div>
      ) : (
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          <SignupComponent/>
        </div>
      )}
    </div>
  );
  
  
};

export default Login;
