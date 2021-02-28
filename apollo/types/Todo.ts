import { objectType } from 'nexus'

export const Todo = objectType({
  name: 'Todo',
  definition(t) {
    t.model.id()
    t.model.todo()
    t.model.complete()
  },
})
