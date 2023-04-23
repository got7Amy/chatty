import { useState,useEffect } from "react";
import gitpage from '../api/gitpage';

export default () => {
    const [idea,setIdea]=useState('');
    const [errorMessage,setErrorMessage]=useState('');

    const thoughtApi = async () => {
        try {
            const response = await gitpage.get('/thoughts.json');
            const randomIndex = Math.floor(Math.random()*(response.data.thoughts.length));
            setIdea(response.data.thoughts[randomIndex].content);
        } catch (err) {
            setErrorMessage(err);
        }
    };

    useEffect(()=>{
        thoughtApi()
    }, []);

    return [idea,errorMessage];
}