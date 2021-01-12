export type MinimalTask = {
  type: "tasks",
  id: string,
}

export type FullTask = {
  type: "tasks",
  id: string,
  attributes: {
    task: string,
    completed: boolean
  },
  relationships: {
    tags: {
      data: MinimalTag[]
    }
  }
}

export type MinimalTag = {
  type: "tags",
  id: string,
}

export type FullTag = {
  type: "tags",
  id: string,
  attributes: {
    name: string
  },
  relationships: {
    tasks: {
      data: MinimalTask[]
    }
  }
}
