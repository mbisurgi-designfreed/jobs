import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderSlides() {
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={[styles.slide, { backgroundColor: slide.color }]}>
                    <Text style={styles.text}>{slide.text}</Text>
                    {this.renderButton(index)}
                </View>
            );
        });
    }

    renderButton(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button buttonStyle={styles.button} containerViewStyle={{ marginTop: 15 }} title="Onwards!" raised onPress={this.props.onComplete} />
            );
        }
    }

    render() {
        return (
            <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    text: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#0288d1'
    }
});

export default Slides;