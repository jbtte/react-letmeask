import { useHistory, useParams, Link } from "react-router-dom"
import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button"
import { RoomCode } from "../components/RoomCode"
import { Question } from "../components/Question/index"
import { database } from "../services/firebase"

import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answer from "../assets/images/answer.svg"

import "../styles/room.scss"
import { useRoom } from "../hooks/useRoom"

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const history = useHistory()
  const params = useParams<RoomParams>()
  const roomId = params.id

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push("/")
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <>
      <div id="page-room">
        <header>
          <div className="content">
            <Link to="/">
              <img src={logoImg} alt="LetMeAsk" />
            </Link>
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={handleEndRoom}>
                Encerrar Sala
              </Button>
            </div>
          </div>
        </header>
        <main className="main-room">
          <div className="room-title">
            <h1>{title}</h1>
            {questions.length > 0 && (
              <span>{questions.length} pergunta(s)</span>
            )}
          </div>
          <div />
          <div className="question-list">
            {questions.map((question) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={checkImg} alt="highlight question" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={answer} alt="answer question" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="remove question" />
                </button>
              </Question>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
