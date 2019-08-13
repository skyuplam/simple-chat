import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { sendMessage } from '../store/messages/actions';

import DialogInputBox from '../components/DialogInputBox';


const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSend: (msg: string) => {
    dispatch(sendMessage(msg));
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(DialogInputBox);
