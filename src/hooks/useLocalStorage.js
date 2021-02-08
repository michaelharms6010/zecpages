import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = JSON.parse(localStorage.getItem(key))
    return item !== undefined ? item : initialValue
  })

  const setValue = () => {
    setStoredValue(!storedValue)
    localStorage.setItem(key, JSON.stringify(!storedValue))
  }

  return [storedValue, setValue]
}