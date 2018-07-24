import { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class SearchAndSortArray extends PureComponent {
  propTypes = {
    initialData: PropTypes.array,
    children: PropTypes.func.isRequired
  }
  static defaultProps = {
    initialData: []
  };
  state = {
    data: [...this.props.initialData],
    search: '',
    sortBy: '',
    asc: true
  };

  sortFn(name, asc) {
    return (a, b) => (asc ? a[name] > b[name] : a[name] < b[name])
  }

  setSortBy = (name = '') => {
    const { initialData } = this.props
    this.setState(s => ({
      ...s,
      sortBy: name,
      asc: s.sortBy === name ? !s.asc : s.asc,
      data: initialData.sort(
        this.sortFn(name, s.sortBy === name ? !s.asc : s.asc)
      )
    }))
  };

  onSearch = (value = '') => {
    const { initialData } = this.props
    const { keys } = Object
    this.setState(s => ({
      ...s,
      search: value,
      data: initialData.filter(
        item =>
          keys(item).filter(
            k => `${item[k]}`.toLowerCase().indexOf(value) !== -1
          ).length
      )
    }))
  };

  onSearchInput = ({ target = {} } = {}) => {
    const value = target.value || ''
    return this.onSearch(value)
  }

  removeSearch = () => {
    const { initialData } = this.props
    this.setState({
      data: [...initialData]
    })
  };

  getProps() {
    return {
      data: this.state.data,
      setSortBy: this.setSortBy,
      onSearch: this.onSearch,
      removeSearch: this.removeSearch,
      onSearchInput: this.onSearchInput
    }
  }

  render() {
    return this.props.children(this.getProps())
  }
}
