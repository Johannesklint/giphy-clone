import { useState } from 'react'
import styled from 'styled-components'
import Login from './login'
import { Modal, useModal } from './modal'
import SignUp from './signup'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  background-color: var(--btn-color);
  padding: 20px 25px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
`

export default function LoginSignUp() {
  const [showSignUp, setShowSignUp] = useState<boolean>(false)
  const { isOpen, setIsOpen } = useModal()

  function handleLogin() {
    setIsOpen(true)
  }

  return (
    <>
      <Button onClick={handleLogin} className="reset-btn">
        Log in
      </Button>
      <Modal isOpen={isOpen}>
        <Wrapper>
          {!showSignUp ? <Login /> : <SignUp />}
          <Button onClick={() => setShowSignUp((p: boolean) => !p)} className="reset-btn">
            Not a member? Sign up!
          </Button>
        </Wrapper>
      </Modal>
    </>
  )
}
