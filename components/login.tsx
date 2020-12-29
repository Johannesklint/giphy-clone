import { Modal, useModal } from './modal'

export default function Login() {
  const { isOpen, setIsOpen } = useModal()

  function handleLogin() {
    setIsOpen(true)
  }

  return (
    <>
      <button onClick={handleLogin}>Log in</button>
      <Modal isOpen={isOpen}>
        <p>hej</p>
      </Modal>
    </>
  )
}
