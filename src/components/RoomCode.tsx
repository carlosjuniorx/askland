import '../styles/room-code.scss'
import copyImg from '../assets/images/copy.svg'

type RoomCodeProps={
    code: string
}
export default function RoomCode(props: RoomCodeProps){

   function copyRoomCode(){
        navigator.clipboard.writeText(props.code)     
    }

    return(
        <button className="room-code" onClick={copyRoomCode}>
            <div>
                <img src={copyImg} alt="Cop room code" />
            </div>
            <span id='codeRoomId'>Sala #{props.code}</span>
        </button>
    )
}