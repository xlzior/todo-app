class Api::TagResource < JSONAPI::Resource
  attributes :name
  has_many :tasks
end