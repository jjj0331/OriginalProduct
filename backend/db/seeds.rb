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
          { title: "変数宣言の方法は？", description: "変数を宣言するためには、変数名を設定し、代入する値を決定する必要があります。" },
          { title: "printで出力する方法は？", description: "print関数を使って出力するには、print()の中に表示したい内容を記述します。" }
        ]
      },
      {
        title: "データ構造を勉強する",
        description: "リストや辞書などのデータ構造を学ぶ。",
        detail_tasks_attributes: [
          { title: "リストを使う方法は？", description: "リストは、複数の値を格納できるデータ構造であり、リスト名を定義して値を[]で囲みます。" },
          { title: "辞書を使う方法は？", description: "辞書はキーと値のペアを格納するデータ構造であり、{キー: 値}の形式で使用します。" }
        ]
      },
      {
        title: "制御フローを勉強する",
        description: "if文やループを学ぶ。",
        detail_tasks_attributes: [
          { title: "if文の使い方は？", description: "if文を使うには、条件を設定し、その条件がTrueのときに実行する処理を記述します。" },
          { title: "forループの使い方は？", description: "forループは、指定した回数または条件に従って繰り返し処理を行います。" }
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
          { title: "変数と定数の違いは？", description: "変数は後で変更可能な値を保持し、定数は一度設定されたら変更できません。" },
          { title: "関数を作成する方法は？", description: "関数は、functionキーワードを使って定義し、その中に処理内容を記述します。" }
        ]
      },
      {
        title: "DOM操作を学ぶ",
        description: "HTMLとCSSの操作方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "要素を選択する方法は？", description: "DOM要素は、document.querySelector()やgetElementById()を使って選択します。" },
          { title: "イベントリスナーを設定する方法は？", description: "イベントリスナーは、addEventListener()メソッドを使って設定します。" }
        ]
      },
      {
        title: "非同期処理を学ぶ",
        description: "JavaScriptの非同期処理の基本を学ぶ。",
        detail_tasks_attributes: [
          { title: "コールバック関数の使い方は？", description: "コールバック関数は、別の関数の引数として渡され、特定のイベントが発生したときに呼び出されます。" },
          { title: "Promiseの使い方は？", description: "Promiseは、非同期処理の結果を表すオブジェクトであり、then()やcatch()を使って処理を続けます。" }
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
          { title: "Railsプロジェクトを作成する方法は？", description: "Railsプロジェクトは、rails newコマンドを使って作成します。" },
          { title: "MVCアーキテクチャの基本とは？", description: "MVCはModel-View-Controllerの略で、アプリケーションの構造を整理するためのデザインパターンです。" }
        ]
      },
      {
        title: "データベース操作",
        description: "Railsでのデータベース操作を学ぶ。",
        detail_tasks_attributes: [
          { title: "マイグレーションを使う方法は？", description: "マイグレーションは、データベースのスキーマを変更するためのファイルで、rails db:migrateで実行します。" },
          { title: "モデルを作成する方法は？", description: "モデルは、rails generate modelコマンドで作成し、データベーステーブルに対応します。" }
        ]
      },
      {
        title: "コントローラーとビュー",
        description: "Railsのコントローラーとビューの使い方を学ぶ。",
        detail_tasks_attributes: [
          { title: "ルーティングの設定方法は？", description: "ルーティングは、config/routes.rbファイルに記述し、リクエストとコントローラーアクションを対応付けます。" },
          { title: "ビューを作成する方法は？", description: "ビューは、app/viewsディレクトリにHTMLやERBテンプレートとして作成します。" }
        ]
      }
    ]
  }
]

guidelines.each do |guideline_attrs|
  Guideline.create!(guideline_attrs)
end

puts "Seeding completed!"
