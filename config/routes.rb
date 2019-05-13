Rails.application.routes.draw do
  devise_for :users
  root to: 'home#show'

  namespace :api do
    namespace :v4 do
      resources :rooms, only: %i[show index create destroy]
      resources :messages
      resources :invites, only: %i[show accept]
      post '/invites/accept/:id', to: 'invites#accept'
      post '/rooms/unreaded/:id', to: 'rooms#read_all'
      post '/invites/reject/:id', to: 'invites#reject'
      post '/invite/create', to: 'invites#create'
      get '/users/search', to: 'search#find_users'
    end
  end

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
