import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ListStack = createStackNavigator();

function ListScreen({route, navigation}) {
  const [count, setCount] = useState(0);
  const {database, id} = route.params;

  return (
    <ListStack.Navigator initialRouteName="ListMain">
      <ListStack.Screen
        name="ListMain"
        component={ListMain}
        options={{title:'내 책 분류'}}
      />
      <ListStack.Screen
        name="ListDetail"
        component={ListDetail}
        options={({route})=>({title: route.params.menuTitle})}
      />
    </ListStack.Navigator>
  );
}

function ListMain({navigation}) {
  const [count, setCount] = useState(0);

  return (
    <View>
        <View style={{height:45}}/>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '모든 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>모든 책</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>

        
        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>독서 상태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '안 읽은 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>안 읽은 책</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '읽은 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>읽은 책</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>


        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>소유 상태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '나에게 있는 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>나에게 있는 책</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '읽은 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>나에게 없는 책</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>

        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>소유 형태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '종이 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>종이 책</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: 'e-book',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:1, textAlign:'left'}}>e-book</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
    </View>
  );
}

function ListDetail({navigation, route}) {
  const [count, setCount] = useState(0);
  const {name} = route.params;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detail~~</Text>
      <Text>{name}</Text>
    </View>
  );
}

export default ListScreen;
