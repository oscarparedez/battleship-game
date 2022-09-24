import React, { useContext, useState } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserInfo = () => {
  const { user, setUser } = useContext(UserContext)
  return { user, setUser }
}
