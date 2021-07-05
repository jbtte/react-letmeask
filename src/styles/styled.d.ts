import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    title: string

    colors: {
      primary: string
      secundary: string
      background: string
      backgroundSecondary: string
      text: string
      secondaryText: string
    }
  }
}
