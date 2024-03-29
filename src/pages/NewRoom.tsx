import { FormEvent, useState } from "react"
import { Link, useHistory } from "react-router-dom"

import illustraitionImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import { Button } from "../components/Button/index"
import { database } from "../services/firebase"
import { useAuth } from "../hooks/useAuth"

import {
  PageAuthStyle,
  AsideStyle,
  MainStyle,
  MainContentStyle,
} from "../styles/auth"

export function NewRoom() {
  const { user } = useAuth()
  const history = useHistory()
  const [newRoom, setNewRoom] = useState("")

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()
    if (newRoom.trim() === "") {
      return
    }

    const roomRef = database.ref("rooms")
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <PageAuthStyle id="page-auth">
      <AsideStyle>
        <img
          src={illustraitionImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </AsideStyle>
      <MainStyle className="main">
        <MainContentStyle className="main-content">
          <img src={logoImg} alt="Let Me Ask logo" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">Clique aqui</Link>
          </p>
        </MainContentStyle>
      </MainStyle>
    </PageAuthStyle>
  )
}
