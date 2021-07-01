import { FormEvent, useState } from "react"
import { useHistory } from "react-router-dom"

import illustraitionImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button/index"
import { useAuth } from "../hooks/useAuth"

import {
  PageAuthStyle,
  AsideStyle,
  MainStyle,
  MainContentStyle,
  CreateRoomStyle,
  SeparatorStyle,
} from "../styles/auth"

import { database } from "../services/firebase"

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState("")

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push("/rooms/new")
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()
    if (roomCode.trim() === "") {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert("Room does no exists.")
      return
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed.")
      return
    }

    history.push(`rooms/'${roomCode}`)
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
          <CreateRoomStyle
            type="button"
            onClick={handleCreateRoom}
            className="create-room"
          >
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </CreateRoomStyle>
          <SeparatorStyle className="separator">
            ou entre em uma sala
          </SeparatorStyle>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </MainContentStyle>
      </MainStyle>
    </PageAuthStyle>
  )
}
