import React, { Component } from 'react';
import { View, Animated, LayoutAnimation, UIManager, PanResponder, Dimensions, StyleSheet, Platform } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    constructor(props) {
        super(props);

        this.position = new Animated.ValueXY();

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                this.position.setValue({ x: gesture.dx, y: gesture.dy });
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.swipeRight();
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.swipeLeft();
                } else {
                    this.resetPosition();
                }
            }
        });

        this.state = { index: 0 };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

        LayoutAnimation.spring();
    }

    swipeLeft() {
        Animated.timing(this.position, {
            toValue: { x: -SCREEN_WIDTH, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            this.onSwipeComplete('left');
        });
    }

    swipeRight() {
        Animated.timing(this.position, {
            toValue: { x: SCREEN_WIDTH, y: 0 },
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            this.onSwipeComplete('right');
        });
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        if (direction === 'left') {
            onSwipeLeft(item);
        }

        if (direction === 'right') {
            onSwipeRight(item);
        }

        this.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: { x: 0, y: 0 }
        }).start();
    }

    getCardStyle() {
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(),
            transform: [{ rotate }]
        }
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }

        const deck = this.props.data.map((item, i) => {
            if (i < this.state.index) {
                return null;
            }

            if (i === this.state.index) {
                return (
                    <Animated.View style={[this.getCardStyle(), styles.card]} {...this.panResponder.panHandlers} key={item.jobkey}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                )
            }

            return (
                <Animated.View style={[styles.card, { top: 5 * (i - this.state.index) }]} key={item.jobkey}>
                    {this.props.renderCard(item)}
                </Animated.View>
            )
        });

        return Platform.OS === 'android' ? deck : deck.reverse();
    }

    render() {
        return (
            <View style={styles.deck}>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    deck: {
        marginTop: 50
    },
    card: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
});

export default Deck;