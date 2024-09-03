"use client"; //CSRの場合は宣言が必要
import { createContext, useState } from 'react';//reactから「createContext」「useState」をインポート
import { fetchData } from '../services/fetch';//fetchDataをインポート(fetchDataは単調になりがちなaxiosの処理をまとめたオブジェクト) 
export const TokenContext = createContext();//createContextをオブジェクト化

export const TokenProvider = ({ children }) => {
  
  //accessTokenとそれを更新するためのsetAccessToken関数を作成
  const [accessToken, setAccessToken] = useState(null);

  //loginuser_id関数　この関数でどこの階層にいてもログインユーザーのidを取得
  const loginuser_id= async()=>{
    try{
      const response = await fetchData('/login', {
        headers: { Authorization: `${accessToken}` }
      });
      const user_id = response.data.user_id;
      return user_id;
    }catch(error){
      console.error('データ取得の際にエラーが発生しました', error);
      return null;
    }
  };
  return (
    // TokenContextオブジェクトのProviderでvalueの内容をプロップスのドリリングせず、渡せる
    <TokenContext.Provider value={{ accessToken, setAccessToken,loginuser_id}}>
      {children}
    </TokenContext.Provider>
  );
};