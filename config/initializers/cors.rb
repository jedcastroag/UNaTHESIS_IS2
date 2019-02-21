Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # Revisar requerimientos de seguridad y
  # actualizar antes de desplegar en producción
  allow do
    # Todos los orígenes
    origins '*'
    
    # Todos los recursos
    resource '*',
    headers: :any,
    methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end