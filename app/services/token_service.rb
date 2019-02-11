class TokenService
	def initialize
		@rsa_private = OpenSSL::PKey::RSA.generate 1024
		@rsa_public = @rsa_private.public_key
	end

	def validate(token, user_id)
		decoded = (JWT.decode token, @rsa_public, true, { algorithm: 'RS512' })[0]

		if getCurrentTime > decoded['exp']
			raise JWT::ExpiredSignature
		elsif decoded['aud'] != 'unathesis'
			raise JWT::InvalidAudError
		elsif decoded['iss'] != user_id
			raise JWT::InvalidIssuerError
		end

		return decoded
	end

		# https://en.wikipedia.org/wiki/JSON_Web_Token#Standard_fields
	def encode(payload, user_id, expiration=6*60*60*1000)
		payload[:iss] = user_id
		payload[:aud] = 'unathesis'
		payload[:exp] = getCurrentTime() + expiration; # 6 hours
		JWT.encode payload, @rsa_private, 'RS512'
	end

	def getCurrentTime()
		(Time.now.to_f * 1000).to_i
	end
end