import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'

import '../styles/auth.scss'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import { database } from '../services/firebase'

export default function NewRoom(){ 
    const { user } = useAuth() 
    const navigate = useNavigate()

    const [newRoom, setNewRooom] = useState('')


    async function handleCreateRoom(event: FormEvent){
        event.preventDefault()

        if(newRoom.trim() === ''){
            return  
        } 

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        }) 

        navigate(`/rooms/${firebaseRoom.key}`)
    }
    
    return(
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt="Ilustração" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas  de sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logo} alt="Logo Askland" />   
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder='Nome da sala'
                            onChange={(e)=>setNewRooom(e.target.value)}
                            value={newRoom} 
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar numa sala existente? <Link to='/'>Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}
