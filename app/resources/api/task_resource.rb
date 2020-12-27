class Api::TaskResource < JSONAPI::Resource
  attributes :task, :completed
  has_many :tags, acts_as_set: true
end