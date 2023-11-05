import React,{useContext,useState} from "react";
import NoteContext from "../context/noteContext";

const AddNote = (props) => {

    const noteIntial = useContext(NoteContext);

  const { addNote} = noteIntial;

  const [note, setNote] = useState({title: "",description: "", tag: "" })

    const handleclick = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "",description: "", tag: "" })
        props.showAlert("Note Added successfully", "success");
    }

    const onchange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }

  return (
    <div className="container mt-3">
      <h2>Enter your notes</h2>
      <form>
        <div className="form-group my-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            onChange={onchange}
            value={note.title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            onChange={onchange}
            value={note.description}
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="description">Tag</label>
          <input
            type="text"
            className="form-control "
            id="tag"
            name="tag"
            placeholder="Enter Tag"
            onChange={onchange}
            value={note.tag}
          />
        </div>        
        <button type="submit" className="btn btn-primary my-3" onClick={handleclick} disabled={note.title.length <5 || note.description.length <5}  >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
