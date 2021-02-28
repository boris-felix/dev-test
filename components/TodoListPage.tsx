import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { useQuery, gql } from '@apollo/client';
import { TodosQuery } from '../apollo/generated/apollo-types/TodosQuery';
import AddTodoInput from "./AddTodoInput"
import TodoItem from "./TodoItem"

const TodoListPage = () => {
  const { data, loading } = useQuery<TodosQuery>(gql`
    query TodosQuery {
      todos(orderBy: [{ id: desc }]) {
        id
        todo
        complete
      }
    }
  `)

  return (
    <SafeAreaView style={{ flex: 1, margin: 8 }}>
      <Text style={{ fontSize: 34, fontWeight: "800" }}>Todos</Text>
      <AddTodoInput />
      {loading ? <ActivityIndicator /> : data?.todos?.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </SafeAreaView>
  )
}

export default TodoListPage