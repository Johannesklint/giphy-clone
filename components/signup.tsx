import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { gql, useMutate } from '../pages/hooks/useGraphql'
import { useUser } from './user'
import { useModal } from './modal'

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

export default function SignUp() {
  const [emailValue, setEmailValue] = useState<string>('')
  const [passwordValue, setPassword] = useState<string>('')
  const [secondPasswordValue, setSecondPassword] = useState<string>('')
  const { setIsOpen } = useModal()
  const { setUser } = useUser()

  const { data, error, mutate } = useMutate(gql`
    query($email: String, $password: String) {
      writeUser(email: $email, password: $password) {
        emailExist
        isLoggedIn
        user {
          id
          email
          password
        }
      }
    }
  `)
  const { email, emailExist } = data?.writeUser.user ?? {}
  useEffect(() => {
    if (email) {
      setTimeout(() => {
        setIsOpen(false)
        setUser(email)
      }, 1000)
    }
  }, [email, setIsOpen, setUser])

  function handleChange(setState: (arg0: string) => void) {
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
        Password
        <StyledInput
          type="password"
          value={passwordValue}
          onChange={handleChange(setPassword)}
          id="password"
          placeholder="Password"
        />
      </Label>
      <Label htmlFor="second-password">
        Re-type password
        <StyledInput
          type="password"
          value={secondPasswordValue}
          onChange={handleChange(setSecondPassword)}
          id="second-password"
          placeholder="Type password again"
        />
        {secondPasswordValue && passwordValue !== secondPasswordValue ? (
          <p>Your password does not match</p>
        ) : null}
      </Label>
      {emailExist ? <p>The email already exist</p> : null}
      <Button type="submit">Sign up!</Button>

      {!error && data && <p>You have been sign up</p>}
    </Form>
  )
}
