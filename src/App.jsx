import { useState } from 'react'
import './App.css'

function App() {
  const [boxes, setBoxes] = useState([])
  const [content, setContent] = useState('')

  const createBox = () => {
    if (content.trim()) {
      const newBox = {
        id: Date.now(),
        content: content.trim()
      }
      setBoxes([...boxes, newBox])
      setContent('')
    }
  }

  const deleteBox = (id) => {
    setBoxes(boxes.filter(box => box.id !== id))
  }

  return (
    <div className="app">
      <h1>Box Creator</h1>
      
      <div className="input-section">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter box content..."
          onKeyPress={(e) => e.key === 'Enter' && createBox()}
        />
        <button onClick={createBox}>Create Box</button>
      </div>

      <div className="boxes-container">
        {boxes.map(box => (
          <div key={box.id} className="box">
            <p>{box.content}</p>
            <button 
              className="delete-btn"
              onClick={() => deleteBox(box.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
