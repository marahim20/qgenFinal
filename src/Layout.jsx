import React, { Component } from "react";

export class Layout extends Component {
  render() {
    return (
      <div className=" bg-red-400 w-screen h-screen flex items-center justify-center p-4 font-mono">
        <div className="bg-yellow-400 w-full rounded-2xl h-full p-4">
          <div className="bg-blue-400 w-full h-full rounded-2xl p-4">
            <div className="bg-white w-full h-full rounded-2xl flex">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
