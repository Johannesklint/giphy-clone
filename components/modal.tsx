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

interface IModal {
  isOpen: boolean
  setIsOpen: (prev: unknown) => void
}

export const ModalContext = createContext<IModal>(null)

export function ModalProvider({ children }: { children: JSX.Element }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return <ModalContext.Provider value={{ isOpen, setIsOpen }}>{children}</ModalContext.Provider>
}

export function useModal() {
  const context = useContext<IModal>(ModalContext)

  if (!context) {
    throw new Error('something wrong with modal')
  }

  const handleOpen = (value: boolean | undefined) => {
    context.setIsOpen((prev: boolean) => {
      return value ? value : !prev
    })
  }

  return { isOpen: context.isOpen, setIsOpen: handleOpen }
}

export function Modal({ isOpen, children }: { isOpen: boolean; children: JSX.Element }) {
  const parentRef = useRef<HTMLElement>(null)
  const { setIsOpen } = useModal()

  useEffect(() => {
    const el = document.createElement('div')
    parentRef.current = document.getElementById('modal') as HTMLElement

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
