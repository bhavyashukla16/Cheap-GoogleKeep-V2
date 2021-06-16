import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';

function Note(props) {

  const handleDelete = () => {
    props.onDelete(props.id)
  }

  const handleEdit = () => {
    props.onEdit(props.id)
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p id="button" onClick={handleDelete}>
        <DeleteIcon />
      </p>
      <p id="button" onClick={handleEdit} >
        <EditIcon />
      </p>
    </div>
  );
}

export default Note;
