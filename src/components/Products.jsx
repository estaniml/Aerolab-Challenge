import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';
import Product from './Product';
import Spinner from './spinners/Spinner';
import { useRef } from 'react';
import ProductsTab from './ProductsTab';

const Container = styled.div`
    width: 80%;
    margin: 60px auto;
    min-height: 1640px;
`

const Grid = styled.div`
    display: grid;
    gap: 20px;
    margin-top: 40px;
    max-width: 100%;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      grid-auto-rows: minmax(200px, auto);
`

const Pages = styled.div`
    margin: 60px auto;
    display: flex;
    justify-content: center;
    gap: 10px;

    > div {
        width: 100px;
    
        > button {
            font-size: 14px;
            background-color: rgb(10, 212, 250,0.1);
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;

            &:hover{
                background-color: #0ad4fa;
            }
        }
    }
`

const Products = () => {
    

    const [products, setProducts] = useState([])
    const [recents, setRecents] = useState([])
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                contentType: 'application/json',
                accept: 'application/json',
                authorization: `${import.meta.env.VITE_APP_AEROLAB}`
            }
        }
    
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://coding-challenge-api.aerolab.co/products', options);
            const data = await response.json();
            setRecents(data)
            setProducts(data)
            setLoading(false);
        }
        getProducts();
    }, [])



    const top = useRef()

    const pagination = () => {
        const updatedProducts = [...products].slice(currentPage, currentPage + 16);
        return updatedProducts
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 16)
        top.current.scrollIntoView()
    }

    const prevPage = () => {
        if(currentPage > 0)
            setCurrentPage(currentPage - 16)
            top.current.scrollIntoView()
    }

  return (
    <Container ref={top}>
        <ProductsTab 
            order={order}
            setOrder={setOrder}
            currentPage={currentPage}
            products={products}
            setProducts={setProducts}
            recents={recents}
        />
        { loading ? <Spinner /> :
            <>
                <Grid>  
                    { pagination().map(product => (
                        <Product 
                            key={product._id} 
                            product={product} 
                        />
                    ))}
                </Grid>
                <Pages>
                    <div>
                        { currentPage > 0 &&
                            <button onClick={prevPage}><GrLinkPrevious />
                            </button> 
                        }
                    </div>  
                    <div>
                        { currentPage < 16 &&
                        <button onClick={nextPage}><GrLinkNext />
                        </button>}
                    </div>  
                </Pages>
                
             </>
        }
    </Container>
  )
}

export default Products