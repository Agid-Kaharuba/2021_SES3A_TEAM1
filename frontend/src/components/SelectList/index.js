import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

export const SelectList = (props) => {
  const { listOptions, updateSelected, selected } = props;
  
  const update = (key) => {
    updateSelected(key);
  }

  return (
    <List>
      {listOptions && (
        listOptions.map(option =>
          <ListItem button key={option.key} selected={selected === option.key} onClick={() => update(option.key)}>
            <ListItemText primary={option.label} />
            {/* {selected === option.key && (
              <ListItemIcon>
                <ArrowRight />
              </ListItemIcon>
            )} */}
          </ListItem>
        )
      )}
    </List>
  );
};

export default SelectList;