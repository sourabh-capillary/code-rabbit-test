import { useState } from 'react'
import './App.css'

function App() {
  const [boxes, setBoxes] = useState([])
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

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

  const startEditing = (box) => {
    setEditingId(box.id)
    setEditContent(box.content)
  }

  const saveEdit = () => {
    if (editContent.trim()) {
      setBoxes(boxes.map(box => 
        box.id === editingId 
          ? { ...box, content: editContent.trim() }
          : box
      ))
      setEditingId(null)
      setEditContent('')
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent('')
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
            {editingId === box.id ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  onKeyDown={(e) => e.key === 'Escape' && cancelEdit()}
                  autoFocus
                />
                <div className="edit-buttons">
                  <button className="save-btn" onClick={saveEdit}>Save</button>
                  <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p onClick={() => startEditing(box)} className="editable-content">
                  {box.content}
                </p>
                <button 
                  className="edit-btn"
                  onClick={() => startEditing(box)}
                >
                  ✏️
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => deleteBox(box.id)}
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
