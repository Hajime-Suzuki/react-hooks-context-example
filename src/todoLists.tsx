import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@material-ui/core'
import React, { Fragment } from 'react'
import { useForm } from './hooks/useTodoForm'
import { useTodoItems } from './hooks/useTodoItems'

export interface Item {
  id: string
  name: string
  done: boolean
  createdAt: number
}

const Spacer = () => <div style={{ margin: '2em' }} />

const TodoList: React.FC<{}> = () => {
  const { todos, toggleDone, addItem, removeDone, loading } = useTodoItems()
  const { formName, handleChange, clearForm } = useForm('')
  const isNoItem = !loading && !todos.length
  return (
    <Fragment>
      <Typography variant='h2'>Todo Lists</Typography>
      <Spacer />

      {loading && <Typography>loading...</Typography>}
      {isNoItem && <Typography>No items</Typography>}

      <div style={{ width: 500, margin: 'auto' }}>
        {!loading && !isNoItem && (
          <Fragment>
            <List>
              {todos.map(({ id, done, name }) => {
                return (
                  <ListItem key={id} button onClick={() => toggleDone(id)}>
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
                    <Checkbox checked={done} onClick={() => toggleDone(id)} />
                  </ListItem>
                )
              })}
            </List>
            <Spacer />
            <Button color='secondary' variant='outlined' onClick={removeDone}>
              Remove Finished
            </Button>
            <Spacer />
          </Fragment>
        )}

        {!loading && (
          <form onSubmit={e => e.preventDefault()}>
            <TextField label='name' value={formName} onChange={handleChange} />
            <Button
              type='submit'
              variant='outlined'
              disabled={!formName.trim()}
              onClick={() => {
                addItem(formName)
                clearForm()
              }}
            >
              Add
            </Button>
          </form>
        )}
      </div>
    </Fragment>
  )
}

export default TodoList
