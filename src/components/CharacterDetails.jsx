import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import background from '../assets/photo1.jpg'

function CharacterDetails () {
    const {id} = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); //SHOW SPINNER INITIALLY

    useEffect (() => {
        const fetchCharacter = async () => {
            try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!res.ok) throw new Error('Failed to fetch character');
        const data = await res.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      };
      fetchCharacter();
        }, [id]
    );
    
    if (loading) {
        return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-green-400 mx-auto mb-4"></div>
          <p className="text-lg">Loading character details...</p>
        </div>
      </div>
    );
  }
   if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return ( //otherwise, if everything is ok and loaded
    <div className="min-h-screen  text-white p-6" style={{ backgroundImage: `url(${background})` }}></div>
    
  )
    }

  

export default CharacterDetails