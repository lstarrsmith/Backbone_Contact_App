require 'active_record'

ActiveRecord::Base.establish_connection({
  :adapter => "postgresql",
  :username => "Logan",
  :database => "contact_list"
})

ActiveRecord::Base.logger = Logger.new(STDOUT)
