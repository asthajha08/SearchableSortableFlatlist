//This is an example code to Add Search Bar Filter on Listview//
import React, { Component } from 'react';
//import react in our code.

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,TouchableWithoutFeedback
} from 'react-native';
//import all the components we are going to use.

export default class Main extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '' };
    this.arrayholder = [];
  }
  static navigationOptions =
  {
     title: 'MainActivity'
  };

  componentDidMount() {
    return fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.feed.entry
          },
          function() {
            this.arrayholder = responseJson.feed.entry;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title.label ? item.title.label.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      text: text,
    });
  }
  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 1,
          width: '95%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  OpenSecondActivity (item)
   {
  console.log( item)
      this.props.navigation.navigate('SecondActivity', {item});

   }
  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
               <TouchableWithoutFeedback  onPress={()=>this.OpenSecondActivity(item)}>
            <View style={styles.viewStyleNext}>
            <Image
        style={{ height:55, width: 55,alignItems:'flex-start' }}
        source={{ uri: item['im:image'][0]['label'] }}
       />
            <Text onPress={()=>this.OpenSecondActivity(item)} style={styles.textStyle}>{item['im:name']['label']}</Text>
            </View>
            </TouchableWithoutFeedback>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    marginTop: 10,
    padding: 16,
  },
  viewStyleNext: {
    flexDirection:'row',
    margin:5
  },
  textStyle: {
    padding: 10,
    fontSize:14
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  albumImageStyle: {
    width: 55,
    alignItems:'flex-start'
  },
});
