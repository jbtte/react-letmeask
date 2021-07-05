import { FormEvent, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { ThemeContext } from "styled-components"
import { shade } from "polished"

import Switch from "react-switch"
import illustraitionImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImg from "../assets/images/google-icon.svg"

import { Button } from "../components/Button/index"
import { useAuth } from "../hooks/useAuth"

import {
  PageAuthStyle,
  AsideStyle,
  ToggleStyle,
  MainStyle,
  MainDivStyle,
  MainContentStyle,
  CreateRoomStyle,
  SeparatorStyle,
} from "../styles/auth"

import { database } from "../services/firebase"
import { ToggleContext } from "../contexts/toogleContext"

export function Home() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()
  const [roomCode, setRoomCode] = useState("")
  const { colors } = useContext(ThemeContext)
  const { toggleTheme, checked } = useContext(ToggleContext)

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
        <ToggleStyle>
          <Switch
            onChange={toggleTheme}
            checked={checked}
            checkedIcon={false}
            uncheckedIcon={false}
            height={10}
            width={40}
            handleDiameter={20}
            boxShadow="1px 1px 4px black"
            offColor={colors.primary}
            onColor={shade(0.15, colors.secundary)}
          />
        </ToggleStyle>
        <MainDivStyle>
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
        </MainDivStyle>
      </MainStyle>
    </PageAuthStyle>
  )
}
