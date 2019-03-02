# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Create user types
admin_type = UserType.create({name: "Administrator"})
student_type = UserType.create({name: "Student"})
tutor_type = UserType.create({name: "Tutor"})
jury_type = UserType.create({name: "Jury"})

# User for testing
User.create({ name: "Admin", surname: "Testercito", email: "admin@test.com",
			password: "12345678", password_confirmation: "12345678", user_type_id: admin_type.id })
User.create({ name: "Student", surname: "Testercito", email: "student@test.com",
			password: "12345678", password_confirmation: "12345678", user_type_id: student_type.id })
User.create({ name: "Tutor", surname: "Testercito", email: "tutor@test.com",
			password: "12345678", password_confirmation: "12345678", user_type_id: tutor_type.id })
User.create({ name: "Jury", surname: "Testercito", email: "jury@test.com",
			password: "12345678", password_confirmation: "12345678", user_type_id: jury_type.id })
User.create({ name: "Student2", surname: "Testercito", email: "student2Thesis@test.com",
			password: "12345678", password_confirmation: "12345678", user_type_id: student_type.id })
