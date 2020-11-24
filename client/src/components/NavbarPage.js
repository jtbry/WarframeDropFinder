import React from 'react';
import ItemSearchBar from './ItemSearchBar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    maxHeight: '2rem',
    backgroundColor: '#FFFFFF',
    padding: '1rem',
  }
}));

export default function Navbar(props) {
  const classes = useStyles();
  // todo: branding / navigation buttons
  return (
    <>
      <div className={classes.root}>
        <ItemSearchBar isNavbar />
      </div>
      <div style={{paddingTop: '4rem'}}>
        {props.children}
      </div>
    </>
  );
}