import { useState } from 'react'
import styled from 'styled-components'
import Login from './login'
import { Modal, useModal } from './modal'
import SignUp from './signup'

const Container = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Button = styled.button`
  background-color: var(--btn-color);
  padding: 10px;
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
    <Container>
      <Button onClick={handleLogin} className="reset-btn">
        Log in
      </Button>
      <Modal isOpen={isOpen}>
        <Wrapper>
          {!showSignUp ? <Login /> : <SignUp />}
          <Button onClick={() => setShowSignUp((p: boolean) => !p)} className="reset-btn">
            {showSignUp ? <span>Log in</span> : <span>Not a member? Sign up!</span>}
          </Button>
        </Wrapper>
      </Modal>
    </Container>
  )
}
