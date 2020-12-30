import { useContext, createContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 80%;
  height: 80%;
  z-index: 1;
  border-radius: 4px;
  padding: 12px;
`

const Button = styled.button`
  font-size: 36px;
  background-color: var(--btn-color);
  padding: 0px 9px;
`

export const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return <ModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</ModalContext.Provider>
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('something wrong with modal')
  }

  const handleOpen = (value = false) => {
    context.setIsOpen((prev: boolean) => (value ? value : !prev))
  }

  return { isOpen: context.isOpen, setIsOpen: handleOpen }
}

export function Modal({ isOpen, children }: { isOpen: boolean; children: JSX.Element }) {
  const parentRef = useRef<HTMLInputElement>(null)
  const { setIsOpen } = useModal()

  useEffect(() => {
    const el = document.createElement('div')
    parentRef.current = document.getElementById('modal') as HTMLInputElement

    if (parentRef.current) {
      parentRef.current.appendChild(el)
    }
    return () => {
      parentRef.current.removeChild(el)
    }
  }, [])

  if (!parentRef.current) {
    return null
  }

  return isOpen
    ? createPortal(
        <ModalWrapper>
          <Button className="reset-btn" onClick={() => setIsOpen(false)}>
            &times;
          </Button>
          {children}
        </ModalWrapper>,
        parentRef.current
      )
    : null
}
