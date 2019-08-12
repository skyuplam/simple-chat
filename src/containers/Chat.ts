import { connect } from 'react-redux';
import { RootState } from 'typesafe-actions';

import Chat from '../components/Chat';
import { selectOrderedMessages } from '../store/messages/selectors';


const mapStateToProps = (state: RootState) => ({
  messages: selectOrderedMessages(state),
});

export default connect(
  mapStateToProps,
)(Chat);

