# Create user types
admin_type = UserType.create({name: "Administrator"})
student_type = UserType.create({name: "Student"})
tutor_type = UserType.create({name: "Tutor"})
jury_type = UserType.create({name: "Jury"})

# Create user rols
author_rol = ThesisProjectRol.create(name: "Author")
tutor_rol = ThesisProjectRol.create(name: "Tutor")
jury_rol = ThesisProjectRol.create(name: "Jury")

# User for testing
User.create({ name: "Admin", surname: "Testercito", email: "admin@test.com", 
			password: "12345678", password_confirmation: "12345678", user_type_id: admin_type.id })
User.create({ name: "Student", surname: "Testercito", email: "student@test.com", 
			password: "12345678", password_confirmation: "12345678", user_type_id: student_type.id })
User.create({ name: "Tutor", surname: "Testercito", email: "tutor@test.com", 
			password: "12345678", password_confirmation: "12345678", user_type_id: tutor_type.id })
User.create({ name: "Jury", surname: "Testercito", email: "jury@test.com", 
			password: "12345678", password_confirmation: "12345678", user_type_id: jury_type.id })