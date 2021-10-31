import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Table } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";
const styles = {
  border: '1px solid rgba(0, 0, 0, 0.05)', 
};
export const SelectList = (props) => {
  const { listOptions, updateSelected, selected } = props;
  
  const update = (key) => {
    updateSelected(key);
  }

  return (
    <Table style={styles}>
      <thead>
        <tr>
          <th>User</th>
          <th>Task</th>
        </tr>
      </thead>
        <List>
          {listOptions && (
            listOptions.map(option =>
              <ListItem style={styles} button key={option.key} selected={selected === option.key} onClick={() => update(option.key)}>
                <ListItemText primary={option.label} />
              </ListItem>
            )
          )}
        </List>
    </Table>
  );
};

export default SelectList;