class CreateTagsTasksJoinTable < ActiveRecord::Migration[6.0]
  def change
    create_join_table :tags, :tasks
  end
end
