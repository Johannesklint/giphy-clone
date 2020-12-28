import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  margin: 20px 0;
  justify-content: center;
`
const StyledInput = styled.input`
  border: 0;
  padding: 9px 10px;
  width: 500px;
`

const Button = styled.button`
  background-color: #fb4b68;
  padding: 10px 20px;
`

function Input() {
  const [value, setValue] = useState<string>('')
  return (
    <StyledInput
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
    <Form onSubmit={handleSubmit}>
      <Input />
      <Button className="reset-btn" type="submit">
        <Image src="/search.svg" width={20} height={20} />
      </Button>
    </Form>
  )
}
