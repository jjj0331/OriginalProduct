user = User.find_or_create_by(email: 'test@example.com') do |u|
  u.username = 'test1'
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
    title: "CSSを学ぶ",
    description: "CSSを使ったスタイリングの基本を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "CSSの基本的な書き方と使い方を学ぶ。",
        detail_tasks_attributes: [
          { title: "CSSをHTMLに適用する方法は？", description: "CSSは、HTMLファイル内で`<style>`タグや外部ファイルをリンクして適用します。例: `<link rel='stylesheet' href='styles.css'>`" },
          { title: "文字の色や背景色を変更する方法は？", description: "`color`プロパティや`background-color`プロパティを使用します。例: `color: red; background-color: yellow;`" }
        ]
      },
      {
        title: "レイアウトを学ぶ",
        description: "CSSでのレイアウト作成を学ぶ。",
        detail_tasks_attributes: [
          { title: "Flexboxの使い方は？", description: "`display: flex`を使用して柔軟なレイアウトを作成します。例: `display: flex; justify-content: center;`" },
          { title: "グリッドレイアウトの基本は？", description: "`display: grid`を使用して行と列を定義します。例: `grid-template-columns: 1fr 1fr;`" }
        ]
      }
    ]
  },
  {
    title: "コンピュータ雑学",
    description: "コンピュータに関する面白い雑学や知識を学ぶガイドラインです。",
    user_id: user.id,
    tasks_attributes: [
      {
        title: "基本を学ぶ",
        description: "コンピュータに関する基本的な雑学を学ぶ。",
        detail_tasks_attributes: [
          { title: "最初のプログラミング言語は何？", description: "最初のプログラミング言語は`Fortran`で、1950年代に科学計算のために設計されました。" },
          { title: "コンピュータウイルスの起源は？", description: "最初のコンピュータウイルスは1986年に作られた`Brain`で、フロッピーディスクをターゲットにしていました。" }
        ]
      },
      {
        title: "応用を学ぶ",
        description: "さらに深いコンピュータ雑学を学ぶ。",
        detail_tasks_attributes: [
          { title: "スパゲッティコードとは？", description: "スパゲッティコードは、構造が複雑で理解しにくいコードのことを指します。" },
          { title: "世界初のコンピュータは何？", description: "世界初のコンピュータは`ENIAC`で、第二次世界大戦中に開発されました。" }
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
