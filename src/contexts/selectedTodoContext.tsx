import React from 'react'
import { useSelectedTodo, UseSelectedTodoProps } from '../hooks/useSelectedTodo'

export const SelectedTodoContext = React.createContext(
  {} as UseSelectedTodoProps
)

export const SelectedTodoProvider: React.FC<{}> = props => {
  const selectedTodo = useSelectedTodo()

  return (
    <SelectedTodoContext.Provider value={selectedTodo}>
      {props.children}
    </SelectedTodoContext.Provider>
  )
}
