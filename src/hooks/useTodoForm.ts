import { useState } from 'react'

export type UseTodoFormProps = ReturnType<typeof useForm>
export const useForm = (initial: string) => {
  const [formName, setName] = useState(initial)

  const handleChange = (e: any) => setName(e.target.value)
  const clearForm = () => setName('')

  return {
    formName,
    handleChange,
    clearForm
  }
}
