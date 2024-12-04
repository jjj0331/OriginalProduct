
const Welcome = ({onClose}) => {

  return (
    <>
      <div className="w-3/4 max-h-[80vh] m-auto mt-12 bg-white relative overflow-y-auto shadow-lg rounded-lg border border-gray-300">
        {/* 閉じるボタン */}
        <button
          className="bg-gray-300 font-bold text-2xl rounded-full w-8 h-8 border-4 border-black flex items-center justify-center absolute top-2 right-2"
          onClick={onClose}
        >
          ×
        </button>

        {/* ヘッダー */}
        <main>
          <header className="p-4 border-b-2 border-black">
            <h1 className="text-center font-bold text-2xl">初めての方へ</h1>
          </header>
        </main>

        {/* リスト */}
        <ul className="text-left p-4 space-y-2">
          <li>ユーザー登録</li>
          <li>対象のガイドラインを探す</li>
          <li>お気に入り登録</li>
          <li>学習する</li>
          <li>目標を決める</li>
          <li>その他のガイドライン...</li>
          <li>さらにスクロール...</li>
          <li>学習する</li>
          <li>目標を決める</li>
          <li>その他のガイドライン...</li>
          <li>さらにスクロール...</li>
          <li>学習する</li>
          <li>目標を決める</li>
          <li>その他のガイドライン...</li>
          <li>さらにスクロール...</li>
          <li>学習する</li>
          <li>目標を決める</li>
          <li>その他のガイドライン...</li>
          <li>さらにスクロール...</li>
          <li>学習する</li>
          <li>目標を決める</li>
          <li>その他のガイドライン...</li>
          <li>さらにスクロール...</li>
          <li>学習する</li>
          <li>目標を決める</li>
          <li>その他のガイドライン...</li>
          <li>さらにスクロール...</li>
        </ul>
      </div>
    </>

      
  );
}

export default Welcome;
