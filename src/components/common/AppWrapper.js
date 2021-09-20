import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

export const AppWrapper = (Content) => {
    class Hoc extends Component {
        render() {
            return (
                <React.Fragment>
                    <Header {...this.props} />
                    <Content {...this.props} />
                </React.Fragment>
            )
        }
    }
    return Hoc
}