import React, { Component } from 'react'

import Sort from 'react-search-sort'
import data from './users.json'
import Table from 'react-bootstrap-gtable'

export default class App extends Component {
  render () {
    const { users } = data
    return (
      <div>
        <Sort initialData={users}>
          {({ data, setSortBy, onSearchInput }) => (
            <div>
              <div className="form-group">
                <input
                  className="form-control"
                  name="search"
                  placeholder="search"
                  onChange={onSearchInput}
                />
              </div>
              <Table data={data} onThClick={setSortBy} />
            </div>
          )}
        </Sort>
      </div>
    )
  }
}
