import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {database} from '../database';
import * as SQLite from 'expo-sqlite';
import { FlatList } from 'react-native-gesture-handler';

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
      <ListStack.Screen
        name="ListItem"
        component={ListItem}
        options={({route})=>({title: route.params.title})}
      />
    </ListStack.Navigator>
  );
}

function ListMain({navigation}) {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [havingCount, setHavingCount] = useState(0);
  const [havingFormCount, setHavingFormCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);


  async function loadData() {
    let promise = new Promise(function(resolve, reject){

      db.transaction(tx=>{
        let count;
        tx.executeSql('select count(*) from bookinfo',
          [],
          (t, result)=>{console.log('total',count=parseInt(result.rows.item(0)["count(*)"]));setTotalCount(count)},
          (_t, error) => {console.log('count fail'); console.log(error)}
          );
      })

      db.transaction(tx=>{
        let count;
        tx.executeSql('select * from bookinfo',
          [],
          (t, result)=>{console.log('total',result.rows)},
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

      resolve();
      
  })
  setRefreshing(true);
  await promise;
  setRefreshing(false);
  
}

  useEffect(()=> {
    loadData()
  },[]);

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData}/>}
    >
        <View style={{height:45}}/>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '모든 책',
            count: totalCount,
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
            count: totalCount-readingCount,
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>안 읽은 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount-readingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '읽은 책',
            count: readingCount,
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>읽은 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{readingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>


        <Text style={{height:50, paddingTop:27, paddingLeft:10, fontWeight:'500', color:'#8C8C8C'}}>소유 상태</Text>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderTopWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '나에게 있는 책',
            count: totalCount-havingCount,
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>나에게 있는 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount-havingCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: '나에게 없는 책',
            count: havingCount
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
            count: totalCount-havingFormCount
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>종이 책</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{totalCount- havingFormCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'#ffffff', width:'100%', height:50, justifyContent:'center', borderColor:'#E7E7E7', borderWidth: 1, flexDirection: 'row', paddingTop:15}}
          underlayColor="#F5F5F5"
          onPress={()=>navigation.navigate('ListDetail',{
            menuTitle: 'e-book',
            count: havingFormCount
            })}>
          <Text style={{fontSize:16, paddingLeft: 15, flex:10, textAlign:'left'}}>e-book</Text>
          <Text style={{ fontSize:16, flex:1, zIndex:2, textAlign:'left', borderRadius:30, color:'tomato', fontWeight:'700'}}>{havingFormCount}</Text>
          <Ionicons style={{paddingRight:15}} name={'ios-arrow-forward'} size={20} color={'#A6A6A6'}></Ionicons>
        </TouchableOpacity>
    </ScrollView>
  );
}

function ListDetail({navigation, route}) {
  const [DATA, setDATA] = useState([]);
  const {menuTitle, count} = route.params;

  async function loadData() {
    let promise = new Promise(function(resolve, reject){
      switch (menuTitle) {
        case "모든 책":
          console.log('모든책 진입')
          db.transaction(tx=>{
            tx.executeSql('select * from bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id)',
            [], 
            (t, results) => {      
            console.log('success')              
            const rows = results.rows;
            let BookInfo = [];
      
            for (let i = 0; i < rows.length; i++) {
                BookInfo.push({
                ...rows.item(i),
                });
            }
            
            console.log('book info in 모든책',BookInfo);
            setDATA(BookInfo.reverse())
          },
          (_t, error)=>{console.log('listdetail bookinfo fail', error)}
          );
        })
        break;


        case "읽은 책":
          console.log('읽은 책 진입')
          db.transaction(tx=>{
            let count;
            tx.executeSql(`SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id) WHERE reading=1`,
            [], 
            (t, results) => {                    
            const rows = results.rows;
            let BookInfo = [];
      
            for (let i = 0; i < rows.length; i++) {
                BookInfo.push({
                ...rows.item(i),
                });
            }
            
            setDATA(BookInfo.reverse())
          })})
          break;
          case "안 읽은 책":
            console.log('안 읽은 책 진입')
            db.transaction(tx=>{
              let count;
              tx.executeSql(`SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id) WHERE reading=0`,
              [], 
              (t, results) => {                    
              const rows = results.rows;
              let BookInfo = [];
        
              for (let i = 0; i < rows.length; i++) {
                  BookInfo.push({
                  ...rows.item(i),
                  });
              }
              
              setDATA(BookInfo.reverse())
              },
              (_t, error)=>{console.log('안읽은책 fail', error)}
            );
          })
            break;
          case "나에게 있는 책":
            db.transaction(tx=>{
              let count;
              tx.executeSql(`SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id) WHERE have=1`,
              [], 
              (t, results) => {                    
              const rows = results.rows;
              let BookInfo = [];
        
              for (let i = 0; i < rows.length; i++) {
                  BookInfo.push({
                  ...rows.item(i),
                  });
              }
              
              setDATA(BookInfo.reverse())
            })})
            break;
            case "나에게 없는 책":
              db.transaction(tx=>{
                let count;
                tx.executeSql(`SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id) WHERE have=0`,
                [], 
                (t, results) => {                    
                const rows = results.rows;
                let BookInfo = [];
          
                for (let i = 0; i < rows.length; i++) {
                    BookInfo.push({
                    ...rows.item(i),
                    });
                }
                
                setDATA(BookInfo.reverse())
              })})
              break;

              case "종이 책":
                console.log('종이책진입');
                db.transaction(tx=>{
                  let count;
                  tx.executeSql(`SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id) WHERE havingform=0`,
                  [], 
                  (t, results) => {                    
                  const rows = results.rows;
                  let BookInfo = [];
            
                  for (let i = 0; i < rows.length; i++) {
                      BookInfo.push({
                      ...rows.item(i),
                      });
                  }
                  
                  setDATA(BookInfo.reverse())
                },
                (_t, error)=>{console.log('종이책실패', error)}
                
                )})
                break;
                case "e-book":
                  console.log('e-book진입');
                  db.transaction(tx=>{
                    let count;
                    tx.executeSql(`SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id) WHERE havingform=1`,
                    [], 
                    (t, results) => {                    
                    const rows = results.rows;
                    let BookInfo = [];
              
                    for (let i = 0; i < rows.length; i++) {
                        BookInfo.push({
                        ...rows.item(i),
                        });
                    }
                    
                    setDATA(BookInfo.reverse())
                  },
                  (_t, error)=>{console.log('e-book실패', error)}
                  
                  )})
                  break;
        default:
          break;
      }
      

      resolve();
      
  })

  await promise;

  
}

useEffect(()=>{
  loadData();
},[])

  return (
    <View style={{ flex: 1, backgroundColor:'#ffffff'}}>
      <View style={{flexDirection:'row', paddingTop: 20, paddingLeft: 25, paddingRight:25, }}>
        <Text style={{flex: 5, fontSize: 22, fontWeight:'bold', }}>{menuTitle}</Text>
        <Text style={{flex: 1, fontSize: 17, paddingTop:5  }}>{count} 건</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({item, index, separators})=>{
          return(
            <TouchableOpacity onPress={()=>{navigation.navigate("ListItem", {id: item.id, author: item.author, title: item.title, publisher: item.publisher, have:item.have, havingform:item.havingform, reading: item.reading})}}>
            <View style={{paddingLeft: 20, paddingRight: 20}}>
              <View style={{flexDirection:'row', paddingTop:20, paddingBottom:3}}>
                <Text style={{flex: 4, paddingLeft:10, paddingTop: 5, paddingBottom: 10, fontSize: 18, fontWeight: '500'}}>{item.title}</Text>
                <Text style={{flex: 1, paddingTop: 10, paddingBottom: 10, fontSize: 15}}>{item.author}</Text>
              </View>
             
              <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>
              
            </View>
            </TouchableOpacity>
        )}}
        ListFooterComponent={<View style={{height:40}}/>}
      />
    </View>
  );
}

