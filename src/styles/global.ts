import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme["gray-100"]};
    }
}
  html, body { 
    height: 100%;
  }
    body {
        background-color: ${(props) => props.theme["white"]};
        color: ${(props) => props.theme["black"]};
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
    }
`;
