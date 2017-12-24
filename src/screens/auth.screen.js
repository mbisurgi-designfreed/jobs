import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { auth } from '../actions/auth.action';

class AuthScreen extends Component {
    componentDidMount() {
        this.props.auth();
        this.onAuthComplete(this.props.token);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps.token);
    }

    onAuthComplete(token) {
        if (token) {
            this.props.navigation.navigate('map');
        }
    }

    render() {
        return (
            <View />
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { token: auth.token };
}

export default connect(mapStateToProps, { auth })(AuthScreen);
