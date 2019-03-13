import { Button, Typography } from '@material-ui/core'
import React, { Fragment, useContext } from 'react'
import { AddTodoForm } from './components/TodoForms'
import { TodoList } from './components/TodoList'
import { SelectedTodoProvider } from './contexts/selectedTodoContext'
import { TodoContext, TodoProvider } from './contexts/todoContext'

export interface Todo {
  id: string
  name: string
  done: boolean
  createdAt: number
}

const Spacer = () => <div style={{ margin: '2em' }} />

const Todos: React.FC<{}> = () => {
  const { todos, removeDone, loading } = useContext(TodoContext)
  const isNoItem = !loading && !todos.length

  return (
    <Fragment>
      <Typography variant='h2'>Todos</Typography>
      <Spacer />

      {loading && <Typography>loading...</Typography>}
      {isNoItem && <Typography>No items</Typography>}

      <div style={{ width: 500, margin: 'auto' }}>
        {!loading && !isNoItem && (
          <Fragment>
            <TodoList />
            <Spacer />
            <Button color='secondary' variant='outlined' onClick={removeDone}>
              Remove Finished
            </Button>
          </Fragment>
        )}
        <Spacer />
        {!loading && <AddTodoForm />}
      </div>
    </Fragment>
  )
}

export default () => (
  <TodoProvider>
    <SelectedTodoProvider>
      <Todos />
    </SelectedTodoProvider>
  </TodoProvider>
)
