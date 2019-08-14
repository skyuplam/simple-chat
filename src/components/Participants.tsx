import React from 'react';
import { isEmpty } from 'lodash';
import { User } from 'SCModels';
import List from './List';
import ListItem from './ListItem';
import Loading from './Loading';
import './Participants.css';


interface Props {
  users: User[];
}
function Participants({
  users,
}: Props) {
  return (
    <div className="Participants">
      {isEmpty(users) ? (
        <div className="ParticipantsLoadingContainer">
          <Loading isLoading={true} className="ParticipantsLoading" />
        </div>
      ) : (
        <List>
          {users.map(user => (
            <ListItem key={user.id}>
              {user.name}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export default Participants;
