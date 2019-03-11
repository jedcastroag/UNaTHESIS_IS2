# README

## Documentation


* [Tutorial Ruby on Rails - TESTING] (https://www.railstutorial.org/book/static_pages#sec-getting_started_with_testing)
* [Heroku - Getting started with Rails 5](https://devcenter.heroku.com/articles/getting-started-with-rails5)
* [Heroku - Getting started with Ruby](https://devcenter.heroku.com/articles/getting-started-with-ruby)
* [Coursera - Ruby on Rails](https://www.coursera.org/specializations/ruby-on-rails)

## App execution

* Install **Ruby** and **Rails gem**
* Install **Heroku CLI**
* Install **Postgres SQL**
* Clone this repository locally.
* Open repository folder and execute `bundle install`.
* Run `rails server` and open http://localhost:3000 in a browser or `heroku local` and open http://localhost:5000 in a browser.
* [Install React-Rails](https://github.com/reactjs/react-rails)
* ~~[Install Semantic UI](https://github.com/ashtonthomas/sample-rails-react-semantic-ui-app)~~
* [Install Fomantic UI](https://fomantic-ui.com/elements/icon.html#/definition)
* Run `bundle install`
* Run `yarn install`

* Run rails `db:migrate` and rails `db:seed`
* Run `foreman start` or `rails server`

* Heroku version is in https://unthesis.herokuapp.com/.

## Unit testing

After git clone or pull, run `rails test` to run the test suit and verify that the application have not errors.

## Testing Credentials

For testing purposes, was created four users by each rol (Admin, Student, Tutor, Jury). The credentials for access at the platform will be the type user name followed by '@test.com', eg. admin@test.com. The password is 12345678

## DEPLOY

Remember change `config/master.key` before deployment and the `jwt.key` keys
