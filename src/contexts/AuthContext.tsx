import { createContext, useState, useEffect, ReactNode } from "react"
import { auth, firebase } from "../services/firebase"

type User = {
  id: string
  name: string
  avatar: string
}

type AuthContextType = {
  user: User | undefined
  signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()
  const { children } = props

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedUser) => {
      if (loggedUser) {
        const { displayName, photoURL, uid } = loggedUser

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.")
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

    return () => unsubscribe()
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.")
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}
