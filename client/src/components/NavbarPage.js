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
  // todo: fix overflow without hiding search results
  // currently: scroll bar appears when we don't need one
  return (
    <>
      <div className={classes.root}>
        <ItemSearchBar isNavbar />
      </div>
      <div style={{paddingTop: '4rem', paddingBottom: '1rem'}}>
        {props.children}
      </div>
    </>
  );
}