import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {database} from '../database';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('imbook.db');

const ListStack = createStackNavigator();

function ListScreen({route, navigation}) {
  const [count, setCount] = useState(0);

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
  const[totalCount, setTotalCount] = useState(0);
  const[readingCount, setReadingCount] = useState(0);
  const[havingCount, setHavingCount] = useState(0);
  const[havingFormCount, setHavingFormCount] = useState(0);

  async function loadData() {
    let promise = new Promise(function(resolve, reject){

      db.transaction(tx=>{
        let count;
        tx.executeSql('select count(*) from bookinfo',
          [],
          (t, result)=>{console.log(count=parseInt(result.rows.item(0)["count(*)"]));setTotalCount(count);console.log(totalCount)},
          (_t, error) => {console.log('count fail'); console.log(error)}
          );
      })

      db.transaction(tx=>{
        tx.executeSql('select * from bookstate',
          [],
          (t, result)=>{console.log('bookstate',result.rows)},
          (_t, error) => {console.log('count fail'); console.log(error)}
          );
      })

      db.transaction(tx=>{
        tx.executeSql('select reading, count(*) from bookstate group by reading',
          [],
          (t, result)=>{setReadingCount(result.rows._array[0]["count(*)"])},
          (_t, error) => {console.log('count fail'); console.log(error)}
          );
      })

      db.transaction(tx=>{
        tx.executeSql('select have, count(*) from bookstate group by have',
          [],
          (t, result)=>{setHavingCount(result.rows._array[0]["count(*)"])},
          (_t, error) => {console.log('count fail'); console.log(error)}
          );
      })

      db.transaction(tx=>{
        tx.executeSql('select havingform, count(*) from bookstate group by havingform',
          [],
          (t, result)=>{setHavingFormCount(result.rows._array[0]["count(*)"])},
          (_t, error) => {console.log('count fail'); console.log(error)}
          );
      })


      
  })
  await promise;
  
}

  useEffect(()=> {
    loadData()
  });

  return (
    <View>
        <View style={{height:45}}/>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '모든 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>모든 책</Text>

          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount}</Text>

          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>

        
        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>독서 상태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '안 읽은 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>안 읽은 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{readingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '읽은 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>읽은 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount-readingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>


        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>소유 상태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '나에게 있는 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>나에게 있는 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount-havingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '읽은 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>나에게 없는 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{havingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>

        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>소유 형태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '종이 책',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>종이 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{havingFormCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: 'e-book',
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>e-book</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount-havingFormCount}</Text>
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
