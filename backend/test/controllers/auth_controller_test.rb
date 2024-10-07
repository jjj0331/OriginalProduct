require "test_helper"

class AuthControllerTest < ActionDispatch::IntegrationTest
  test "should not create user with empty username and password" do
    # 空のユーザ名とパスワードを送信
    post register_url, params: { user: { username: "", password: "", email: "" } }

    # 422 Unprocessable Entity を期待する
    assert_response :unprocessable_entity

    # JSONレスポンスにエラーメッセージが含まれているか確認
    json_response = JSON.parse(response.body)
    assert_includes json_response["errors"], "Username can't be blank"
    assert_includes json_response["errors"], "Password can't be blank"
    assert_includes json_response["errors"], "Password is too short (minimum is 6 characters)"
    assert_includes json_response["errors"], "Email is invalid"

    # テストが成功した場合に表示
    puts "テストが成功しました！"
  end
end
