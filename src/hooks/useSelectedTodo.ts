import { useState } from 'react'
import { Todo } from '../Todos'

export type UseSelectedTodoProps = ReturnType<typeof useSelectedTodo>
export const useSelectedTodo = () => {
  const [selectedTodoId, setSelectedTodoId] = useState<Todo['id'] | null>(null)
  return {
    selectedTodoId,
    setSelectedTodoId
  }
}
