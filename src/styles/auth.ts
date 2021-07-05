import styled from "styled-components"

export const PageAuthStyle = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
`

export const AsideStyle = styled.aside`
  flex: 7;

  background: ${(props) => props.theme.colors.secundary};
  color: ${(props) => props.theme.colors.secondaryText};

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 120px 80px;

  img {
    max-width: 320px;
  }

  strong {
    font: 700 36px "Poppins", sans-serif;
    line-height: 42px;
    margin-top: 16px;
  }

  p {
    font-size: 24px;
    line-height: 32px;
    margin-top: 16px;
    color: ${(props) => props.theme.colors.secondaryText};
  }
`

export const ToggleStyle = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  flex: 1;
`

export const MainStyle = styled.main`
  flex: 8;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
`
export const MainDivStyle = styled.div`
  display: flex;
  flex: 20;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MainContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  align-items: stretch;
  text-align: center;
  padding: 100 auto;

  > img {
    align-self: center;
  }

  h2 {
    font-size: 24px;
    margin: 64px 0 24px;
    font-family: "Poppins", sans-serif;
  }

  form {
    input {
      height: 50px;
      border-radius: 8px;
      padding: 0 16px;
      background: ${(props) => props.theme.colors.background};
      border: 1px solid #a8a8b3;
    }

    button {
      margin-top: 16px;
    }

    button,
    input {
      width: 100%;
    }
  }

  p {
    font-size: 14px;
    color: ${(props) => props.theme.colors.text};
    margin-top: 16px;

    a {
      color: #e559f9;
    }
  }
`

export const CreateRoomStyle = styled.button`
  margin-top: 64px;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  background: #ea4335;
  color: ${(props) => props.theme.colors.secondaryText};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 8px;
  }

  &:hover {
    filter: brightness(0.9);
  }
`

export const SeparatorStyle = styled.div`
  font-size: 14px;
  color: #a8a8b3;

  margin: 32px 0;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    flex: 1;
    height: 1px;
    margin-right: 16px;
    background: #a8a8b3;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    margin-left: 16px;
    background: #a8a8b3;
  }
`
