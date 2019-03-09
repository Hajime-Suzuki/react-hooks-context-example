import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from '../hooks/useTodoForm'
import { UseTodoItemsProps } from '../hooks/useTodoItems'

interface TodoFormProps {
  value?: string
  addItem: UseTodoItemsProps['addItem']
}

export const AddTodoForm: React.FC<TodoFormProps> = ({
  addItem,
  value = ''
}) => {
  const { formName, handleChange, clearForm } = useForm(value)
  return (
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
  )
}

interface EditTodoFormProps {
  value: string
  onSubmit: (name: string) => void
}
export const EditTodoForm: React.FC<EditTodoFormProps> = ({
  value,
  onSubmit
}) => {
  const { formName, handleChange } = useForm(value)

  return (
    <form
      style={{ width: '100%' }}
      onSubmit={async e => {
        e.preventDefault()
        await onSubmit(formName)
      }}
    >
      <TextField fullWidth value={formName} onChange={handleChange} />
    </form>
  )
}
