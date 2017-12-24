import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text, Platform, StyleSheet, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Review Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
        },
        headerRight: (
            <Button title="Settings" onPress={() => navigation.navigate('settings')} backgroundColor="rgba(0, 0, 0 ,0)" color="rgba(0, 122, 255, 1)" />
        ),
        headerStyle: {
            marginTop: Platform.OS === 'android' ? 24 : 0
        },
        headerBackTitle: null,
    });

    renderJobs() {
        return this.props.likes.map((job) => {
            const region = {
                longitude: job.longitude,
                latitude: job.latitude,
                longitudeDelta: 0.045,
                latitudeDelta: 0.02
            };

            const latLng = {
                latitude: job.latitude,
                longitude: job.longitude,
            };

            return (
                <Card title={job.jobtitle} key={job.jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView scrollEnabled={false} cacheEnabled initialRegion={region} style={{ flex: 1 }} >
                            <MapView.Marker coordinate={latLng} />
                        </MapView>
                        <View style={styles.detail}>
                            <Text style={styles.italics}>{job.company}</Text>
                            <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
                        </View>
                        <Button title="Apply Now!" backgroundColor="#03a9f4" onPress={() => { Linking.openURL(job.url) }} />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderJobs()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    detail: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
});

const mapStateToProps = (state) => {
    return { likes: state.likes };
};

export default connect(mapStateToProps)(ReviewScreen);