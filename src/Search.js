import React from "react";
import PropTypes from "prop-types";

import "./Search.css";
import searchicon from "./search.png";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  handleSearchInput = (e) => {
    this.setState(
      {
        query: e.target.value,
      },
      () => {
        this.props.filterList(this.state.query);
      }
    );
  };

  render() {
    return (
      <div className="search-bar">
        <div className="icon-wrapper">
          <img src={searchicon} className="search-icon" alt="search"></img>
        </div>
        <input
          type="search"
          name="search task"
          className="search-task"
          placeholder="search"
          value={this.state.query}
          onChange={this.handleSearchInput}
        ></input>
      </div>
    );
  }
}
Search.propTypes = {
  filterList: PropTypes.func.isRequired,
};
export default Search;
