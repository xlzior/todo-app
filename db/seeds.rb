# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

react = Task.create(task: "Learn React", completed: true)
typescript = Task.create(task: "Learn TypeScript", completed: false)
ruby = Task.create(task: "Learn Ruby", completed: false)

cvwo_tag = Tag.create(name: "CVWO")

react.tags.create!(name: "CS")