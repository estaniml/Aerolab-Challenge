import { useContext, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import buyBlue from '../assets/icons/buy-blue.png'
import buyWhite from '../assets/icons/buy-white.png'
import coin from '../assets/icons/coin.svg'
import { MyContext } from '../context/MyContext';

const Card = styled.div`
    position: relative;
    min-height: 322px;
    width: 100%;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover span{
        top: 0;
    }
`

const CardHover = styled.span`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(10, 210, 250, 0.8);
    top: 100%;
    transition: all .5s cubic-bezier(.6,.4,0,1);

    > div {
        display: flex;
        align-items: center;
        gap: 10px;
    } 
    
    div > span {
        font-size: 28px;
        margin: 20px auto;
        color: #fff;
        font-weight: 400;
    }

    div > img {
        margin-top: 6px;
    }

    button {
        font-size: 18px;
        border: none;
        padding: 15px 40px;
        border-radius: 40px;
        width: 80%;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        background-color: #fff;
        color: #0ad4fa;

        &:hover{
            transform: scale(1.05)
        }
    }
`

const Image = styled.div`
    width: 100%;
    max-height: 200px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    > img {
        height: 100%;
    }
`

const CardDescription = styled.div`
    padding-top: 20px;
    border-top: 1px solid #ccc;

    > h4 {
        font-size: 18px;
        color: #b8b7b7;
        font-weight: 400;
        margin: 0;
    }
    > h3 {
        font-size: 20px;
        font-weight: 400;
        margin: 0;
    }

     > span {
        display: flex;

        @media (min-width: 1024px) {
            display: none;
        }
    }
`

const BuyIcon = styled.img`
    width: 42px;
    border-radius: 50%;
    position: absolute;
    right: 5%;
    z-index: 20;
`

const Needed = styled.div`
    display: flex;
    align-items: center;
    gap: 3px;
    border-radius: 10px;
    padding: 4px;
    position: absolute;
    right: 5%;
    z-index: 20;
    font-size: 14px;
    background-color: rgba(0,0,0,0.4);
    color: #fff;

    img {
        width: 20px;
        margin-top: 3px;
    }
`


const Product = ({product}) => {

    const { data, setPointsUpdate, pointsUpdate } = useContext(MyContext)

    const icon = useRef(null)

    let navigate = useNavigate(null)

    const { category, cost, img, name, _id } = product

    const changeIcon = () => {
        if(difference) {
            icon.current.src = buyWhite
            return
        }
    }

    const changeIconBack = () => {
        if(difference) {
            icon.current.src = buyBlue
            return
        }
    }

    const redeemItem = id => {
        let request = new XMLHttpRequest();

        request.open('POST', 'https://coding-challenge-api.aerolab.co/redeem');
        
        request.setRequestHeader('Content-Type', 'application/json');
        request.setRequestHeader('Accept', 'application/json');
        request.setRequestHeader('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyNGVjM2I1Zjc3MDAwMjE4ZGJiMmUiLCJpYXQiOjE2NjAwNDcwNDN9.uh40bC5Rdp5n_B5qTKqdPPXaVk9tIPVt8loxgBTi4oI');

        let body = {
          'productId': `${id}`
        };
        
        request.send(JSON.stringify(body));
        setPointsUpdate(!pointsUpdate)

        navigate('/history')
    }

    const difference = data.points >= cost;

  return (
    <Card 
        onMouseEnter={changeIcon} 
        onMouseLeave={changeIconBack}
    >
        <Image>
            <img src={img.url} />
        </Image>
        <CardDescription>
            <h4>{category}</h4>
            <h3>{name}</h3>
            <span>Price: {cost}</span>
        </CardDescription>

        
        { difference ? 
            <BuyIcon ref={icon} src={buyBlue} onClick={ () => redeemItem(_id)} /> 
            : 
            <Needed>You need {cost - data.points} <img src={coin} /></Needed>
        }

        <CardHover>
            <div>
                <span>{cost}</span>
                <img src={coin} />
            </div>
            { difference && 
                <button onClick={ () => redeemItem(_id)}>Redeem now</button> 
            }
        </CardHover>
    </Card>
  )
}

export default Product