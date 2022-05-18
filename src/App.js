import React, { useEffect, useState } from 'react'
import './styles/App.css';

export default function App() {
  const [equipos, setequipos] = useState([])

  const getInfo = async () => {
    const data = [];
    try {
      const respuesta = await fetch("https://www.thesportsdb.com/api/v1/json/2/all_sports.php");
      const deportes = await respuesta.json()
      for (let i = 0; i < deportes.sports.length; i++) {
        data.push(deportes.sports[i].strSport)
      }
      setequipos(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getInfo()
  }, [])


  return (
    <div className='principal container mt-5'>
      <h1>Lista de Regalos</h1>
      <div className="contenido col-12 d-lg-flex mt-5 pb-5">
        {
          equipos.map((item, index) => {
            return (
              <Tarjeta key={index} titulo={item} descripcion={`Lista de regalos para el grupo ${item}`} tag1="Deportes de riezgo" tag2="Libros" />
            )
          })
        }
      </div>
    </div>
  )
}
const Tarjeta = (props) => {
  const { titulo, descripcion, tag1, tag2 } = props
  return (
    <div className="card mx-auto my-3 col-10 col-lg-4 m-lg-2">
      <div className="headerCard p-3">
      <h5 className="card-title fw-bold">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
      </div>
      <div className="card-body">
        <div className="bottomCard d-flex align-items-end">
          <button className="card-button me-3 fw-lighter">{tag1}</button>
          <button className="card-button fw-lighter">{tag2}</button>
        </div>
      </div>
    </div>
  )
}