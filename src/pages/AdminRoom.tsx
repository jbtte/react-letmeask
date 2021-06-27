import { useParams } from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import {Button} from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import {Question} from '../components/Question/index'

import '../styles/room.scss'
import { useRoom } from '../hooks/useRoom'


type RoomParams = {
  id: string;
}

export function AdminRoom (){
  const params = useParams<RoomParams>()
  const roomId = params.id;
  
  const { title, questions } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>Encerrar Sala</Button>
          </div>
        </div>
      </header>
      <main className="main-room">
        <div className="room-title">
          <h1>{title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div>
        </div>
        <div className="question-list">
          {questions.map((question)=>{
            return(
              <Question
                key={question.id} 
                content = {question.content}
                author={question.author}
              /> 
            )
          })}
        </div>
      </main>
    </div>
  )
}