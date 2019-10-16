import React, { Component } from 'react';
//import react in our code.

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,Image
} from 'react-native';
import Card from './Card';
class SecondActivity extends Component
{
  OpenSecondActivity ()
   {
      this.props.navigation.navigate('SortedList');

   }
  static navigationOptions =
  {
     title: 'SecondActivity'
  };


  render()
  {

     return(
       <Card>

        <View style = { styles.MainContainer }>
        <Image style = { styles.imageConstainer }
       source={{ uri: this.props.navigation.state.params['item']['im:image'][0]['label']}}
       />
           <Text style = { styles.TextStyle }> Album Name:  {this.props.navigation.state.params['item']['im:name']['label']}  </Text>
 <Text style = { styles.TextStyle }> Artist Name:  {this.props.navigation.state.params['item']['im:artist']['label']}  </Text>
 <Text style = { styles.TextStyle }> Release Date:  {this.props.navigation.state.params['item']['im:releaseDate']['attributes']['label']}  </Text>
<Text style = { styles.TextStyle }> Price:  {this.props.navigation.state.params['item']['im:price']['label']}  </Text>
<Text style = { styles.TextStyleAnother }> Rights:  {this.props.navigation.state.params.item.rights.label}  </Text>
<Text style = { styles.TextStyleAnother }> Category:  {this.props.navigation.state.params.item.category.attributes.term}  </Text>
<TouchableOpacity onPress={()=>this.OpenSecondActivity()}>
            <Text style = {styles.button}>
               Click for Sorted List
            </Text>
         </TouchableOpacity>
        </View>
        </Card>
     );
  }
}

const styles = StyleSheet.create(
{
  MainContainer:
  {
    justifyContent:'flex-start',
    alignItems:'center',
     flex:1,
     margin: 20

  },
  imageConstainer:{
    height:120,
    width:120,
    marginBottom:25,
      marginTop:30

  },

  TextStyle:
  {
     fontSize: 18,
     textAlign: 'center',
     color: '#000',
  },
  TextStyleAnother:
  {
     fontSize: 14,
     textAlign: 'center',
     justifyContent:'center',
     color: '#000',
       marginTop:10
  },
  button: {
    padding:10,
 backgroundColor: '#8fbc8f',
 borderRadius:5,
     marginTop:10
  },

  rowViewContainer:
  {

    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,

  }

});

export default SecondActivity;
