import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Main from '../components/Main';
import { startMessageStream } from '../store/messages/actions';
import { User } from 'SCModels';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startStream: (user: User) => {
    dispatch(startMessageStream(user));
  },
});

export default connect(
  undefined,
  mapDispatchToProps,
)(Main);
