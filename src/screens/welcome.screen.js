import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import _ from 'lodash';

import Slides from '../components/slides.component';

const SLIDE_DATA = [
    { text: 'Welcome to JobApp', color: '#03a9f4' },
    { text: 'Use this to get a job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03a9f4' }
];

class WelcomeScreen extends Component {
    state = {
        token: null
    }

    async componentWillMount() {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            this.props.navigation.navigate('map');
        } else {
            this.setState({ token: false });
        }
    }

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;