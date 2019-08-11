import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from 'typesafe-actions';
import { Credential } from 'SCModels';
import Login from '../components/Login';
import {
  selectAuthorized, selectLoading, selectAuthError,
} from '../store/auth/selectors';
import { createSession } from '../store/auth/actions';


const mapStateToProps = (state: RootState) => ({
  isAuthorized: selectAuthorized(state),
  isLoading: selectLoading(state),
  error: selectAuthError(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  postSession: (credential: Credential) => {
    dispatch(createSession.request(credential));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
