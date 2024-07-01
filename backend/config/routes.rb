Rails.application.routes.draw do
  #【ユーザ】
  post 'register', to: 'auth#register'
  get  'user/:id', to: 'auth#show'
  post 'login',    to: 'auth#login'
  get  'login',    to: 'auth#showloginuser'

  #【ガイドライン】
  post 'guidelines/new',     to: 'guidelines#create'
  get  'guidelines/all',     to: 'guidelines#showall'
  get  'guidelines/:id',     to: 'guidelines#show'
  post 'guidelines/:id/edit',to: 'guidelines#update'
  delete 'guidelines/:id',   to: 'guidelines#destroy'
end
