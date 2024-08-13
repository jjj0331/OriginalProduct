"use client";
import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';
import { useRouter } from 'next/navigation';
import { postData } from '../services/fetch';

const Login = () => {
  const { setAccessToken } = useContext(TokenContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAuth = async (endpoint, successMessage, failCallback = null) => {
    try {
      const response = await postData(endpoint, { user: { username, password } });
      const { access_token } = response;
      setAccessToken(access_token);
      alert(successMessage);
      router.push('/');
    } catch (error) {
      if (error.response?.status === 401 && failCallback) {
        failCallback();
      } else {
        console.error('エラーが発生しました:', error.message);
      }
    }
  };

  const handleLogin = () => {
    handleAuth('/login', 'ログインしました', () => {
      alert('ユーザーが存在しません。新規登録を行います。');
      handleSignup();
    });
  };

  const handleSignup = () => {
    handleAuth('/register', '新規登録が完了しました');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">ログイン画面</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div className="mt-2">
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
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600">Sign in/新規登録</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
