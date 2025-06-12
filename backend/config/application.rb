require_relative "boot"

require "action_controller/railtie"
require "action_mailer/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Backend
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 8.0

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:4200'
        resource '*', 
          headers: :any, 
          credentials: true,
          methods: [:get, :post, :put, :delete, :options, :head],
          expose: ['Set-Cookie', 'Cookie']    # Add Cookie to expose
      end
    end

# Try this session configuration
  config.session_store :cookie_store, 
    key: '_test_session',
    path: '/',                  
    same_site: :lax,           
    secure: false,             
    httponly: false,           
    expire_after: 5.days
  # Remove domain setting completely
    # config.middleware.use ActionDispatch::Cookies
    # config.middleware.use config.session_store, config.session_options
    


    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    # config.api_only = true
  end
end
