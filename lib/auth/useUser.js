import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import firebase from './firebase'

const useUser = () => {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const unsubscriber = firebase.auth().onAuthStateChanged(async user => {
      try {
        if(user) {
          await user.getIdToken(true).then(token => {
            setUser(token)
          })
        } else setUser(null)
      } catch(e) {
        console.log(e)
      } finally {
        setLoadingUser(false)
      }
    })

    return () => unsubscriber()
  }, [])

  const logout = () => {
    return firebase.auth().signOut().then(() => {
      router.push('/')
    }).catch(error => {
      console.log(error)
    })
  }

  return {
    user,
    loadingUser,
    logout
  }
}

export default useUser