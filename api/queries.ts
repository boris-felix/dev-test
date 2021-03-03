import { ApolloCache, gql } from '@apollo/client';
import { CreateTodoMutation_createOneTodo } from '../apollo/generated/apollo-types/CreateTodoMutation';
import { UpdateTodoMutation_updateOneTodo } from '../apollo/generated/apollo-types/UpdateTodoMutation';
import { DeleteTodoMutation_deleteOneTodo } from '../apollo/generated/apollo-types/DeleteTodoMutation';
import { TodosQuery_todos, TodosQuery } from '../apollo/generated/apollo-types/TodosQuery';

export const GET_TODOS_QUERY = gql`
  query TodosQuery {
    todos(orderBy: [{ id: desc }]) {
      id
      todo
      complete
    }
  }
`

const useReadCache = <QueryType>(cache: ApolloCache<QueryType>): [TodosQuery_todos[], (updatedTodos: TodosQuery_todos[]) => void] => {
  const existingTodos: TodosQuery = cache.readQuery({ query: GET_TODOS_QUERY }) || { todos: [] };
  return [
    existingTodos.todos,
    (updatedTodos: Partial<TodosQuery_todos>[]) => {
      cache.writeQuery({
        query: GET_TODOS_QUERY,
        data: { todos: updatedTodos }
      });
    }
  ]
}
export const addTodoMutationCache = <QueryType>(cache: ApolloCache<QueryType>, todoItem: CreateTodoMutation_createOneTodo) => {
  const [existingTodos, updateCache] = useReadCache<QueryType>(cache);
  const todoExist = existingTodos.find((todo: TodosQuery_todos) => todo.id === todoItem.id);
  const updatedTodos = !todoExist ? [...existingTodos, todoItem] : existingTodos;
  updateCache(updatedTodos);
}

export const updateTodoMutationCache = <QueryType>(cache: ApolloCache<QueryType>, todoItem: UpdateTodoMutation_updateOneTodo) => {
  const [existingTodos, updateCache] = useReadCache<QueryType>(cache);

  const updatedTodos = existingTodos.map((todo: TodosQuery_todos) => {
    if (todo.id === todoItem.id) {
      return {
        ...todo,
        complete: todoItem.complete
      }
    }

    return todo;
  });
  updateCache(updatedTodos);
}

export const deleteTodoMutationCache = <QueryType>(cache: ApolloCache<QueryType>, todoItem: DeleteTodoMutation_deleteOneTodo) => {
  const { id } = todoItem;
  const [existingTodos, updateCache] = useReadCache<QueryType>(cache);
  
  const updatedTodos = existingTodos.filter((todo: TodosQuery_todos) =>
    todo.id !== id
  );

  updateCache(updatedTodos);
}
