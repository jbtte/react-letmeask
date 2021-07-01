import copyImg from "../../assets/images/copy.svg"
import { RoomCodeStyle } from "./styles"
// import "../styles/room-code.scss"

type RoomCodeProps = {
  code: string
}

export function RoomCode(props: RoomCodeProps) {
  const { code } = props
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code)
  }
  return (
    <RoomCodeStyle
      type="button"
      className="room-code"
      onClick={copyRoomCodeToClipboard}
    >
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{code}</span>
    </RoomCodeStyle>
  )
}
