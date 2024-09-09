user = User.create!(username: 'Test User', email: 'test@example.com', password: 'password')

guidelines = [
  {
    title: "Javaを勉強する",
    description: "Javaの基本から応用までを学ぶためのガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "Javaの基本的な構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "変数宣言の方法は？", description: "Javaでは、型を指定して変数を宣言し、代入します。例えば、int number = 10; です。" },
          { title: "出力する方法は？", description: "System.out.println()を使ってコンソールに出力します。" }
        ]
      },
      {
        title: "オブジェクト指向を勉強する",
        description: "クラスやオブジェクトについて学ぶ。",
        detail_tasks_attributes: [
          { title: "クラスの作成方法は？", description: "クラスはclassキーワードを使って定義し、その中にフィールドとメソッドを記述します。" },
          { title: "オブジェクトの生成方法は？", description: "newキーワードを使ってクラスからオブジェクトを生成します。例: MyClass obj = new MyClass();" }
        ]
      }
    ]
  },
  {
    title: "C言語を勉強する",
    description: "C言語の基本から応用までを学ぶためのガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "C言語の基本的な構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "変数宣言の方法は？", description: "C言語では、型を指定して変数を宣言します。例: int a = 10;" },
          { title: "printfで出力する方法は？", description: "printf関数を使ってコンソールに出力します。例: printf(\"Hello, World!\");" }
        ]
      },
      {
        title: "ポインタを勉強する",
        description: "C言語の特徴であるポインタについて学ぶ。",
        detail_tasks_attributes: [
          { title: "ポインタとは何ですか？", description: "ポインタはメモリのアドレスを格納する変数です。int *ptr = &a; のように宣言します。" },
          { title: "ポインタを使って値を操作する方法は？", description: "ポインタを使って値を操作するには、*演算子を使用してポインタが指す値にアクセスします。" }
        ]
      }
    ]
  },
  {
    title: "SQLを勉強する",
    description: "SQLの基本から応用までを学ぶためのガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "SQLの基本的なクエリ構文を学ぶ。",
        detail_tasks_attributes: [
          { title: "SELECT文の使い方は？", description: "SELECT文は、データベースからデータを取得するために使用します。例: SELECT * FROM users;" },
          { title: "WHERE句の使い方は？", description: "WHERE句を使って条件を指定し、特定のデータを取得します。例: SELECT * FROM users WHERE age > 30;" }
        ]
      },
      {
        title: "JOINを勉強する",
        description: "複数のテーブルを結合してデータを取得する方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "INNER JOINの使い方は？", description: "INNER JOINは、両方のテーブルに共通するデータを取得します。例: SELECT * FROM users INNER JOIN orders ON users.id = orders.user_id;" },
          { title: "LEFT JOINの使い方は？", description: "LEFT JOINは、左側のテーブルのすべてのデータと一致する右側のデータを取得します。" }
        ]
      }
    ]
  },
  {
    title: "AWSを勉強する",
    description: "AWSの基本的なサービスの使い方を学ぶためのガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "EC2を勉強する",
        description: "EC2インスタンスの作成と管理を学ぶ。",
        detail_tasks_attributes: [
          { title: "EC2インスタンスの作成方法は？", description: "AWSコンソールからEC2インスタンスを作成します。OSやインスタンスタイプを選択し、起動します。" },
          { title: "SSHでEC2に接続する方法は？", description: "SSHを使用して、ローカルマシンからEC2インスタンスに接続します。例: ssh -i 'your-key.pem' ec2-user@ec2-xx-xx-xx-xx.compute-1.amazonaws.com" }
        ]
      },
      {
        title: "S3を勉強する",
        description: "S3バケットを作成し、ファイルをアップロードする方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "S3バケットの作成方法は？", description: "AWSコンソールからS3バケットを作成します。バケット名を指定し、リージョンを選択します。" },
          { title: "ファイルをS3にアップロードする方法は？", description: "AWSコンソールまたはCLIを使用して、ファイルをS3バケットにアップロードします。" }
        ]
      }
    ]
  },
  {
    title: "Reactを勉強する",
    description: "Reactの基本からコンポーネントの作成方法を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "Reactの基本的なコンポーネントの作成方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "コンポーネントを作成する方法は？", description: "関数またはクラスを使ってReactコンポーネントを作成します。例: function MyComponent() { return <div>Hello</div>; }" },
          { title: "propsを使う方法は？", description: "propsは、コンポーネント間でデータを渡すために使用されます。" }
        ]
      },
      {
        title: "状態管理を勉強する",
        description: "Reactの状態管理について学ぶ。",
        detail_tasks_attributes: [
          { title: "useStateの使い方は？", description: "useStateフックを使ってコンポーネントの状態を管理します。例: const [count, setCount] = useState(0);" },
          { title: "useEffectの使い方は？", description: "useEffectフックを使って副作用を処理します。例: useEffect(() => { console.log('Hello'); }, []);" }
        ]
      }
    ]
  },
  {
    title: "HTMLを勉強する",
    description: "HTMLの基本的なタグの使い方を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "HTMLの基本的な構造とタグを学ぶ。",
        detail_tasks_attributes: [
          { title: "HTML文書の基本構造は？", description: "HTML文書は、<!DOCTYPE html>、<html>、<head>、<body>タグで構成されます。" },
          { title: "aタグの使い方は？", description: "aタグはハイパーリンクを作成するために使用します。例: <a href='https://example.com'>リンク</a>" }
        ]
      }
    ]
  },
  {
    title: "CSSを勉強する",
    description: "CSSの基本的なスタイリング方法を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を勉強する",
        description: "CSSの基本的なプロパティの使い方を学ぶ。",
        detail_tasks_attributes: [
          { title: "色を変更する方法は？", description: "colorプロパティを使ってテキストの色を変更します。例: color: red;" },
          { title: "背景色を変更する方法は？", description: "background-colorプロパティを使って要素の背景色を変更します。例: background-color: blue;" }
        ]
      },
      {
        title: "レイアウトを勉強する",
        description: "CSSでレイアウトを作成する方法を学ぶ。",
        detail_tasks_attributes: [
          { title: "Flexboxを使う方法は？", description: "display: flex; を使って要素を横並びに配置することができます。" },
          { title: "Gridレイアウトを使う方法は？", description: "display: grid; を使って要素をグリッド状に配置することができます。" }
        ]
      }
    ]
  }
]

guidelines.each do |guideline_attrs|
  Guideline.create!(guideline_attrs)
end

puts "Seeding completed!"
