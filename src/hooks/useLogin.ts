import { LOGIN_API_URL, TOKEN_KEY } from '../utils/constant.ts'
import Swal from 'sweetalert2'
import React from 'react'
import { TokenContext } from '../context/tokenContext.ts'
import { useNavigate } from 'react-router-dom'

interface LoginPayload {
  email: string
  password: string
}

const useLogin = () => {
  const navigate = useNavigate()
  const { setToken } = React.useContext(TokenContext)

  const handleLogin = async (payload: LoginPayload) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      console.log(data)

      if (data.errors) {
        throw new Error('something went wrong')
      }

      localStorage.setItem(TOKEN_KEY, data.data.token)
      setToken(data.data.token)
      navigate('/')
      await Swal.fire({
        icon: 'success',
        title: 'Login Success'
      })
    } catch (error) {
      await Swal.fire({
        icon: 'error',

        title: 'Login Failed'
      })
    }
  }

  return {
    triggerLogin: handleLogin
  }
}

export default useLogin
