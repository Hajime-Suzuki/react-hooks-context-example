import React from 'react'
import { UseTodoItemsProps, useTodoItems } from '../hooks/useTodoItems'

export const TodoContext = React.createContext({} as UseTodoItemsProps)

export const TodoProvider: React.FC<{}> = props => {
  const todo = useTodoItems()
  return (
    <TodoContext.Provider value={todo}>{props.children}</TodoContext.Provider>
  )
}
