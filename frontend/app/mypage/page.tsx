"use client";
import React, { useContext, useState } from 'react';
import { TokenContext } from '../context/TokenContext';

const Mypage = () => {
  const { loginuser_id } = useContext(TokenContext);
  console.log(loginuser_id());
  return (
    <div>
        test
    </div>
  );
}

export default Mypage;
