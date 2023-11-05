import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>
{   
    const host = "http://localhost:5000"
    const fetchvalues= []
    const [notes, setNotes] = useState(fetchvalues)

      //Get all notes
    const getNotes = async () => {
      // API Call 
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        }
      });
      const json = await response.json()
      setNotes(json)
    }

    //Add note
    const addNote = async (title,description,tag) =>{

      //Api Call

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json = await response.json()
      setNotes(notes.concat(json))
    }

    //Delete Note
    const deleteNote = async (id) =>{
      // Api call
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
      })
      const json = await response.json();

      const newNotes = notes.filter((note)=>{return note._id !==id})
      setNotes(newNotes)
    }

    //Edit Note
    const editNote = async (id,title,description,tag) =>{

      // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token' : localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes));

    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break
      }
    }
    setNotes(newNotes)
    }


    return(
        <NoteContext.Provider value={{notes,addNote, deleteNote, editNote,getNotes}}>
                {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;