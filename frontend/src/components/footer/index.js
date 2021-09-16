import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import GitHubIcon from '@material-ui/icons/GitHub';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    background: '#B0B0B0',
    right: 0,
    bottom: 0,
    left: 0,
    textAlign: "center",
  },
});

export default function Footer() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation data-testid = "BottomNavigationTest"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction href="https://paypal.me/Andyzlee?locale.x=en_AU" target="_blank" label="Donations" icon={<MonetizationOnIcon />} />
      <BottomNavigationAction href="https://github.com/herrickfeng/Software-Engineering-Studio-2B" target="_blank" label="Our project" icon={<GitHubIcon />} />
    </BottomNavigation>
  );
}