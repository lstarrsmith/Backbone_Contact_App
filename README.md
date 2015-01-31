## Contact List

A simple contact list single-page app built using Backbone and Sinatra. 

- **Additional Technologies of Features**
  - AJAX
  - [Random User API](http://randomuser.me/)
  - jQuery
  - Backbone.js
  - Bootstrap

- **Initial User Stories.. for context**
  - A user can have three categories of contact lists
    - Example: `Friends`, `Family`, and `Work`
  - A user can create new contacts
  - A user can update and delete existing contacts
  - A user can move contacts between list categories (ie from `Work` to `Friends`)
  - A user can assign a random image to contact when creating it
    - This should use the Random User API
  - A user can search through their contacts for a specific contact
  - A user will see an error if they have entered incomplete information
    - Example: If a user enters Name, Age, Address, and Picture but forgets to enter Phone Number, they will see an error message


## Setting up the API on your local computer

- If you have not used Bundler before, install it using `gem install bundler`
- Run `bundle install`
- Update the `db/connection` to include your postgres username
- Create the database `contact_list` using psql
- Use the `db/schema.sql` file to create your tables
- To start the server, in the directory run `rackup config.ru`. This will replace the `ruby server.rb` command we have been using thus far.
- Run `ruby console.rb` to ensure that your database is connected to the server
- Run `ruby seeds.rb` to seed your database with sample data.
