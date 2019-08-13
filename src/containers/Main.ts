import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Main from '../components/Main';
import { RootState } from 'typesafe-actions';
import { selectUserCount } from '../store/users/selectors';
import { loadCookie } from '../store/auth/actions';


const mapStateToProps = (state: RootState) => ({
  userCount: selectUserCount(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadCookie: () => {
    dispatch(loadCookie.request());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
