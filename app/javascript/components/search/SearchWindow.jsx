import React from "react"
import PropTypes from "prop-types"
const SearchWindow = props => {
    let userData={};
    return (
        // <div className={"pop-up-background" + (props.visible ? "" : " hidden")}>
      <div className={"pop-up-background"}>
        <div className="pop-up">
            <div className="search-form">
                <form onSubmit={() => {}}>
                    <input ref={input => userData.data = input} />
                    <button>search</button>
                </form>
            </div>
            <div className="results">

            </div>
        </div>

      </div>
    );
};

export default SearchWindow
