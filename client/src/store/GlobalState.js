import React, { Component } from "react";
import Context from "./context";
class GlobalState extends Component {
  state = {
    screenName: undefined
  };
  changeComponent = string => {
    this.setState({ screenName: string });
  };

  render() {
    return (
      <Context.Provider
        value={{
          screenName: this.state.screenName,
          changeComponent: this.changeComponent
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
export default GlobalState;
