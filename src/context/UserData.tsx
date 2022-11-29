import React, { createContext } from 'react'
import { DataUser } from '../pages/loginPage'

export type UserContext = {
  userData: DataUser[]
}

const initialValue: UserContext = {
  userData: [],
}

const UserContext = createContext(initialValue)

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContext.Provider value={initialValue}>{children}</UserContext.Provider>
  )
}

export { UserProvider }
