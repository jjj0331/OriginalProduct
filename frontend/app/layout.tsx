import "./globals.css"; //globals.cssをインポート
import Header from "./Header"; //frontend\app\Header.tsxをインポート
import { TokenProvider } from './context/TokenContext'; //TokenContextをインポート

//metadataでは、ブラウザの上に表示される名前と概要を指定
export const metadata = {
  title: "みんなのガイドライン",
  description: "このアプリはユーザー間で学習ガイドラインを共有するアプリです",
};

//ユーザー画面の大枠
export default function RootLayout(
  {children,}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-main_color font-noto-sans-cjk h-full">
      <body className="relative mx-auto mt-1 h-full flex flex-col">
        {/* TokenContextの役割は[]に記載 */}
        <TokenProvider>
          {/* ヘッダー部分はすべての画面遷移で表示のためここに記載 */}
          <Header />

          {/* 子要素と背景画像のコンテナ */}
          <div className="relative flex-grow">
            {/* 背景画像を表示するdivを配置、topを指定してヘッダーの下に表示 */}
            <div className="absolute left-0 right-0 flex justify-center items-center z-0 opacity-20" style={{ top: '0px' }}>
              <img 
                src="/studyman.png" 
                alt="Background" 
                className="w-auto object-cover"
              />
            </div>

            {/* 子要素を表示 */}
            <div className="relative z-10 h-full">
              {children}
            </div>
          </div>

        </TokenProvider>  
      </body>
    </html>
  );
}
