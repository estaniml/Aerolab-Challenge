import { useEffect } from 'react'
import styled from 'styled-components';

const Tab = styled.div`
    > p{
        line-height: 0;
    }
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    display: flex;
    align-items: center;
    gap: 40px;
    padding-bottom: 10px;
    margin-top: 100px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e3e3e3;

    > span,button{
        color: #b8b8b8;
    }

    > button{
        font-size: 14px;
        background-color: rgb(10, 212, 250,0.1);
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &:hover{
            transform: scale(1.1);
        }

        &:active,:focus{
            background-color: #0ad4fa;
            color:#fff;
        }
    }
`

const ProductsTab = ({products, setProducts, order, setOrder, currentPage, recents}) => {

    useEffect(() => {
        switch (order) {
            case 'RECENT':
                setProducts(recents);
                break;
            case 'HIGH':
                const high = [...products].sort((a, b) => b.cost - a.cost);
                setProducts(high); 
                break;
            case 'LOW':
                const low = [...products].sort((a, b) => a.cost - b.cost);
                setProducts(low);
                break;
            default:
                break;
        }
    }, [order]);

  return (
    <Tab>
        <p>{currentPage + 16} of {products.length} products</p>
        <span>Sort by:</span>
        <button onClick={() => setOrder('HIGH')}>Highest price</button>
        <button onClick={() => setOrder('LOW')}>Lowest price</button>
        <button onClick={() => setOrder('RECENT')}>Most recent</button>
    </Tab>
  )
}

export default ProductsTab