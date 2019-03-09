import { useState, useEffect } from 'react'
import axios from 'axios'
import { Item } from '../todoLists'
import uuid from 'uuid/v4'

const URL = 'http://localhost:4000/todoItems'
const getTimestamp = () => new Date().getTime()

export const useTodoItems = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)

  const getItems = async () => {
    setLoading(true)
    const { data: todos } = await axios.get<Item[]>(URL, {
      params: { _sort: 'createdAt', _order: 'desc' }
    })
    setLoading(false)
    setItems(todos)
  }
  useEffect(() => {
    getItems()
  }, [])

  const toggleDone = async (id: Item['id']) => {
    const targetIndex = items.findIndex(item => item.id === id)
    const targetItem = items[targetIndex]
    const updatedItem = {
      ...targetItem,
      done: !targetItem.done
    }

    await axios.put(`${URL}/${id}`, updatedItem)

    const updatedItems = items.map((item, i) => {
      if (i === targetIndex) return updatedItem
      return item
    })
    setItems(updatedItems)
  }

  const addItem = async (name: Item['name']) => {
    const newItem = {
      id: uuid(),
      name,
      done: false,
      createdAt: getTimestamp()
    }

    await axios.post(URL, newItem)

    setItems([newItem, ...items])
  }

  const removeDone = async () => {
    const finishedIds = items.filter(item => item.done).map(item => item.id)
    await Promise.all(finishedIds.map(id => axios.delete(`${URL}/${id}`)))
    setItems(items.filter(item => !item.done))
  }

  return {
    todos: items,
    loading,
    toggleDone,
    addItem,
    removeDone
  }
}
