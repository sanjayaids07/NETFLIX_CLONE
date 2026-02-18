import React, { useEffect, useState } from 'react'
import '../styles/Player.css'
import back_arrow_icon from '../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODQ2YmJlNTcxODMxNjg1NWIyZTU1NzEzZDM1NzNmMSIsIm5iZiI6MTc3MTIzNzMyOS45NjUsInN1YiI6IjY5OTJlZmQxOTdmODczYTYwOTA2NTc3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1pkRb_X3L3SfhPLdsthPddrMT8ykwKa7RbhrfXGzpdM'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0])
        }
      })
      .catch(err => console.error(err))
  }, [id])

  return (
    <div className='player'>
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => navigate(-1)}
      />

      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1&origin=http://localhost:5173`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <p>Trailer not available</p>
      )}

      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player