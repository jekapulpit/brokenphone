import React from "react"
import PropTypes from "prop-types"
import Result from "./Result";
const SearchWindow = props => {
    let userData={};
    let results = props.searchResults.map((result) => {
        return <Result key={result.id} inviteUser={props.inviteUser} userInfo={result}/>
    });
    return (
      <div className={"pop-up-background" + (props.visible ? "" : " hidden")}>
        <div className="pop-up">
            <div className="search-form">
                <form data-remote="true">
                    <input ref={input => userData.data = input} />
                    <button onClick={() => {props.handleSearch(userData.data.value)}}>search</button>
                </form>
            </div>
            <div className="results">
                {results}
            </div>
            <div className="exit">
                <button onClick={() => {props.toggleSearch()}} >exit</button>
            </div>
        </div>

      </div>
    );
};

export default SearchWindow
