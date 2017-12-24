import React from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import AuthScreen from './src/screens/auth.screen';
import WelcomeScreen from './src/screens/welcome.screen';
import MapScreen from './src/screens/map.screen';
import DeckScreen from './src/screens/deck.screen';
import ReviewScreen from './src/screens/review.screen';
import SettingsScreen from './src/screens/settings.screen';

import AuthReducer from './src/reducers/auth.reducer';
import JobReducer from './src/reducers/job.reducer';
import LikesReducer from './src/reducers/likes.reducer';

const reducers = combineReducers({ auth: AuthReducer, jobs: JobReducer, likes: LikesReducer });
const middlewares = compose(applyMiddleware(ReduxThunk), autoRehydrate());

const store = createStore(reducers, {}, middlewares);

persistStore(store, { storage: AsyncStorage, whitelist: ['likes'] });

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
          })
      }
    }, {
        navigationOptions: {
          tabBarVisible: false
        },
        lazy: true
      });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
