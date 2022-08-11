import { useEffect } from 'react';
import styled from 'styled-components';
import header from '../assets/header.png'
import AOS from 'aos';
import 'aos/dist/aos.css';



const Head = styled.div`
  margin-top: 60px;
  height: 400px;
  overflow: hidden;
  position: relative;
  display: block;

  @media (max-width: 1024px) {
    display: none;
  }
  > h1 {
    font-size: 3rem;
    color: #ffffff;
    text-shadow:  0px 0px 8px rgba(0,0,0,0.1);
    position: absolute;
    bottom: 80px;
    left: 10%;
  }

`

const Img = styled.img`
  width: 100%;
  position: absolute;
  top: -50px;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
`

const Header = () => {

  useEffect(() => {
    AOS.init({
        duration: 1000
    })
  }, [])

  return (
    <Head data-aos="fade-down">
      <Img src={header} />
      <h1 data-aos="fade-up">Electronics</h1>
    </Head>
  )
}

export default Header