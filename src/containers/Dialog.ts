import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Message } from 'SCModels';

import Dialog from '../components/Dialog';
import { sendEditedMessage } from '../store/messages/actions';


const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendEditedMsg: (msg: Message) => {
    dispatch(sendEditedMessage(msg));
  }
});

export default connect(
  undefined,
  mapDispatchToProps,
)(Dialog);
