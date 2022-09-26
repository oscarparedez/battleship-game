import React, { useContext, useState, useEffect } from 'react'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [ playersInfo, setPlayersInfo ] = useState()
  const [ room, setRoom ] = useState()

  return (
    <UserContext.Provider value={{ user, setUser, playersInfo, setPlayersInfo, room, setRoom }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserInfo = () => {
  const { user, setUser, playersInfo, setPlayersInfo, room, setRoom } = useContext(UserContext)
  return { user, setUser, playersInfo, setPlayersInfo, room, setRoom }
}
