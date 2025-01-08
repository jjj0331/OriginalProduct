"use client";
import React, { useContext, useState } from "react";
import { TokenContext } from "../../context/TokenContext";
import { useRouter } from "next/navigation";
import { postData } from "../../services/fetch";


const LoginComponent = () => {
  const { setAccessToken } = useContext(TokenContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleAuth = async (endpoint, successMessage) => {
    try {
      const response = await postData(endpoint, { user: { username, password } });
      console.log(response);
      const { access_token } = response;
      setAccessToken(access_token);
      alert(successMessage);
      router.push("/");
    } catch (error) {
      if(error.response.status==401){
        alert(error.response.data.error);
      }else{
        alert("エラーが発生しました");
        console.error("エラーが発生しました:", error);
      }
    }
  };

  const handlogin = () => {
    handleAuth("/login", "ログインが完了しました");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 5) {
      alert("パスワードは最低5文字以上でなければなりません");
      return;
    }

    if (username === "") {
      alert("ユーザ名が空白です");
      return;
    }
    handlogin();
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-bold leading-6 text-gray-900 mb-1">ユーザー名</label>
              <div className="mt-1">
                <input
                  id="username"
                  value={username}
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-bold leading-6 text-gray-900 mb-1">パスワード</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600">ログイン</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default LoginComponent;
