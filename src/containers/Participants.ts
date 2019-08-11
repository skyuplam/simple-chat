import { connect } from 'react-redux';

import { RootState } from 'typesafe-actions';
import Participants from '../components/Participants';
import { selectOnlineUsers } from '../store/users/selectors';


const mapStateToProps = (state: RootState) => ({
  users: selectOnlineUsers(state),
});

export default connect(
  mapStateToProps,
)(Participants);
