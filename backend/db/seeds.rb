user = User.find_or_create_by(email: 'test@example.com') do |u|
  u.username = 'test'
  u.password = 'password'
end

guidelines = [
  {
    title: "Pythonを勉強する",
    description: "Pythonの基本を学ぶためのガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "Pythonの基本的な構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "変数宣言の方法は？", description: "変数を宣言するためには、変数名を設定し、代入する値を決定する必要があります。例えばa=1,b=\"test\"などで変数を宣言することが可能です。" },
          { title: "printで出力する方法は？", description: "print関数を使用して、作成いたします。例えばprint(123),print(\"test\")など" }
        ]
      }
    ]
  },
  {
    title: "JavaScriptを学ぶ",
    description: "フロントエンド開発に必要なJavaScriptの基礎を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "JavaScriptの基本的な構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "変数と定数の違いは？", description: "変数は後で変更可能な値を保持し、定数は一度設定されたら変更できません。" },
          { title: "関数を作成する方法は？", description: "関数は、functionキーワードを使って定義し、その中に処理内容を記述します。" }
        ]
      }
    ]
  },
  {
    title: "Reactを学ぶ",
    description: "Reactの基本的な使い方とコンポーネントの作成方法を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "Reactの基本的な概念とコンポーネント作成を学ぶ。",
        detail_tasks_attributes: [
          { title: "Reactコンポーネントを作成する方法は？", description: "Reactでは関数コンポーネントまたはクラスコンポーネントを使用します。例: `function MyComponent() { return <h1>Hello, World!</h1>; }`" },
          { title: "ステートを使用する方法は？", description: "`useState`フックを使ってステートを管理します。例: `const [count, setCount] = useState(0);`" }
        ]
      }
    ]
  },
  {
    title: "SQLを学ぶ",
    description: "SQLを使用したデータベース操作の基礎を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "SQLを使ったデータ操作の基本を学ぶ。",
        detail_tasks_attributes: [
          { title: "テーブルを作成するSQL文は？", description: "SQLでテーブルを作成するには`CREATE TABLE`文を使用します。例: `CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(50), email VARCHAR(50));`" },
          { title: "データを挿入するSQL文は？", description: "SQLでデータを挿入するには`INSERT INTO`文を使用します。例: `INSERT INTO users (name, email) VALUES ('John Doe', 'john@example.com');`" }
        ]
      }
    ]
  },
  {
    title: "AWSを学ぶ",
    description: "AWSの主要なサービスとその使い方を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "AWSで主要なサービスを使用する方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "EC2インスタンスを作成する方法は？", description: "AWS管理コンソールからEC2サービスを選択し、インスタンスを作成します。例: インスタンスタイプは`t2.micro`を選択し、Amazon Linux AMIを使用します。" },
          { title: "S3バケットを作成する方法は？", description: "S3サービスを開き、`Create Bucket`ボタンをクリックしてバケットを作成します。例: バケット名は`my-s3-bucket`とします。" }
        ]
      }
    ]
  }
]

guidelines.each do |guideline_attrs|
  begin
    Guideline.create!(guideline_attrs)
  rescue ActiveRecord::RecordInvalid => e
    puts "Error creating guideline: #{e.message}"
  end
end

puts "Seeding completed!"
