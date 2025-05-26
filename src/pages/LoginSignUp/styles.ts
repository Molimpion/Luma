import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;

  

  .rightContent {
    flex: 1;
    display: flex;
    margin-top: 10px;
    margin-left: 300px;
    width: 100%;
    max-width: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: #fff;
  }

  .formHeader {
    text-align: center;
    margin-bottom: 1rem;

    h1 {
      font-size: 3rem;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }

  .loginForm {
    width: 100%;
    max-width: 500px;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    border: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);

    p {
      font-size: 1rem;
      margin-bottom: 1rem;
      text-align: center;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.3rem;
      align-self: flex-start;
    }

    /* TRBL - TOP RIGHT BOTTOM LEFT  */
    input {
      width: 100%;
      height: 40px;
      padding: 0 1.5rem 0 1rem;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      font-size:1rem;
      background: rgba(217, 217, 217, 0.15);
      box-sizing: border-box;
    }

    .inputGroup {
        width: 100%;
    }

    .inputWithIcon {
        position: relative;
        width: 100%;
    }

    .icon {
      position: absolute;
      right: 1rem;
      top: 56.4%;
      transform: translateY(-50%);
      color: ${props => props.theme['purple-300']};
      cursor: pointer;
    }

    .rememberForgot {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      font-size: 0.75rem;

      a {
        color: ${props => props.theme['purple-100']};
        text-decoration: underline;
      }
    }

    

  }

    button {
      width: 100%;
      height: 45px;
      background-color: ${props => props.theme['purple-100']};
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;

      &:hover {
        background-color: ${props => props.theme['purple-300']};
      }
    }

    .loginButton {
        margin-top: 1rem;
        background-color: ${(props) => props.theme['purple-100']};
        color: white;
        font-weight: bold;
        border-radius: 8px;
        text-transform: none;
        padding: 0.75rem;
        font-size: 1rem;

  & :hover {
     background-color: ${(props) => props.theme['purple-300']};
  }
}
    .loginButton {
        margin-top: 1rem;
        background-color: ${(props) => props.theme['purple-100']};
        color: white;
        font-weight: bold;
        border-radius: 8px;
        text-transform: none;
        padding: 0.75rem;
        font-size: 1rem;

    &:hover {
        background-color: ${(props) => props.theme['purple-300']};
  }
}

    .registerLink {
      text-align: center;
      font-size: 0.875rem;
      display: flex;
      width: 404px;
      flex-direction: column;
      justify-content: center;

      .registerTextArea{
        font-size: 0.875rem;
        color:${props => props.theme['black']} ;
        margin: 1rem 0;
        justify-content: center;
        display: flex;
        align-items: center;
        gap: 0.3rem;
      }

      a {
        color: ${props => props.theme['purple-100']};
        text-decoration: underline;
      }
    }

    .registerLink span {
        font-size: 12px;
        margin: 3rem 0;
        justify-content: center;
    }

    .photoIcon {    
      right: 1rem;
      top: 5%;
      left: 11.2rem;
      font-size: 3.125rem;
      margin-top: 0.75rem;
      margin-bottom: 0.75rem;
      position: relative;
      justify-content: center;
      transform: translateY(-50%);
      cursor: pointer;
    }

    .loginFooter {
        margin-top: 1rem;
        text-align: center;
        font-size: 0.75rem;
    }
    .loginFooter a {
        text-decoration: none;
        color: ${props => props.theme['purple-100']}
    }

    .logoWrapper {
      margin-top: 10px;
      margin-left: 12px;
      img {
        width: 162px;
      }
    }
`