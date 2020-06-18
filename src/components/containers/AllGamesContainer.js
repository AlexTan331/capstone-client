import React, { Component } from "react";
import { AllGamesView } from "../views";
import { fetchAllGamesThunk } from "../../thunks";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

export class AllGamesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      filter: {
        page: 1,
        page_size: 21,
      },
    };
  }

  componentDidMount() {
    // Call thunk to fetch games from API
    this.props.fetchAllGames(this.state.filter);

    // Store all games from redux store in games variable
    const games = this.props.allGames;
    // Add the games we got from the store to state, so it can be rendered.
    this.setState({ games });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  // Sends the params to state, so it can be sent to backend for API call
  handleFilter = (filter) => (event) => {
    // Prevent the page from reloading when called
    event.preventDefault();

    /*Create a copy of filter in state, so we can 
     modify if need be and send to fetchAllGamesThunk 
    so we can use in API call */

    const param = this.state.filter;

    /* If next button is clicked then filter.page is set to -1, 
    so we know to increment the page counter by 1 */

    if (filter.page === -1) {
      // Modify page in the copy of the state
      param["page"] = param.page + 1;
    } else if (filter.page === -2) {
      // Decrement page if equal to -2
      param["page"] = param.page - 1;
    }

    // Call Thunk to fetch games from API
    this.props.fetchAllGames(param);
  };

//  navigateTo(e){
//    let id =e.target.key; 
//   window.location.href=`/gamePage/${id}`;
//  }

  render() {
    console.log("user information here*****", this.props.user)
    return (
      <div>
        <AllGamesView
          games={this.props.allGames}
          filter={this.state.filter}
          handleFilter={this.handleFilter}
          fetchAllGames={this.props.fetchAllGames}
          onClickDiv={this.navigateTo}
        ></AllGamesView>
      </div>
    );
  }
}

// Map state to props;
const mapState = (state) => {
  //console.log('In mapState');
  return {
    allGames: state.allGames,
    user: state.allUsers
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  //console.log('In mapDispatch');
  return {
    fetchAllGames: (params) => dispatch(fetchAllGamesThunk(params)),
  };
};

export default connect(mapState, mapDispatch)(AllGamesContainer);
