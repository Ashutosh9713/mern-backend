
import './App.css'
import { useEffect, useState } from "react"
import axios from "axios"

function App() {

  // state variables
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  // Fetch data from the db
  function FetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
        // jab bhi aap ek state variabkle ko change kr rhe ho to uska component ess case me app component rerender hoga 
      })
      .catch((err) => {
        console.log(`error is shown while connecting with backend : ${err}`)
      })
  }

  useEffect(() => {
    FetchNotes();
  }, [])


  function handlesubmit(e) {
    // prevent default behavior like page reload on submmit
    e.preventDefault()
    if (isEditing) {
      // for update 

      const { title, description } = e.target.elements;
      console.log(title.value, description.value);

      axios.patch(`http://localhost:3000/api/notes/${currentNoteId}`, {
        title: title.value,
        description: description.value,
      }).then((res) => {
        console.log(res.data)
        FetchNotes();
        title.value = '';
        description.value = '';
        setIsEditing(false);
      })
    } else {
      // for create

      const { title, description } = e.target.elements;
      console.log(title.value, description.value);

      // axios se post method mara ja rha hai url pe comma ke bad body me jaise value pass krte the wo value
      axios.post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value
      }).then((res) => {
        console.log(res.data)
        FetchNotes();
        title.value = '';
        description.value = '';

      })

    }

  }

  function handleDelete(id) {
    console.log(id)
    axios.delete(`http://localhost:3000/api/notes/${id}`)
      .then((res) => {
        console.log(res.data)
        FetchNotes();
      })
  }

  function handleEdit(note) {


    setIsEditing(true);
    setCurrentNoteId(note._id);
  }

  return (
    <>
      <form onSubmit={handlesubmit} className='note-create-form'>
        <input className='input-title' name="title" type="text" placeholder='Enter title' />
        <input className='description-title' name="description" type="text" placeholder='Enter description  ' />
        <button>{isEditing ? "Update Note" : "Add Note"}</button>
      </form>
      <div className="notes">
        {/* single note without map function */}
        {/* <div className='note'>
          <h1>title</h1>a
          <p>description</p>
         </div>   */}
        {notes.map(note => {
          return <div key={note._id} className='note'>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <div className='buttons'>
              <button onClick={() => {
                handleDelete(note._id)
              }}>Delete</button>
              <button onClick={() => {
                handleEdit(note)
              }}>edit</button>
            </div>
          </div>
        })}

      </div>

    </>
  )
}

export default App
