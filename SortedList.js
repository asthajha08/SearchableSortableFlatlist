import ActionSheet from 'react-native-actionsheet'
import React, { Component } from 'react';
//import react in our code.

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,Image,TouchableOpacity
} from 'react-native';


class SortedList extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '' };
    dataSource: [];

  }
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  static navigationOptions =
  {
     title: 'SortedListActivity'
  };


  sortarray = (index) => {
    if(index===0){
    const sortedarray = this.state.dataSource.sort((a, b)=>{
        return parseFloat (a['im:price']['label'].replace('$',''))-parseFloat(b['im:price']['label'].replace('$',''))

    })
    console.log(sortedarray);
  }
  if(index===1){
  const sortedarraynew = this.state.dataSource.sort((a, b)=>{
      var nameA =a['im:artist']['label'].toLowerCase(), nameB = b['im:artist']['label'].toLowerCase()
          if (nameA < nameB) //sort string ascending
              return -1
          if (nameA > nameB)
              return 1
          return 0

  })
    console.log(sortedarraynew);
}

if(index===2){
const sortedarraynewone =  this.state.dataSource.sort((a, b)=>{
      var dateA=new Date(a['im:releaseDate']['attributes']['label']), dateB=new Date(b['im:releaseDate']['attributes']['label'])
      return dateA-dateB //sort by date ascending
  })

  console.log(sortedarraynewone);
}
  }

  componentDidMount() {
    return fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.feed.entry
          },

        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  ListViewItemSeparator = () => {
    //Item sparator view
    return (
      <View
        style={{
          height: 1,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  OpenSecondActivity (item)
   {
  console.log( item)
      this.props.navigation.navigate('SortedList', {item});

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
      <View>
      <TouchableOpacity onPress={this.showActionSheet}>
           <Text style = {styles.button}>
              Click for Sorting
           </Text>
        </TouchableOpacity>
              <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Which one do you like ?'}
                options={['Price', 'Albums', 'ReleaseDate','Cancel']}
                cancelButtonIndex={3}
                destructiveButtonIndex={1}
                onPress={this.sortarray}
              />
            </View>
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
            <View style={styles.viewStyleNext}>
            <Image
        style={{ height:55, width: 55,alignItems:'flex-start' }}
        source={{ uri: item['im:image'][0]['label'] }}
       />
            <Text onPress={()=>this.OpenSecondActivity(item)} style={styles.textStyle}>{item.title.label}</Text>
            </View>
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
  button: {
    padding:10,
 backgroundColor: '#8fbc8f',
 borderRadius:5,
     marginTop:10
  }
  });
export default SortedList;
