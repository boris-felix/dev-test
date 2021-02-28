import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { TodosQuery_todos } from '../apollo/generated/apollo-types/TodosQuery';
import { DeleteTodoMutation, DeleteTodoMutationVariables } from '../apollo/generated/apollo-types/DeleteTodoMutation';
import { UpdateTodoMutation, UpdateTodoMutationVariables } from '../apollo/generated/apollo-types/UpdateTodoMutation';

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
      const { id, complete, __typename } = data?.updateOneTodo || {}
      cache.modify({
        id: cache.identify({ id, __typename }),
        fields: {
          complete: () => !!complete
        }
      })
    }
  })

  const [deleteTodo] = useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(gql`
    mutation DeleteTodoMutation($where: TodoWhereUniqueInput!) {
      deleteOneTodo(where: $where)  {
        id
      }
    }
  `, {
    update(cache, { data }) {
      const { id, __typename } = data?.deleteOneTodo || {}
      cache.modify({
        fields: {
          todos: (existingTodos = []) => existingTodos.filter(({ __ref }: any) =>
            __ref !== cache.identify({ id, __typename })
          )
        }
      });
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