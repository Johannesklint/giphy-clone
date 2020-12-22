import { useRouter } from 'next/router'
import { useState } from 'react'

function Input() {
  const [value, setValue] = useState<string>('')
  return (
    <input
      name="search"
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export default function Search() {
  const router = useRouter()

  async function handleSubmit(event: any) {
    event.preventDefault()
    const value = event.target.search.value
    if (value) {
      router.push({
        pathname: '/search/[id]',
        query: { id: value },
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input />
      <button type="submit">Search</button>
    </form>
  )
}
