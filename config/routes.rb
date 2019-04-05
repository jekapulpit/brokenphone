Rails.application.routes.draw do
  devise_for :users
  root to: 'home#show'

  namespace :api do
    namespace :v4 do
      resources :messages, only: %i[index create]
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
