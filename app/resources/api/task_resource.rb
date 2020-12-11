class Api::TaskResource < JSONAPI::Resource
  attributes :task, :completed
end