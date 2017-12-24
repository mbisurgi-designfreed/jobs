import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';

import Deck from '../components/deck.component';

import { likeJob } from '../actions/likes.action';

class DeckScreen extends Component {
    static navigationOptions = {
        tabBarLabel: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />;
        }
    }

    renderCard(job) {
        const region = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.045,
            latitudeDelta: 0.02
        }

        return (
            <Card title={job.jobtitle} >
                <View style={{ height: 300 }}>
                    <MapView scrollEnabled={false} cacheEnabled initialRegion={region} style={{ flex: 1 }} />
                </View>
                <View style={styles.detailContainer}>
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
            </Card>
        );
    }

    renderNoMoreCards() {
        return (
            <Card title='No More Jobs'>
                <Button title="Back to Map" large icon={{ name: 'my-location' }} backgroundColor="#03a9f4" onPress={() => this.props.navigation.navigate('map')} />
            </Card>
        );
    }

    onSwipeLeft() {

    }

    onSwipeRight() {

    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Deck data={this.props.jobs} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards.bind(this)} onSwipeLeft={this.onSwipeLeft} onSwipeRight={(job) => this.props.likeJob(job)} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { jobs: state.jobs };
}

const styles = StyleSheet.create({
    detailContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
});

export default connect(mapStateToProps, { likeJob })(DeckScreen);