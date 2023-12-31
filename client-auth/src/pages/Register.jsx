import './Register.css'
import { useState } from 'react'
import usersFetch from '../axios/config'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const newUser = {
        name,
        email,
        password
      }

      const response = await usersFetch.post('/register', newUser)

      console.log('Resposta do servidor:', response.data);
      navigate('/')
    } catch (err) {
      console.error('Erro ao enviar solicitação:', err);
    }
  }

  return (
    <div className='register-container'>
      <h1>Entre para o servidor!</h1>
      <form className='register-form' onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            name='name'
            id='name'
            placeholder='Digite seu nome'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            name='email'
            id='email'
            placeholder='Insira seu E-Mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder='********'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Enviar" />
        </div>
      </form>
    </div>
  )
}

export default Register