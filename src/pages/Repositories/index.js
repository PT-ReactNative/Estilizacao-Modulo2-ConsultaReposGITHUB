import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {SafeAreaView, ActivityIndicator, FlatList} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';

import styles from './styles';

import RepositoryItem from './RepositoryItem';

const TabIcon = ({tintColor}) => (
  <Icon name="list-alt" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
    refreshing: false,
  };

  getUser = async key => {
    return await AsyncStorage.getItem(key);
  };

  getRepos = async user => {
    return await api.get(`/users/${user}/repos`);
  };

  setaDados = data => {
    this.setState({data, loading: false, refreshing: false});
  };

  renderList = () => {
    const {data, refreshing} = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  renderListItem = ({item}) => <RepositoryItem repository={item} />;

  async componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({refreshing: true});
    const username = await this.getUser('@Githuber:username');
    const {data} = await this.getRepos(username);
    this.setaDados(data);
  };

  render() {
    const {loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Repositórios" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </SafeAreaView>
    );
  }
}
