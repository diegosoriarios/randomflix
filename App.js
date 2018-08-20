import React, { Component } from 'react';
import Header from './Header';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Platform,
  AsyncStorage,
  TouchableOpacity,
  Button,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      rating: '',
      poster: 'data:image/png;base64,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',
      sinopse: '',
    };
  }

  callApi(){
    fetch('http://www.hot2z.com/api/v1.0/absl15/?')
    .then((result) => {
      return result.json();
    }).then((filme) => {
      let min = 1;
      let max = filme.length;
      let rand = Math.floor(Math.random() * max) + 1 ;
      let movie = filme[rand];
      return movie;
    }).then((movie) => {
      let title = movie.title;
      title = title.split('-');
      let rating = movie.rating + '/10';
      let poster = 'http://' + movie.poster;
      let sinopse = movie.story;
      this.setState({
        title: title[0],
        rating: rating,
        poster: poster,
        sinopse: sinopse,
      })
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header title="Random" />
        <View style = {styles.container}>
            <Text style={styles.title}>{this.state.title}</Text>
            <Text>{this.state.rating}</Text>
            <View style={styles.sinopse}>
              <Text>{this.state.sinopse}</Text>
            </View>
            <Image
                style={styles.img}
                source={{uri: this.state.poster}}
              />
        </View>
      <TouchableOpacity
        style={styles.btn}
        title="Procurar"
        onPress={() => this.callApi()}>
        <Text style={styles.btnText}>Outro</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '5%',
    flex: 1,
  },
  btn: {
    padding: 10,
    backgroundColor: 'lightseagreen',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 50,
    position: 'absolute',
    alignItems: 'center',
  },
  sinopse: {
    width: '80%',
    justifyContent: 'center',
  },
  img: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
