import { useEffect, useState } from 'react'
import { data } from './data'
import './App.css'

function App() {
  const [sound, setSound] = useState("")
  const [volume, setVolume] = useState("")
  const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"]

  useEffect( () => {
      document.addEventListener("keydown", (e) => {
        if( validKeys.includes(e.key.toUpperCase()) ) {
          padClick(e.key.toUpperCase())
        }
      })
    }
    ,[])

  const padClick = (selector) => {
      document.getElementById(selector).play()
  }

  const changeSound = (e) => {
    let audios = document.getElementsByTagName("audio")
    for(let audio of audios){
      audio.volume = e.target.value
    }
    setSound("Volume " + (Math.floor(e.target.value * 100)) + "%")
  }

  return (
    <>
     <div id="drum-machine">
      <div className="pads-container">
      {
        data.map( (item) => {
          return (
            <div className='drum-pad' 
                id={item.sound}
                key={item.name}
                onClick={() => {
                  setSound(item.sound)
                  padClick(item.name)
                }}
            >
              <span>{item.name}</span>
              <audio className='clip' id={item.name} src={item.file} volume={volume}>
              </audio>
            </div>
          )
        })
      }
      </div>
      <div className="displays-container">
      <div id="display">
        {sound}
      </div>
      <div className="controls">
        <input max="1" min="0" step="0.01" type="range" defaultValue="0.52" onChange={changeSound} />
      </div>
      </div>
     </div>
    </>
  )
}

export default App
