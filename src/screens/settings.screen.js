import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { View, Text } from 'react-native';

import { resetLikes } from '../actions/likes.action';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
        tabBarLabel: 'Review Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />;
        }
    };

    render() {
        console.log(this.props);

        return (
            <View>
                <Button title="Clear Likes" large icon={{ name: 'delete-forever' }} backgroundColor="#f44336" onPress={this.props.resetLikes} />
            </View>
        );
    }
}

export default connect(null, { resetLikes })(SettingsScreen);