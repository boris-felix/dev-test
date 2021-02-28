import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { CreateTodoMutation, CreateTodoMutationVariables } from '../apollo/generated/apollo-types/CreateTodoMutation';

const AddTodoInput = () => {
  const [todo, setTodo] = useState("")
  const [addTodo, { loading }] = useMutation<CreateTodoMutation, CreateTodoMutationVariables>(gql`
    mutation CreateTodoMutation($data: TodoCreateInput!) {
      createOneTodo(data: $data) {
        id
        todo
        complete
      }
    }
  `, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          todos: (existingTodos = []) => [...existingTodos, data]
        }
      });
    }
  })

  return (
    <View style={{ margin: 8, flexDirection: "row", justifyContent: "space-between" }}>
      <TextInput autoFocus placeholder="Add a todo" value={todo} onChangeText={setTodo} />
      {loading ? <ActivityIndicator /> : (
        <Pressable onPress={async () => {
          await addTodo({
            variables: {
              data: {
                todo
              }
            }
          })
          setTodo("")
        }}>
          <Text>Add</Text>
        </Pressable>
      )}
    </View>
  )
}

export default AddTodoInput