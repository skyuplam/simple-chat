import React from 'react';
import { User } from 'SCModels';
import List from './List';
import ListItem from './ListItem';


interface Props {
  users: User[];
}
function Participants({
  users,
}: Props) {
  return (
    <div className="Participants">
      <List>
        {users.map(user => (
          <ListItem key={user.id}>
            {user.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Participants;
