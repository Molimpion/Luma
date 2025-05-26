import styled from "styled-components";
import backgroundImage from '../../assets/LeftWallpaper.png'

export const Container = styled.section `

    width: 40%;
    height: 100hv;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
    position: relative;


    @media (max-width: 768px) {
      display: none;
    }
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background-color: ${props => props.theme['purple-100']}80;
      z-index: 1;
    }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;

  &::before, 
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
  }

  span {
    margin: 0 10px;
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
`