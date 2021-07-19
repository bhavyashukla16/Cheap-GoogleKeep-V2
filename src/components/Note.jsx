import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function Note(props) {

  //const options = ['pin', 'edit', 'delete'];
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    props.onDelete(props.id)
    setAnchorEl(null);
  }

  const handleEdit = () => {
    props.onEdit(props.id)
    setAnchorEl(null);
  }

  const handlePin = () => {
    props.onPin(props.id)
    setAnchorEl(null);
  }

  return (
    <div className="note">
    <div className="dots-menu">
      <IconButton
          aria-label="more"
          aria-haspopup="true"
          onClick={handleClick}
      ><MoreVertIcon style={{color: "#989898"}}/>
      </IconButton>
        <Menu
          //id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: '12ch',
            },
          }}
        >
        { !props.pinned &&
        <MenuItem onClick={handlePin}>
          <i class="fas fa-thumbtack" style={{position:"relative", left: "3px", top: "3px", color: "#f5ba13"}}></i>
          <span style={{marginLeft: "14px", color: "#707070"}}> pin </span>
        </MenuItem>
        }
        <MenuItem onClick={handleEdit}>
          <EditIcon style={{color: "#f5ba13"}}/>
          <span style={{marginLeft: "6px", color: "#707070"}}>edit</span>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon style={{color: "#f5ba13"}}/>
          <span style={{marginLeft: "6px", color: "#707070"}}>delete</span>
        </MenuItem>
        </Menu>
      </div>
      { props.pinned &&
      <div 
      id="pin" 
      onClick={handlePin}
      dat-toggle="tooltip"
      dat-placement="top"
      title="Unpin note"
      style={{
        position: "relative", 
        left: "10px", 
        top: "1px",
        cursor: "pointer"
        }}>
        <i class="fas fa-thumbtack"></i>
      </div>
      }
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Note;
