import React from 'react'

const Serch = () => {
  return (
      <div>
        <form id="form1" action="" className="flex justify-center h-14 mt-5">
          <input id="sbox1" name="s" type="text" placeholder="キーワードを入力" className="w-6/12 px-4 py-2 bg-white border-none outline-none rounded-l-md"/>
          <input id="sbtn1" type="submit" value="検索" className="w-16 bg-blue-700 text-white text-lg cursor-pointer rounded-r-md hover:bg-blue-300"/>
        </form>
      </div>
  )
}

export default Serch