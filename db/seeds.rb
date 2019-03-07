# Create user types
UserType.create(name: "Administrator")
UserType.create(name: "Student")
UserType.create(name: "Jury/Tutor")

# Create user rols
ThesisProjectRole.create(name: "Author")
ThesisProjectRole.create(name: "Tutor")
ThesisProjectRole.create(name: "Jury")

# User for testing
User.create({ name: "Admin", surname: "Testercito", email: "admin@test.com", 
	dni: "12345678", password: "12345678", password_confirmation: "12345678", 
	user_type_id: "admin" })
User.create({ name: "Student", surname: "Testercito", email: "student@test.com", 
	dni: "12345678", password: "12345678", password_confirmation: "12345678", 
	user_type_id: "student" })
User.create({ name: "Tutor", surname: "Testercito", email: "tutor@test.com", 
	dni: "12345678", password: "12345678", password_confirmation: "12345678", 
	user_type_id: "jury_tutor" })
User.create({ name: "Jury", surname: "Testercito", email: "jury@test.com", 
	dni: "12345678", password: "12345678", password_confirmation: "12345678", 
	user_type_id: "jury_tutor" })
