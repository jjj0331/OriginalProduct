# みんなのガイドライン
URL
テストユーザ：test 
パスワード：password

![image](https://github.com/user-attachments/assets/e2c2f8eb-3d55-4559-86bc-d76e5ec9bd20)


## ■ 1.概要
「みんなのガイドライン」はプログラミング学習をサポートするアプリです。  
このアプリには、プログラミングを中心としたさまざまな学習ガイドラインが用意されており、  
自分で新しいガイドラインを作成することも可能です。  
  
ユーザーはその中から学習したいガイドラインを選び、効率的に学習を進めることができます。  
各ガイドラインには、具体的なタスクやクエストが設定されており、それらを達成することで効果的にスキルを習得できます。  
特に、「何を学べばいいかわからない」「独学だと続かない」 といった悩みを解決することを目的としています。  
初心者向けの基礎学習から、特定の技術に特化した応用コースまで幅広く対応し、継続しやすい仕組みを提供します。  

## ■ 2.ペルソナ
***初心者プログラマー（田中 太郎）***
   - 年齢: 23歳
   - 職業: 新卒エンジニア
   - 家族構成：独身
   - 課題: 何から学習すればいいか分からず、途中で挫折しがち
   - 目的: プログラミングの基礎を体系的に学びたい

***キャリアチェンジを目指す社会人（鈴木 花子）***
   - 年齢: 30歳
   - 職業: 事務職（未経験からエンジニア転職を目指す）
   - 家族構成：既婚
   - 課題: 独学での学習が続かず、進捗が見えにくい
   - 目的: 転職活動に必要なスキルを効率よく習得したい
   - 

##  ■ 3.機能一覧 

|**トップページ**|**ガイドラインの検索**|
|----|----|
| ![image](https://github.com/user-attachments/assets/2b92319c-592a-4d7b-b4d3-c8d7a6c45484) |![image](https://github.com/user-attachments/assets/d3f5ef2c-4846-4ea8-b1be-57284160d14e)|
|みんなのガイドラインに存在するガイドラインがすべて表示されます。| 検索バーにキーワードを入力するとガイドラインを検索することも可能です。|

|**ログイン画面(新規ユーザー作成)**|**ガイドライン詳細**|
|----|----|
|![image](https://github.com/user-attachments/assets/f3849c4e-2a54-408a-a047-2fe57cc9e2ae)|![image](https://github.com/user-attachments/assets/e5596c17-c4a1-4837-8a7f-75d799dd7f4f)|
|ログインおよびユーザーの新規作成が可能です。|ガイドラインの詳細を確認することができます|

|**マイページ(お気に入り)**|**マイページ(新規作成)**|
|----|----|
|![image](https://github.com/user-attachments/assets/c08de139-0485-4686-90e8-11738991a856)|![image](https://github.com/user-attachments/assets/3d6143d0-4bea-4e5f-9b6e-a2b13950185a)|
|お気に入り登録したガイドラインを参照できる|ガイドラインを新規作成できる|

|**学習機能**|**マイページ(個人設定)**|
|----|----|
|![image](https://github.com/user-attachments/assets/29daa0e0-3356-4809-a834-d391cbafe771)|![image](https://github.com/user-attachments/assets/33159aba-afce-428c-a6b8-f06031eb4b1f)|
|自分が作成したガイドラインを編集できる|個人設定を登録でき、ChatGPTよりアドバイスを得ことができるる|

|**マイページ(お気に入り→学習する)**|**学習画面**|
|----|----|
|![image](https://github.com/user-attachments/assets/4772bd43-da6d-4cc6-a0a4-2af12ed73967)|![image](https://github.com/user-attachments/assets/5b787b3c-7aa4-49bc-a226-b69d117fce6f)|
|マイページ(お気に入り)に登録したガイドラインを学習することができる|学習フォームでフォームに回答を入力し送信するとChatGPTより回答を得ることができる|

## ■ 4.画面遷移図
![image](https://github.com/user-attachments/assets/f484a53b-ee73-46be-bf59-e07b928c4c4f)

## ■ 5.使用技術
***フレームワーク***
   - Next.js 14.2.4
   - Ruby on Rails 7.1.3.4

***言語***
   - JavaScript（TypeScript対応）
   - Ruby 3.3.3

***ライブラリ（ツール）***
   - React 18
   - Axios 1.7.9
   - Tailwind CSS 3.4.1
   - JSON Web Token (JWT)

***インフラ***
   - データベース: MySQL（Amazon RDS）
   - サーバー: EC2（Amazon Linux 2023）
 
## ■ 6.ER図
![image](https://github.com/user-attachments/assets/8f3a6373-f557-451e-8d07-7398261be52c)










