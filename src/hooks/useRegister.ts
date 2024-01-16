import { useNavigate } from 'react-router-dom'
import { REGISTER_API_URL } from '../utils/constant.ts'
import Swal from 'sweetalert2'

interface RegisterPayload {
  name: string
  email: string
  password: string
}

const useRegister = () => {
  const navigate = useNavigate()
  const handleRegister = async (payload: RegisterPayload) => {
    const response = await fetch(REGISTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()
    console.log(data)

    await Swal.fire({
      icon: 'success',
      title: 'Register Success',
      text: 'You can login now'
    })

    navigate('/login')
  }

  return {
    triggerRegister: handleRegister
  }
}

export default useRegister
