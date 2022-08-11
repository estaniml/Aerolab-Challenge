import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import styled from 'styled-components';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Spinner from '../components/spinners/Spinner';
import coin from '../assets/icons/coin.svg'
import { GrLinkPrevious } from 'react-icons/gr';

const Container = styled.div`
    width: 80%;
    margin: 120px auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > a {
        display:flex;
        align-items: center;
        gap:4px;
    }
`

const Card = styled.div`
    margin-bottom: 50px;
    width: 100%;
    padding: 15px 20px;
    box-shadow: 0px 2px 10px rgba(0,0,0,0.1);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    @media (min-width: 768px) {
        flex-direction: row;
        width: 80%;
        gap: 40px;
        padding: 15px 40px;
        align-items: center;
    }
`

const CardImg = styled.img`
    max-width: 120px;
    max-height: 120px;
    border-radius: 100%;
    border: 5px solid black;
    cursor: pointer;
`

const CardDescription = styled.div`
    h2 {
        font-size: 1.8rem;
        font-weight: 500;
        background: -webkit-linear-gradient(#0ad4fa, #7de9fa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
    p {
        display:flex;
        align-items: center;
        font-size: 1.2rem;
        color: #818181;

        > img {
            margin-left: 10px;
            font-size: 1rem;
        }
    }
`

const Grid = styled.div`
    display: grid;
    gap: 20px;
    margin: 40px 0;
    max-width: 100%;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-auto-rows: minmax(200px, auto);
`

const CardItem = styled.div`
    position: relative;
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

const ItemImage = styled.div`
    width: 100%;
    max-height: 200px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    > img {
        height: 100%;
    }
`

const ItemDescription = styled.div`
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
    > p {
        display:flex;
        align-items: center;
        gap: 4px;
    }
    
`

const Profile = () => {

    const { data } = useContext(MyContext)

    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                contentType: 'application/json',
                accept: 'application/json',
                authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyNGVjM2I1Zjc3MDAwMjE4ZGJiMmUiLCJpYXQiOjE2NjAwNDcwNDN9.uh40bC5Rdp5n_B5qTKqdPPXaVk9tIPVt8loxgBTi4oI'
            }
        }
    
        const getItems = async () => {
            setLoading(true);
            const response = await fetch('https://coding-challenge-api.aerolab.co/user/history', options);
            const data = await response.json();
            setItems(data);
            setLoading(false);
        }
        getItems();

    }, [])
    
    useEffect(() => {
        AOS.init({
            duration: 1000
        })
    }, [])

  return (
    <Container>
        
        <Card data-aos="fade-right">
            <CardImg src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />
            <CardDescription>
                <h2>{data.name}</h2>
                <p>Amount of points: {data.points} <img src={coin} /> </p>
            </CardDescription>
        </Card>
        
        <h1>Redeem History</h1>
        
        
        <Grid>
        {loading ? <Spinner /> : items.length > 0 ? items.map(item => (
            <CardItem key={item._id} data-aos="fade-up">
                <ItemImage>
                    <img src={item.img.url} />
                </ItemImage>
                <ItemDescription>
                    <h4>{item.category}</h4>
                    <h3>{item.name}</h3>
                    <p>{item.cost} <img src={coin} style={{height: '20px', marginTop: '3px'}}/></p>
                    
                </ItemDescription>
            </CardItem>
        )) : <h1>No items found</h1>} 
        </Grid>
        <Link to="/"><GrLinkPrevious/> Return</Link>
    </Container>
  )
}

export default Profile