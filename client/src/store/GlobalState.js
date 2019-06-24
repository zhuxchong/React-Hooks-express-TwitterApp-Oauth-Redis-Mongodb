import React, { Component } from "react";
import Context from "./context";
class GlobalState extends Component {
  state = {
    componentDisplay: "tweetGet"
  };
  changeComponent = string => {
    this.setState({ componentDisplay: string });
  };

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state.state,
          changeComponent: this.changeComponent
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default GlobalState;
