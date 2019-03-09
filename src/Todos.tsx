import { Button, Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import { AddTodoForm } from './components/TodoForms'
import { TodoList } from './components/TodoList'
import { useTodoItems } from './hooks/useTodoItems'

export interface Todo {
  id: string
  name: string
  done: boolean
  createdAt: number
}

const Spacer = () => <div style={{ margin: '2em' }} />

const Todos: React.FC<{}> = () => {
  const { todos, editItem, addItem, removeDone, loading } = useTodoItems()
  const [selectedTodoId, setSelectedTodoId] = useState<Todo['id'] | null>(null)
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
            <TodoList
              todos={todos}
              editItem={editItem}
              selectedTodoId={selectedTodoId}
              setSelectedTodoId={setSelectedTodoId}
            />
            <Spacer />
            <Button color='secondary' variant='outlined' onClick={removeDone}>
              Remove Finished
            </Button>
          </Fragment>
        )}
        <Spacer />
        {!loading && <AddTodoForm addItem={addItem} />}
      </div>
    </Fragment>
  )
}

export default Todos
