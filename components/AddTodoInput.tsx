import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateTodoMutation, CreateTodoMutationVariables } from '../apollo/generated/apollo-types/CreateTodoMutation';
import { addTodoMutationCache } from '../api/queries';

const ADD_TODO_QUERY = gql`
  mutation CreateTodoMutation($data: TodoCreateInput!) {
    createOneTodo(data: $data) {
      id
      todo
      complete
    }
  }
`;

const addTodoToCache = (cache: any, data: CreateTodoMutation, todo: string) => {
  const todoItem = data?.createOneTodo || {
    __typename: 'Todo',
    id: uuidv4(),
    todo,
    complete: false
  }
  addTodoMutationCache(cache, todoItem);
}

const AddTodoInput = () => {
  const [todo, setTodo] = useState("")
  const [addTodo, { loading, client: { cache } }] = useMutation<CreateTodoMutation, CreateTodoMutationVariables>(ADD_TODO_QUERY, {
    update(cache, { data, errors }) {
      if (!errors && data) {
        addTodoToCache(cache, data, todo);
      }
    },
    onCompleted: (data) => {
      addTodoToCache(cache, data, todo);
    },
    errorPolicy: 'ignore',
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