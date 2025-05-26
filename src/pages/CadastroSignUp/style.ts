import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;

  .leftContent {
    flex: 1;
    display: flex;
    margin-top: 15px;
    margin-right: 300px;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background: #fff;
  }

  .formHeader {
    text-align: center;
    margin-bottom: 1rem;

    h1 {
      font-size: 45px;
      font-weight: 600;
    }

    p {
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }

  .signUpForm {
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

    input {
      width: 100%;
      height: 40px;
      padding: 0 1.5rem 0 1rem;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      font-size: 1rem;
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
  }

  button {
    width: 85%;
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

  .registerButton {
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

  .loginLink {
    text-align: center;
    font-size: 0.875rem;
    display: flex;
    width: 300px;
    flex-direction: column;
    justify-content: center;

    .registerTextArea {
      font-size: 0.875rem;
      color: ${props => props.theme['black']};
      margin: 0;
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

  .loginLink span {
    font-size: 12px;
    margin: 1rem 0;
    justify-content: center;
  }

  .loginFooter {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.75rem;

    a {
      text-decoration: none;
      color: ${props => props.theme['purple-100']};
    }
  }

.logoWrapper {
      margin-top: 10px;
      margin-left: 50px;

      img {
        width: 162px;
   }
}
`;
