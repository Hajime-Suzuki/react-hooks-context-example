import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import React, { useContext } from 'react'
import { SelectedTodoContext } from '../contexts/selectedTodoContext'
import { TodoContext } from '../contexts/todoContext'
import { EditTodoForm } from './TodoForms'

export const TodoList: React.FC = () => {
  const { todos, editItem } = useContext(TodoContext)
  const { selectedTodoId, setSelectedTodoId } = useContext(SelectedTodoContext)
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
                  setSelectedTodoId(null)
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
