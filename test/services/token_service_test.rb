require 'test_helper'

class TokenServiceTest < ActiveSupport::TestCase
	def setup
		@jwt = TokenService.instance
		@payload = { user_id: "Test", user_type_id: 2 }
	end

	test 'should encode and decode a payload succesfully' do		
		encoded = @jwt.encode @payload
		decoded = @jwt.validate(encoded).inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}

		assert decoded == @payload
	end

	test 'should reject an invalid token (signature)' do
		rsa_private = OpenSSL::PKey::RSA.generate 1024
		encoded = JWT.encode @payload, rsa_private, 'RS512'

		assert_raise JWT::VerificationError do
			decoded = @jwt.validate encoded
		end
	end

	test 'should reject an invalid token (expired)' do
		encoded = @jwt.encode @payload, 1

		sleep 1.0/6.0

		assert_raise JWT::ExpiredSignature do
			decoded = @jwt.validate encoded
		end
	end

	test 'should reject an invalid token (other issuer)' do
		encoded = @jwt.encode @payload, 6.days.from_now.to_i, 'fake_user'

		assert_raise JWT::InvalidIssuerError do
			@jwt.validate encoded
		end
	end
end