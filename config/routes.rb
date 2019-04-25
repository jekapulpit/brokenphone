Rails.application.routes.draw do
  devise_for :users
  root to: 'home#show'

  namespace :api do
    namespace :v4 do
      resources :rooms, only: %i[show index create destroy]
      resources :messages
    end
  end

  mount ActionCable.server => '/cable'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
