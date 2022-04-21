import illustrationImg from '../assets/images/illustration.svg'
import logo from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'

export default function Home(){
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
                    <button className='create-room'>
                        <img src={googleIconImg} alt="Logo Google" />
                        Crie sua sala com o Google
                    </button>
                    <div  className='separator'>ou entre em uma sala</div>
                    <form action="">
                        <input 
                            type="text"
                            placeholder='Digite o código da sala' 
                        />
                        <button type='submit'>
                            Entrar  na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}