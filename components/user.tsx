import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }: { children: JSX.Element }) {
  const isBrowser = typeof window !== 'undefined'
  const [user, setUser] = useState<string | null>(() => {
    if (isBrowser) {
      return window.sessionStorage.getItem('user')
    }
    return null
  })

  const addUser = (email: string) => {
    if (email && isBrowser) {
      setUser(email)
      window.sessionStorage.setItem('user', email)
    }
  }

  return <UserContext.Provider value={{ user, setUser: addUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)

  const { user, setUser } = context
  useEffect(() => {
    if (user) {
      setUser(user)
    }
  }, [setUser, user])

  return context ? { user, setUser } : null
}
