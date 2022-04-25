import logoImg  from '../assets/images/logo.svg'
import Button from '../components/Button'
import RoomCode from '../components/RoomCode'
import { useParams } from 'react-router-dom'
import { FormEvent, useEffect, useState } from 'react'

import '../styles/room.scss'
import useAuth from '../hooks/useAuth'
import { database } from '../services/firebase'

type Params={
    id: string
}

type FirebaseQuestions = Record<string, {
    author: {
      name: string;
      avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }>

type Questions={
    id: string,
    author: {
        name: string,
        avatar: string
    } 
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean   
}

export default function Room(){  
  

    const [newQuestion, setNewQuestion] = useState('')
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('');
    const { user } = useAuth()

    const params = useParams<Params>()
    const idRoom = params.id

    useEffect(() => {
        
        const roomRef = database.ref(`rooms/${idRoom}/questions`)

        roomRef.on('value', (snapshot) => {
          let databaseRoom: FirebaseQuestions = snapshot.val() ?? {}

         let   questionsParse = Object.entries(databaseRoom).map(([key, value])=>{

             return {
                 id: key,
                 content: value.content,
                 author: value.author,
                 isHighlighted: value.isHighlighted,
                 isAnswered: value.isAnswered
             }
            })
            setQuestions(questionsParse)
            console.log(questions[0].content)
            
        })
        
    }, [idRoom])

    async function handleSendQuestion(event: FormEvent){
        event.preventDefault()

        if(newQuestion.trim() === ''){
            return
        }

        if(!user){
            throw new Error('you must be logged in')    
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false
        }
        await database.ref(`rooms/${idRoom}/questions`).push(question)

        setNewQuestion('')
    }

    return(
        <div className="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <RoomCode code={idRoom ? idRoom : '000000000000'}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>
                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder='O que você quer perguntar?'
                        onChange={e => setNewQuestion(e.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        {(!user ? 
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        : 
                          <div className='infoUser'><img src={user.avatar} alt="" /><span>{user.name}</span></div>
                            )} 
                            <Button type="submit">Enviar pergunta</Button>                                          
                    </div>
                </form>
                <div></div>
            </main>
        </div>
    )
}

