'use client';
import React, { useEffect, useState } from 'react';
import { fetchData } from './services/fetch';
import Card from "./Components/Cards/page";
import Serch from "./Components/Serch/page";

export default function Home() {
  const [inputdata, setInputdate] = useState("");
  const [datas, setDatas] = useState([]);
  const [error, setError] = useState(null);

  const getInputValue = (data) => {
    setInputdate(data);
  };

  const handleApiRequest = async (endpoint, params = {}) => {
    try {
      const data = await fetchData(endpoint, params);
      setDatas(data);
    } catch (error) {
      setError("データの取得に失敗しました。");
    }
  };

  useEffect(() => {
    handleApiRequest('/guidelines/all');
  }, []);

  useEffect(() => {
    if (inputdata) {
      handleApiRequest('/guidelines/search', { query: inputdata });
    } else {
      handleApiRequest('/guidelines/all');
    }
  }, [inputdata]);

  return (
    <main>
      {error && <p className="text-red-500">{error}</p>}
      <Serch getInputValue={getInputValue} />
      <div className="mt-4 mx-4 grid grid-cols-6 gap-4">
        {datas.map((data, index) => (
          <Card key={index} data={data} flg={1} />
        ))}
      </div>
    </main>
  );
}

