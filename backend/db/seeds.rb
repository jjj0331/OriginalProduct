
user = User.create!(username: 'Test User', email: 'test@example.com', password: 'password')

guidelines = [
  {
    title: "Pythonを勉強する",
    description: "Pythonの基本から応用までを学ぶためのガイドラインです。",
    user_id: user.id, # ユーザーIDを関連付け
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "Pythonの基本的な構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "変数宣言", description: "変数の宣言方法を学ぶ。" },
          { title: "printで出力する", description: "print関数を使って出力する方法を学ぶ。" }
        ]
      },
      {
        title: "データ構造を勉強する",
        description: "リストや辞書などのデータ構造を学ぶ。",
        detail_tasks_attributes: [
          { title: "リストを勉強する", description: "リストの使い方を学ぶ。" },
          { title: "辞書を勉強する", description: "辞書の使い方を学ぶ。" }
        ]
      },
      {
        title: "制御フローを勉強する",
        description: "if文やループを学ぶ。",
        detail_tasks_attributes: [
          { title: "if文を学ぶ", description: "条件分岐の方法を学ぶ。" },
          { title: "forループを学ぶ", description: "forループの使い方を学ぶ。" }
        ]
      }
    ]
  },
  {
    title: "JavaScriptを学ぶ",
    description: "フロントエンド開発に必要なJavaScriptの基礎を学ぶガイドラインです。",
    user_id: user.id, # ユーザーIDを関連付け
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "JavaScriptの基本的な構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "変数と定数", description: "変数と定数の宣言方法を学ぶ。" },
          { title: "関数の作成", description: "関数の作成方法を学ぶ。" }
        ]
      },
      {
        title: "DOM操作を学ぶ",
        description: "HTMLとCSSの操作方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "要素の選択", description: "DOM要素の選択方法を学ぶ。" },
          { title: "イベントリスナー", description: "イベントリスナーの設定方法を学ぶ。" }
        ]
      },
      {
        title: "非同期処理を学ぶ",
        description: "JavaScriptの非同期処理の基本を学ぶ。",
        detail_tasks_attributes: [
          { title: "コールバック", description: "コールバック関数の使い方を学ぶ。" },
          { title: "Promise", description: "Promiseの使い方を学ぶ。" }
        ]
      }
    ]
  },
  {
    title: "Ruby on Railsを学ぶ",
    description: "ウェブアプリケーションフレームワークのRuby on Railsの基礎を学ぶガイドラインです。",
    user_id: user.id, # ユーザーIDを関連付け
    tasks_attributes: [
      {
        title: "Railsの基本",
        description: "Railsの基本的な使い方を学ぶ。",
        detail_tasks_attributes: [
          { title: "プロジェクトの作成", description: "Railsプロジェクトの作成方法を学ぶ。" },
          { title: "MVCアーキテクチャ", description: "MVCアーキテクチャの基本を学ぶ。" }
        ]
      },
      {
        title: "データベース操作",
        description: "Railsでのデータベース操作を学ぶ。",
        detail_tasks_attributes: [
          { title: "マイグレーション", description: "データベースマイグレーションの使い方を学ぶ。" },
          { title: "モデルの作成", description: "モデルの作成方法を学ぶ。" }
        ]
      },
      {
        title: "コントローラーとビュー",
        description: "Railsのコントローラーとビューの使い方を学ぶ。",
        detail_tasks_attributes: [
          { title: "ルーティング", description: "ルーティングの設定方法を学ぶ。" },
          { title: "ビューの作成", description: "ビューの作成方法を学ぶ。" }
        ]
      }
    ]
  },
  # その他のガイドラインデータも同様に設定する
]

guidelines.each do |guideline_attrs|
  Guideline.create!(guideline_attrs)
end

puts "Seeding completed!"
