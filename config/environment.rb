# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

config.default_url_options[:host] = ENV['default_url_host']
