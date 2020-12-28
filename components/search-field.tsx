import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import Input from './search-input'

const Form = styled.form`
  display: flex;
  margin: 20px 0;
  justify-content: center;
`

const Button = styled.button`
  background-color: #fb4b68;
  padding: 5px 20px;
`

export default function Search() {
  const router = useRouter()

  async function handleSubmit(event: any) {
    event.preventDefault()
    const { value } = event.target.search
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
