import { createContext, useEffect, useState } from "react";

export const MyContext = createContext();


export const MyProvider = ({ children }) => {

        const [data, setData] = useState({})
        const [points, setPoints] = useState(null)
        const [pointsUpdate, setPointsUpdate] = useState(false)
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
    
        const getUser = async () => {
            setLoading(true);
            const response = await fetch('https://coding-challenge-api.aerolab.co/user/me', options);
            const res = await response.json();
            setData(res);
            setLoading(false);
        }
        getUser();
        }, [points, pointsUpdate])
  
        useEffect(() => {
        if( points !== null ) {
            let request = new XMLHttpRequest();
            
            request.open('POST', 'https://coding-challenge-api.aerolab.co/user/points');
    
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Accept', 'application/json');
            request.setRequestHeader('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmYyNGVjM2I1Zjc3MDAwMjE4ZGJiMmUiLCJpYXQiOjE2NjAwNDcwNDN9.uh40bC5Rdp5n_B5qTKqdPPXaVk9tIPVt8loxgBTi4oI');
    
            let body = {
            'amount': parseInt(`${points}`)
            };
    
            request.send(JSON.stringify(body));
            
        }
        setPoints(null)
    
        }, [points])

    return (
        <MyContext.Provider value={{
            data,
            setPoints,
            loading,
            pointsUpdate,
            setPointsUpdate
        }}>
            { children }
        </MyContext.Provider>
    );
}