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

`

const ProductsTab = ({products, setProducts, order, setOrder, currentPage, setCurrentPage, recents}) => {

    useEffect(() => {
        switch (order) {
            case 'HIGH':
                const high = [...products].sort((a, b) => b.cost - a.cost);
                setProducts(high); 
                setCurrentPage(0);
                break;
            case 'LOW':
                const low = [...products].sort((a, b) => a.cost - b.cost);
                setProducts(low);
                setCurrentPage(0);
                break;
            case 'RECENT':
                setProducts(recents);
                setCurrentPage(0);
                break;
            default:
                break;
        }
    }, [order]);

  return (
    <Tab>
        <p>{currentPage + 16} of {products.length} products</p>
        <span>Sort by:</span>
        <button onClick={() => setOrder('HIGH')} className={ order === 'HIGH' ? 'default active' : 'default' }>Highest price</button>
        <button onClick={() => setOrder('LOW')} className={ order === 'LOW' ? 'default active' : 'default' }>Lowest price</button>
        <button onClick={() => setOrder('RECENT')} className={ order === 'RECENT' ? 'default active' : 'default' }>Most recent</button>
    </Tab>
  )
}

export default ProductsTab