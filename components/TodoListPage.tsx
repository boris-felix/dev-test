import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { TodosQuery } from '../apollo/generated/apollo-types/TodosQuery';
import AddTodoInput from "./AddTodoInput"
import TodoItem from "./TodoItem"
import { ConnectivityIndicator } from './ConnectivityIndicator';
import { GET_TODOS_QUERY } from '../api/queries';

const TodoListPage = () => {
  const { data, loading } = useQuery<TodosQuery>(GET_TODOS_QUERY, {
    notifyOnNetworkStatusChange: true
  });

  return (
    <SafeAreaView style={{ flex: 1, margin: 8 }}>
      <ConnectivityIndicator />
      <Text style={{ fontSize: 34, fontWeight: "800" }}>Todos</Text>
      <AddTodoInput />
      {loading ? <ActivityIndicator /> : data?.todos?.map(todo => <TodoItem key={todo.id} {...todo} />)}
    </SafeAreaView>
  )
}

export default TodoListPage