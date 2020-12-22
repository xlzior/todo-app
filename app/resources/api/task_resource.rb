class Api::TaskResource < JSONAPI::Resource
  attributes :task, :completed
  has_many :tags
end