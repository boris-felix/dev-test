import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { updateTodoMutationCache, deleteTodoMutationCache } from '../api/queries';
import { TodosQuery_todos } from '../apollo/generated/apollo-types/TodosQuery';
import { DeleteTodoMutation, DeleteTodoMutationVariables, DeleteTodoMutation_deleteOneTodo } from '../apollo/generated/apollo-types/DeleteTodoMutation';
import { UpdateTodoMutation, UpdateTodoMutationVariables, UpdateTodoMutation_updateOneTodo } from '../apollo/generated/apollo-types/UpdateTodoMutation';

const TodoItem = ({ id, todo, complete }: TodosQuery_todos) => {
  const [updateTodo] = useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(gql`
    mutation UpdateTodoMutation($data: TodoUpdateInput!, $where: TodoWhereUniqueInput!) {
      updateOneTodo(data: $data, where: $where)  {
        id
        complete
      }
    }
  `, {
    update(cache, { data }) {
      const todoItem = data?.updateOneTodo || { id, complete: !complete } as UpdateTodoMutation_updateOneTodo;
      updateTodoMutationCache<UpdateTodoMutation>(cache, todoItem);
    },
    errorPolicy: 'ignore',
  })

  const [deleteTodo] = useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(gql`
    mutation DeleteTodoMutation($where: TodoWhereUniqueInput!) {
      deleteOneTodo(where: $where)  {
        id
      }
    }
  `, {
    update(cache, { data }) {
      const todoItem = data?.deleteOneTodo || { id } as DeleteTodoMutation_deleteOneTodo;
      deleteTodoMutationCache(cache, todoItem);
    }
  })

  return (
    <View style={{ margin: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
      <Text>{todo}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Pressable onPress={() => updateTodo({ variables: { where: { id }, data: { complete: { set: !complete } } } })}>
          <View style={{
            height: 20,
            width: 20,
            borderRadius: 8,
            marginRight: 8,
            backgroundColor: complete ? "#4ED4AF" : "#EEE",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
            <Text style={{ fontSize: 10, color: "white" }}>✔︎</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => deleteTodo({ variables: { where: { id } } })}>
          <Text style={{ color: "#F96277" }}>
            Delete
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

export default TodoItem