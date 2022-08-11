import { useContext, useEffect } from 'react';
import { MyContext } from '../context/MyContext';
import styled, { keyframes } from 'styled-components';
import { Link } from "react-router-dom";
import aerolabLogo from '../assets/logo.svg'
import coin from '../assets/icons/coin.svg'
import Coin from './spinners/Coin';
import AOS from 'aos';
import 'aos/dist/aos.css';

const jump = keyframes`
  0%   { transform: scale(1,1)    translateY(0); }
  10%  { transform: scale(1.1,.9) translateY(0); }
  30%  { transform: scale(.9,1.1) translateY(-5px); }
  50%  { transform: scale(1,1)    translateY(0); }
  100% { transform: scale(1,1)    translateY(0); }
`
const Nav = styled.nav`
  position: fixed;
  top: 0;
  z-index: 100;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  max-height: 70px;
  padding: 10px 30px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
  > a > img {
    display: absolute;
    &:hover {
      animation: ${jump} 1s ease-in-out;
    }
  }
`
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > div {
    position: relative;
    display: flex;
    align-items: center;
    gap: 2px;
    background-color: rgb(10, 212, 250, 0.1);
    max-height: 40px;
    padding: 0px 12px;
    border-radius: 20px;
    cursor: pointer;

    &:hover ul {	
      opacity: 1;
    }

    > img {
      max-height: 22px;
      &:hover {
        animation: ${jump} 0.5s ease-in-out;
      } 
    }
    
  }
`

const Ul = styled.ul`
  position: absolute;
  left: 0;
  top: 80%;
  width: 100%;
  background-color: white;
  padding: .5rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
  transition: all 0.2s ease-in-out;
  opacity: 0;

  p {
    font-weight: 700;
    font-size: 14px;
    color: #FF7B00;
  }
  li{
      padding: .35rem;
      transition: all 0.1s ease-in-out;
    }
  li:hover {
    color: #0ad4fa;
  }
`


const Navbar = () => {

  const {data, setPoints, loading} = useContext(MyContext);
    
  useEffect(() => {
    AOS.init({
        duration: 1000
    })
  }, [])

  const addPoints = amount => {
    if(!loading) {
      setPoints(amount);
    }
  }

  return (
    <Nav>
      <Link
          data-aos="fade-down-right" to='/'
      >
        <img src={aerolabLogo} alt='Aerolab Logo'  />
      </Link>
      <User>
        <Link to="/history" className='nav-name'>{data.name}</Link>
        <div>
          <p>{data.points}</p>
          {!loading ? <img src={coin} /> : <Coin />}
          <Ul>
            <p>Add points:</p>
            <li onClick={ () => addPoints(1000)}>1000</li>
            <li onClick={ () => addPoints(5000)}>5000</li>
            <li onClick={ () => addPoints(7500)}>7500</li>
          </Ul>
        </div>
      </User>
    </Nav>
  )
}

export default Navbar