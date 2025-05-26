import { Container } from './style'
import { useEffect } from 'react';


export function  RightImageSection() {
    useEffect(() => {
        document.title = "Luma - cadastre-se";
      }, []);  
      
    return (
        <Container className="Right-side">
          {/* <div className="Right-image-section">
            <svg className="svg-mask" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,0 L100,0 L100,100 L0,100 C25,90 25,10 0,0"
                fill="white"
              />
            </svg>
          </div> */}
        </Container>
      );
      
}