import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Note from "./components/Note";
import Axios from './helpers/fetchClient'
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import EditIcon from '@material-ui/icons/Edit';
import AttachFileIcon from '@material-ui/icons/AttachFile';
var Loader = require('react-loader');

function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true)
  const [Id, setId] = useState(0) //id!=0 means users wants to edit

  useEffect(() => {
    setLoading(false);
    Axios.get('/')
    .then((response) => {
      if(response.data.success === 0) {
        window.alert(response.data.message)
      } else {
      setNotes(response.data.notes)
      console.log(response.data.notes)
      //console.log(notes)
      }
    })
    .catch((err) => console.log(err) )
    .finally(() => setLoading(true))
  },[])

  const handleChange = (e) => (
    setNote({
      ...note,
      [e.target.name]: e.target.value
    })
  )

  const submitNote = (e) => {
    e.preventDefault();
    if(note.title==='' && note.content==='') {
    return window.alert("Both fields cannot be empty!")
    }
    setLoading(false);
    Axios.post('/', note)
    .then((response) => {
      setNotes([...notes, note])
      console.log(response.data.message)
    })
    .catch(err => console.log(err))
    .finally(() => 
    setLoading(true), 
    setNote({
      title: "",
      content: ""
    }) )
  }

  const deleteNote = (id) => {
    setLoading(false);
    Axios.delete(`/${id}`, {params: id})
    .then((response) => {
      console.log(response.data.message)
      setNotes(notes.filter(note => note._id !== id))
    })
    .catch((err) => console.log(err))
    .finally(() => setLoading(true))
  }

  const editNote = (id) => {
    var noteToBeEdited = notes.filter(note => note._id===id)
    //console.log(noteToBeEdited)
    setNote({
      title: noteToBeEdited[0].title,
      content: noteToBeEdited[0].content
    })
    setIsExpanded(true)
    setId(id)
    }

  const submitEditedNote = () => {
    setLoading(false);
    Axios.put(`/${Id}`, note, { params: Id})
    .then((response) => {
      const restOfNotes = notes.filter(note => note._id!==Id)
      setNotes([...restOfNotes, note])
      console.log(response.data.message)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setId(0)
      setNote({
        title: "",
        content: ""
      })
      setLoading(true)
    })
  }

  return (
    <div>
      <Header />
      <Loader loaded={loading} width={12} length={40} radius={25} color='#505050'/>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
            autoComplete="off"
          />
        )}
        <textarea
          name="content"
          onClick={() => setIsExpanded(true)}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
        />
        <Zoom in={isExpanded}>
        { Id!==0 ? 
          <Fab onClick={submitEditedNote}>
            <EditIcon />
          </Fab>
          :
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        }
        </Zoom>
      </form>
      <div className="note">
        <h1>Hello there!</h1>
        <p>No nasty typing here mate</p>
        <p id="pin">
          <AttachFileIcon />
        </p>
      </div>
      {notes.map((noteItem) => (
        <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
      ))}
    </div>
  );
}

export default App;
