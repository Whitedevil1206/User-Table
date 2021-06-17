import React, { useEffect, useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

const AddUserDialog = ({ addUserHandler, totalRows }) => {
  let initialUser = {
    idx: '',
    name: '',
    phone: '',
    email: '',
    hobbies: '',
  };

  const [user, setUser] = useState(
    React.useMemo(() => initialUser, [totalRows])
  );
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    name: '',
    phone: '',
    email: '',
  });

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = (name) => (event) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const handleAdd = (event) => {
    if (!handleValidation()) {
      return;
    }
    addUserHandler({ ...user, ['idx']: totalRows.length + 1 });
    let tempUser = {
      idx: '',
      name: '',
      phone: '',
      email: '',
      hobbies: '',
    };
    setUser(tempUser);
    console.log(initialUser);
    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange =
    (name) =>
    ({ target: { value } }) => {
      setUser({ ...user, [name]: value });
    };

  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    return false;
  }

  const flag = React.useRef(0);

  const handleValidation = () => {
    flag.current = 0;
    let createError = {
      name: '',
      phone: '',
      email: '',
    };
    if (user.name.length < 3 || user.name.length > 25) {
      createError.name = 'Length should be between 3 and 25';
      flag.current = 1;
    }
    if (user.phone.length !== 10) {
      createError.phone = 'Length should be 10';
      flag.current = 1;
    }
    if (!ValidateEmail(user.email)) {
      createError.email = 'Not a valid Email';
      flag.current = 1;
    }

    if (flag.current === 1) {
      setError(createError);
      return false;
    } else {
      setError(createError);
      return true;
    }
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Add row to table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={user.name}
            onChange={handleChange('name')}
            helperText={error.name}
          />
          <TextField
            margin="dense"
            label="Phone Number"
            type="number"
            fullWidth
            value={user.phone}
            onChange={handleChange('phone')}
            helperText={error.phone}
          />
          <TextField
            margin="dense"
            label="Email"
            type="text"
            fullWidth
            value={user.email}
            onChange={handleChange('email')}
            helperText={error.email}
          />
          <TextField
            margin="dense"
            label="Hobbies"
            type="text"
            fullWidth
            value={user.hobbies}
            onChange={handleChange('hobbies')}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
};

export default AddUserDialog;
