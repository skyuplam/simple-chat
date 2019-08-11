import { connect } from 'react-redux';
import Main from '../components/Main';
import { RootState } from 'typesafe-actions';
import { selectUserCount } from '../store/users/selectors';


const mapStateToProps = (state: RootState) => ({
  userCount: selectUserCount(state),
});

export default connect(
  mapStateToProps,
)(Main);
