Rails.application.routes.draw do
  #【ユーザ】
  post 'register', to: 'auth#register'
  get  'user/:id', to: 'auth#show'
  post 'login',    to: 'auth#login'

  #【ガイドライン】
  post 'guidelines/new',    to: 'guidelines#create'
end
