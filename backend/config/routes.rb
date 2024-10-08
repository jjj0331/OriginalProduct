Rails.application.routes.draw do
  #【ユーザ】
  post 'register', to: 'auth#create'
  post 'login',    to: 'auth#login'
  get  'user/:id', to: 'auth#show'
  get  'login',    to: 'auth#showloginuser'

  #【ガイドライン】
  get  'guidelines/search',       to: 'guidelines#search'
  post 'guidelines/new',         to: 'guidelines#create'
  get  'guidelines/all',         to: 'guidelines#showall'
  get  'guidelines/:id',         to: 'guidelines#show'
  post 'guidelines/:id/edit',    to: 'guidelines#update'
  delete 'guidelines/:id',       to: 'guidelines#destroy'
  get 'current_user/guidelines', to: 'guidelines#myguidelines'
  

  #【ユーザの状況】
  post 'userguidelines/:id',             to: 'user_statuses#create_user_status'
  post 'completetask/:id',               to: 'user_statuses#update_user_status'
  get 'current_user/favoriteguidelines', to: 'user_statuses#show_user_status'
  get 'current_user/ok/guidelines',      to: 'user_statuses#show_user_ok_guidelines'
  get 'userguidelines/:id',              to: 'user_statuses#show_user_one_status'

  #【個人設定】
  post 'personalsettings',             to: 'user_statuses#update_personal_settings'
  get  'personalsettings',             to: 'user_statuses#get_personal_settings'

end
