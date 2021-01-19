import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { gql, useMutate } from '../pages/hooks/useGraphql'
import { useModal } from './modal'
import { useUser } from './user'

const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 24px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-bottom: 14px;
`

const StyledInput = styled.input`
  border: 0;
  padding: 9px 10px;
  width: 500px;
  border: 1px solid var(--custom-black);
  border-radius: 2px;
`
const Button = styled.button`
  background-color: var(--btn-color);
  padding: 20px 25px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`

export default function Login() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPassword] = useState<string>('')
  const { setIsOpen } = useModal()
  const { setUser } = useUser()

  const { data, error, mutate } = useMutate(gql`
    query($email: String, $password: String) {
      loginUser(email: $email, password: $password) {
        id
        email
      }
    }
  `)

  const { email } = data?.loginUser ?? {}
  useEffect(() => {
    if (email) {
      setTimeout(() => {
        setIsOpen(false)
        setUser(email)
      }, 1000)
    }
  }, [email, setIsOpen, setUser])

  function handleChange(setState: (prevState: string) => void) {
    return (event: { target: { value: string } }) => {
      setState(event.target.value)
    }
  }

  function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault()
    mutate({
      email: emailValue,
      password: passwordValue,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">
        Email
        <StyledInput
          type="email"
          value={emailValue}
          onChange={handleChange(setEmailValue)}
          id="email"
          placeholder="Email"
        />
      </Label>
      <Label htmlFor="password">
        <StyledInput
          type="password"
          value={passwordValue}
          onChange={handleChange(setPassword)}
          id="password"
          placeholder="Password"
        />
      </Label>
      <Button type="submit">Log in</Button>

      {!error && data && <p>You have been logged in</p>}
    </Form>
  )
}
