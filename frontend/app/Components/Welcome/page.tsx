
const Welcome = () => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-3/4 max-h-[100vh] m-auto mt-6 bg-white relative overflow-x-hidden overflow-y-auto shadow-lg rounded-lg border border-gray-300 p-4">

        {/* 閉じるボタン */}
        <a href="/">
          <button
            className="bg-gray-300 font-bold text-2xl rounded-full w-8 h-8 border-4 border-black flex items-center justify-center absolute top-0 right-0 z-8"
          >×</button>
        </a>

        {/* ヘッダー */}
        <main>
          <header className="h-3/4 p-4 border-b-2 border-black">
            <h1 className="text-center font-bold text-2xl">初めての方へ</h1>
            <p className="text-center">このサイトは自分に合ったガイドラインを探し、学習できるサイトです。</p>
          </header>
        </main>

        {/* リスト */}
        <ul className="text-left p-4 space-y-2 ">
        <li>
          <p>対象のガイドラインを探す</p>

          <iframe
            src="https://www.youtube.com/embed/ZjpHvDz4gis?loop=1&playlist=ZjpHvDz4gis"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "40%",
              height: "100%"
            }}
          ></iframe>
        </li>

        <li>
          <p>対象のガイドラインを探す</p>

          <iframe
            src="https://www.youtube.com/embed/ZjpHvDz4gis?loop=1&playlist=ZjpHvDz4gis"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              width: "40%",
              height: "100%"
            }}
          ></iframe>
        </li>



     
        </ul>
      </div>
    </div>

      
  );
}

export default Welcome;
