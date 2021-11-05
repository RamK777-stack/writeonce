import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export const AppWrapper = (Content) => {
  class Hoc extends Component {
    render() {
      return (
        <div className="dark:bg-gray-800 dark:text-white flex relative min-h-screen font-sans text-gray-600 subpixel-antialiased">
          <Sidebar {...this.props} />
          <div className="flex-1">
            <Header {...this.props} />
            <Content {...this.props} />
          </div>
        </div>
      );
    }
  }
  return Hoc;
};
