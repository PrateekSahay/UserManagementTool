import React from 'react';
import Form, { FormProps } from '../Form/Form';
import Dialog from '@mui/material/Dialog';
import { DialogContent, DialogTitle, makeStyles } from '@material-ui/core';

export interface IModalProps {
  formProps: FormProps;
  isOpen: boolean;
  handleClose: (value: boolean) => void;
}

const useStyles = makeStyles({
  root: {
      padding: '0px 56px 56px 56px'
  },
  dialog: {
      minWidth: '720px',
      maxWidth: '720px'
  }
});

const ModalForm = (props: IModalProps) => {  
  const classes = useStyles()

  const updateDialog = (value: boolean) => props.handleClose(value);

  return (
    <div>
      <Dialog classes={{paperWidthMd: classes.dialog}} onClose={() => updateDialog(false)} open={props.isOpen} maxWidth='md'>                
                <DialogContent classes={{ root: classes.root }}>   
                    <Form {...props.formProps} />                    
                </DialogContent>   
      </Dialog>
    </div>
  );
}

export default ModalForm;
