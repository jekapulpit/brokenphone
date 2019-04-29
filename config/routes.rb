Rails.application.routes.draw do
  devise_for :users
  root to: 'home#show'

  namespace :api do
    namespace :v4 do
      resources :rooms, only: %i[show index create destroy]
      resources :messages
      resources :invites, only: %i[show accept]
      post '/invites/:id', to: 'invites#accept'
      get '/users/search', to: 'search#find_users'
    end
  end

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
