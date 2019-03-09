import { UseTodoItemsProps } from '../hooks/useTodoItems'
import { Todo } from '../Todos'
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Checkbox,
  Button
} from '@material-ui/core'
import { EditTodoForm } from './TodoForms'
import React from 'react'

interface TodoListProps {
  todos: UseTodoItemsProps['todos']
  editItem: UseTodoItemsProps['editItem']
  selectedTodoId: Todo['id'] | null
  setSelectedTodoId: React.Dispatch<React.SetStateAction<string | null>>
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  editItem,
  selectedTodoId,
  setSelectedTodoId
}) => {
  return (
    <List>
      {todos.map(({ id, done, name }) => {
        const isSelected = selectedTodoId === id
        return (
          <ListItem key={id}>
            {isSelected && (
              <EditTodoForm
                value={name}
                onSubmit={async (name: string) => {
                  await editItem(id, { name })
                  setSelectedTodoId('asht')
                }}
              />
            )}
            {!isSelected && (
              <ListItemText
                style={{
                  textDecoration: done ? 'line-through' : 'inherit',
                  color: done ? 'grey' : 'inherit'
                }}
              >
                <Typography
                  variant='title'
                  style={{ color: done ? 'grey' : 'inherit' }}
                >
                  {name}
                </Typography>
              </ListItemText>
            )}
            <Checkbox
              checked={done}
              onClick={() => editItem(id, { done: !done })}
            />
            <Button onClick={() => setSelectedTodoId(isSelected ? null : id)}>
              {isSelected ? 'Cancel' : 'Edit'}
            </Button>
          </ListItem>
        )
      })}
    </List>
  )
}
