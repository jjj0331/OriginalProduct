"use client";
import { createContext, useState } from 'react';
import axios from 'axios';
export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  
  const loginuser_id= async()=>{
    try{
      const response =await axios.get('http://127.0.0.1:3001/login',
        {headers: {'Authorization': `${accessToken}`}}
      );
      const user_id = response.data.user_id;
      return user_id;
    }catch(error){
      console.error('データ取得の際にエラーが発生しました', error);
      return null;
    }
  };

  return (
    <TokenContext.Provider value={{ accessToken, setAccessToken,loginuser_id}}>
      {children}
    </TokenContext.Provider>
  );
};
