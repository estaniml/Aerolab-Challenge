import styled from 'styled-components';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterSquare, AiFillInstagram } from 'react-icons/ai'
import { DiReact } from 'react-icons/di'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Foot = styled.div`
  background: linear-gradient(45deg, #6EE8FF,#2d98e0);
  color:#fff;
  padding:20px;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);

  > div {
    @media (min-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    > a {
      display: flex;
      align-items: center;
      margin-bottom: 0;
      gap: 12px;

      @media (min-width: 768px) {
        margin-bottom: 16px;
      }

      > p {
        font-size: 1.8rem;
        font-weight: 800;
        color: #fff;
      }

      > span {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.125rem;
        transition: all 0.3s ease-in-out;
        color: #fff;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    > ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
      font-size: 1.5rem;
      color: #fff;
      list-style: none;

      @media (min-width: 768px) {
        width: 20%
      }

    }

  }
  
  > hr {
    margin: 24px 0;
    border-style: solid;

    @media (min-width: 768px) {
      margin: 0 auto;
    }

    @media (min-width: 1024px) {
      margin: 32px 0;
    }
  }

  > span {
    display: block;
    font-size: 0.875rem;
    color: #e9e7e7;

    @media (min-width: 768px) {
      text-align: center;
    }
    > a {
      color: #fff;
    }

    > a:hover {
      text-decoration: underline;
    }
  }

`

const Footer = () => {

  useEffect(() => {
    AOS.init({
        duration: 1000
    })
  }, [])

  return (  
        
    <Foot>
        <div>
            <a target='_blank' href="https://github.com/estaniml" data-aos="fade-right">
                <p>Estanislao Martinez Lacabe</p>
                <span><DiReact />React Developer </span>
            </a>
            <ul data-aos="fade-top">
                <li>
                    <a target='_blank' href="https://github.com/estaniml">
                        <AiFillGithub className='transition' />
                    </a>
                </li>
                <li>
                    <a target='_blank' href="/">
                        <AiFillLinkedin className='transition' />
                    </a>
                </li>
                <li>
                    <a target='_blank' href="/">
                        <AiFillTwitterSquare className='transition ease-in-out duration-300 hover:scale-150' />
                    </a>
                </li>
                <li>
                    <a target='_blank' href="https://www.instagram.com/estaniml">
                        <AiFillInstagram className='transition' />
                    </a>
                </li>
            </ul>
        </div>

        <hr />
        <span> 2022 <a href="https://github.com/goncy/aerolab-challenge">AEROLAB CHALLENGE</a>
        </span>
    </Foot>
  )
}

export default Footer