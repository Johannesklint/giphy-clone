import { useRouter } from 'next/router'
import Image from 'next/image'
import styled from 'styled-components'
import Input from './search-input'

const Form = styled.form`
  display: flex;
  margin: 40px 20px 40px;
  justify-content: center;
`

const Button = styled.button`
  background-color: var(--btn-color);
  padding: 5px 20px;
`
interface Event {
  preventDefault: () => void
  target: { search: { value: string } }
}

export default function Search() {
  const router = useRouter()

  function handleSubmit(event: Event) {
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
