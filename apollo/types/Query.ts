import { objectType } from 'nexus'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.todo()
    t.crud.todos({ ordering: true })
  }
})
