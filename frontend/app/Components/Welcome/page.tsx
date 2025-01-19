const Welcome = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="w-2/4 max-h-[100vh] m-auto mt-6 bg-white relative overflow-x-hidden overflow-y-auto shadow-lg rounded-lg border border-gray-600 p-4">

        {/* 閉じるボタン */}
        <a href="/">
          <button
            className="bg-gray-300 font-bold text-2xl rounded-full w-8 h-8 border-4 border-black flex items-center justify-center absolute top-0 right-0 z-8"
          >
            ×
          </button>
        </a>

        {/* ヘッダー */}
        <main>
          <header className="h-3/4 p-4 border-b-2 border-black">
            <h1 className="text-center font-bold text-2xl">初めての方へ</h1>
            <p className="text-center">このサイトは自分に合ったガイドラインを探し、学習できるサイトです。</p>
          </header>
        </main>

        {/* リスト */}
        <ul className="text-left p-4">
          <li className="flex justify-center">
            <div className="w-full max-w-lg h-[300px]"> {/* ここでサイズ調整 */}
              <iframe
                src="https://www.youtube.com/embed/OGJ80-ybISg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Welcome;
