import { useContext, createContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function Modal({ isOpen }) {
  const parentRef = useRef()

  useEffect(() => {
    const el = document.createElement('div')
    parentRef.current = document.getElementById('modal')

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

  return createPortal(<div>{isOpen ? 'hey' : null}</div>, parentRef.current)
}
export const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <Modal isOpen={isOpen} />
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Jkda')
  }
  const handleOpen = (value = false) => {
    context.setIsOpen((prev) => (value ? value : !prev))
  }
  return { isOpen: context.isOpen, setIsOpen: handleOpen }
}
