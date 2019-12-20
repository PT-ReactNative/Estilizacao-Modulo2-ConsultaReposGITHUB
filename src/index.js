import React, {Component} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  import('~/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

import createNavigator from './routes';

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  };

  atualizaUserStatus = async username => {
    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  };

  getUsernameStorage = async () => {
    return await AsyncStorage.getItem('@Githuber:username');
  };

  async componentDidMount() {
    const username = await this.getUsernameStorage();
    this.atualizaUserStatus(username);
  }

  render() {
    const {userChecked, userLogged} = this.state;

    if (!userChecked) {
      return null;
    }

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}
