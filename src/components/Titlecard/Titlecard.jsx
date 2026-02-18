import React, { useEffect, useRef, useState } from 'react'
import './Titlecard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'

const Titlecard = ({ title, category }) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef(null)
  

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODQ2YmJlNTcxODMxNjg1NWIyZTU1NzEzZDM1NzNmMSIsIm5iZiI6MTc3MTIzNzMyOS45NjUsInN1YiI6IjY5OTJlZmQxOTdmODczYTYwOTA2NTc3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1pkRb_X3L3SfhPLdsthPddrMT8ykwKa7RbhrfXGzpdM'
  }
};



  useEffect(() => {
   fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err))
  }, [])


  return (
    <div className='title-card'>
      <h2>{title ? title : "Popular on Netflix"}</h2>

      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Titlecard
