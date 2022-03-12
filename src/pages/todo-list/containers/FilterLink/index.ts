import { connect } from 'react-redux'
import { LinkComponent } from '../../index'
import { setVisibilityFilter } from '../../../../redux/actions'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    },
  }
}
const FilterLink = connect(mapStateToProps, mapDispatchToProps)(LinkComponent)
export default FilterLink
