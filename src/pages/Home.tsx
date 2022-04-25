import { useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import { database } from '../services/firebase'

export default function Home() {
  const navigate = useNavigate();
  const {user, signInWithGoogle} = useAuth()
  const [codeRoom, setCodeRoom] = useState('')

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }
    navigate('/rooms/news')
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault()
    

    if(codeRoom.trim() === ''){
      return
    }

    const roomRef = await database.ref(`rooms/${codeRoom}`).get()

    if(!roomRef.exists()){
      alert(`Room does't exists.`)
      return
    }

    navigate(`rooms/${codeRoom}`)
  }

  return (
    <div id="page-home">
      <aside>
        <img src={illustrationImg} alt="Ilustração" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Logo Askland" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form action="" onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={e => setCodeRoom(e.target.value)}
              value={codeRoom}
             />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}

