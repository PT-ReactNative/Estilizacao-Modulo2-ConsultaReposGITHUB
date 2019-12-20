import React, {Component} from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import {SafeAreaView, FlatList, ActivityIndicator} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';

import styles from './styles';

import OrganizationItem from './OrganizationItem';

const TabIcon = ({tintColor}) => (
  <Icon name="building" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Organizations extends Component {
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
    return await api.get(`/users/${user}/orgs`);
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
        onRefresh={this.loadOrganizations}
        refreshing={refreshing}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    );
  };

  renderListItem = ({item}) => <OrganizationItem organization={item} />;

  async componentDidMount() {
    this.loadOrganizations();
  }

  loadOrganizations = async () => {
    this.setState({refreshing: true});
    const username = await this.getUser('@Githuber:username');
    const {data} = await this.getRepos(username);
    this.setaDados(data);
  };

  render() {
    const {loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </SafeAreaView>
    );
  }
}
