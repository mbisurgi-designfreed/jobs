import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';

import { getJobs } from '../actions/job.actions';

class MapScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Map',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={30} color={tintColor} />;
        }
    };

    state = {
        loaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    };

    componentDidMount() {
        this.setState({ loaded: true });
    }

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    };

    onSearchPress = () => {
        this.props.getJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    };

    render() {
        if (!this.state.loaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView region={this.state.region} style={{ flex: 1 }} onRegionChangeComplete={this.onRegionChangeComplete} />
                <View style={styles.buttonContainer}>
                    <Button large title="Search this area" backgroundColor="#009688" icon={{ name: 'search' }} onPress={this.onSearchPress} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
});

export default connect(null, { getJobs })(MapScreen);