function ListItem({route, navigation}) {
  const {title, author, publisher,id, have, havingform, reading} = route.params;
  const[DATA, setDATA] = useState([]);
  async function loadData() {
    let promise = new Promise(function(resolve, reject){

      db.transaction(tx => {
          tx.executeSql(`SELECT * FROM bookreport INNER JOIN bookinfo ON (bookreport.book_id = bookinfo.id) WHERE id=${id}`, 
              [], 
              (t, results) => {                    
              const rows = results.rows;
              let BookInfo = [];
        
              for (let i = 0; i < rows.length; i++) {
                  BookInfo.push({
                  ...rows.item(i),
                  });
              }
              
              console.log('book info and report',BookInfo);
              setDATA(BookInfo)
              resolve();
            },
            (_t, error)=>{console.log('select book info fail'); console.log(error)},
          );
          })


      
  },)
  await promise;
  
}

  useEffect(()=> {
    loadData()
  },[]);

  
  
  return (
    <View style={{flex:1, backgroundColor: '#ffffff'}}>
      <View style={{flexDirection: 'row', paddingTop: 30, paddingBottom: 40}}>
        <View style={{flex:1, paddingLeft:10, paddingTop: 40}}>
          <Image 
          style={{width:110, height: 110}} 
          source={require('../../assets/images/BookSample02.png')}
          />
        </View>

        <View>
          <Text style={{paddingRight: 20, paddingBottom:10, fontSize: 20, fontWeight: 'bold', textAlign:'right'}}>{title}</Text>

          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>id: {id} </Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>작가: {author} </Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>출판사 : {publisher} </Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>책 상태 : {have?'보유':'미보유'}</Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>책 형태 : {havingform?'e-book':'종이책'}</Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>완독 여부 : {reading?'완독':'미완독'}</Text>
        </View>
      </View>
      
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{paddingBottom: 10, paddingLeft:5, fontSize: 20, fontWeight: 'bold'}}>독후감</Text>

        <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>

        <FlatList
          data={DATA}
          renderItem={({item, index, separators})=>(
            <View>
              <Text style={{paddingTop: 10, paddingBottom: 5, fontSize: 17, fontWeight: '500'}}>{item.report_title}</Text>
              <Text style={{paddingBottom: 10}}>{item.report}</Text>
              <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>
            </View>
          )}
          ListFooterComponent={()=>(
            <View style={{width:'100%', height: 200}}>

            </View>
          )}
        />

        {/*flatlist로 대체* */}
        {/** 
        <Text style={{paddingTop: 10, paddingBottom: 5, fontSize: 17, fontWeight: '500'}}>제목1</Text>
        <Text style={{paddingBottom: 10}}>{text}</Text>
        <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>

        <Text style={{paddingTop: 10, paddingBottom: 5, fontSize: 17, fontWeight: '500'}}>제목2</Text>
        <Text style={{paddingBottom: 10}}>{text}</Text>
        <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>

*/}
        {/*flatlist로 대체* */}
      </View>
    </View>
  )
}

export default ListScreen;
