import React, { useEffect, useState } from 'react';
import { FlatList,ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Button, Switch} from 'react-native';
import HomeImageItem from '../component/HomeImageItem.js';
import * as SQLite from 'expo-sqlite';
import { createStackNavigator } from '@react-navigation/stack';
import {database} from '../database';
import Ionicons from 'react-native-vector-icons/Ionicons';



const db = SQLite.openDatabase('imbook.db');

let DATA=[];

const HomeStack = createStackNavigator();


function HomeScreen({route, navigation}) {
  const [isDBLoadingComplete, setDBLoadingComplete] = useState(0);

  return (
    <HomeStack.Navigator initialRouteName="HomeMain">
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{title:'내 책 보기'}}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={{title: '상세보기'}}
      />
      <HomeStack.Screen
        name="AddBook"
        component={AddBook}
        options={{title: '새 책 추가하기'}}
      />
    </HomeStack.Navigator>
  );
}


function HomeMain({navigation}) {
  const[DATA, setDATA] = useState([]);
  async function loadData() {
    let promise = new Promise(function(resolve, reject){


      db.transaction(tx=>{
          tx.executeSql('CREATE TABLE IF NOT EXISTS bookinfo (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, title TEXT NOT NULL, author TEXT NOT NULL, publisher TEXT NOT NULL);',
          [],
          (t, success)=>{},
          (_t, error) => {console.log('create bookinfo tabel fail'); console.log(error)}
          )
      })
/*
      db.transaction(tx=>{
        tx.executeSql('Drop table bookinfo',
        [],
        (t, success)=>{},
        (_t, error) => {console.log('create bookinfo tabel fail'); console.log(error)}
        )
    })
  
    db.transaction(tx=>{
      tx.executeSql('Drop table bookstate',
      [],
      (t, success)=>{},
      (_t, error) => {console.log('create bookinfo tabel fail'); console.log(error)}
      )
  })
  */
      db.transaction(tx=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS bookstate ("id" INTEGER NOT NULL UNIQUE, "have" INTEGER NOT NULL, "reading" INTEGER NOT NULL, "havingform" INTEGER NOT NULL, FOREIGN KEY("id") REFERENCES "bookinfo"("id") ON DELETE CASCADE, PRIMARY KEY("id"));',
          [],
          (t, success)=>{},
          (_t, error) => {console.log('create bookstate tabel fail'); console.log(error)}
          );
      })

      db.transaction(tx => {
          tx.executeSql('SELECT * FROM bookinfo', 
              [], 
              (t, results) => {                    
              const rows = results.rows;
              let BookInfo = [];
        
              for (let i = 0; i < rows.length; i++) {
                  BookInfo.push({
                  ...rows.item(i),
                  });
              }
              BookInfo.reverse();
              setDATA(BookInfo)
              resolve();
            },
            (_t, error)=>{console.log('select book info fail'); console.log(error)},
          );
          })


      
  })
  await promise;
  
}

  useEffect(()=> {
    loadData()
  });

  return (
    <View style={{flex:1, backgroundColor:'#fafafa'}}>  
    <View/>
      <TouchableOpacity style={{position: 'absolute', right: 20, bottom:20, zIndex:100}} onPress={()=>{navigation.navigate('AddBook')}}>
        <Ionicons name={'ios-add-circle'} size={60} color={'tomato'} />
      </TouchableOpacity>
      <FlatList
        data={DATA}
        contentContainerStyle={styles.flatlist}
        horizontal={false}
        numColumns={3}
        ListHeaderComponent={()=>(<View style={{width:300,height:25}}>
        </View>)}
        renderItem={({item, index, separators}) =>(
          <TouchableOpacity
          underlayColor="#ffffff"
          onPress={()=>navigation.navigate('HomeDetail',{
            title: item.title,
            author: item.author,
            publisher: item.publisher,
            id: item.id,

          })}

          >
          
            <HomeImageItem title={item.title} image={item.image}/>
          
          </TouchableOpacity>
        )}
      />
    </View>

    
  );
}

function HomeDetail({route, navigation}) {
  const {title, author, publisher,id} = route.params;
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
  },[DATA]);


  const text = '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.';
  
  
  return (
    <View style={{flex:1, backgroundColor: '#ffffff'}}>
      <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 25}}>
        <View style={{flex:1, paddingLeft:20}}>
          <Image 
          style={{width:100, height: 100}} 
          source={require('../../assets/images/BookSample02.png')}
          />
        </View>

        <View>
          <Text style={{paddingRight: 20, paddingBottom:55, fontSize: 20, fontWeight: 'bold'}}>{title}</Text>

          <Text style={{paddingRight: 20, paddingBottom:5, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>id: {id} </Text>
          <Text style={{paddingRight: 20, paddingBottom:5, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>작가: {author} </Text>
          <Text style={{paddingRight: 20, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>출판사 : {publisher} </Text>
        </View>
      </View>
      
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{paddingBottom: 10, fontSize: 20, fontWeight: 'bold'}}>독후감</Text>

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

function AddBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isHave, setIsHave] = useState(false);
  const [isEbook, setIsEbook] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const toggleHaveSwitch = () => setIsHave(previousState => !previousState);
  const toggleEbookSwitch = () => setIsEbook(previousState => !previousState);
  const toggleReadSwitch = () => setIsRead(previousState => !previousState);

  return(
    <View style={{flex:1, padding:15, backgroundColor: '#ffffff'}}>
      <Text style={{marginBottom:30, marginTop: 10, marginLeft:8, fontSize: 20, fontWeight: 'bold'}}>새 책 정보</Text>

      <TextInput 
        style={{backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
        placeholder={'책 제목'}
        clearTextOnFocus={true}
        onChangeText={text=>setTitle(text)}
        />


        <TextInput 
          style={{marginTop: 25, backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
          placeholder={'작가'}
          clearTextOnFocus={true}
          onChangeText={text=>setAuthor(text)} 
        />
        
        <TextInput 
          style={{marginTop: 25, backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
          placeholder={'출판사'}
          clearTextOnFocus={true}
          onChangeText={text=>setPublisher(text)}  
        />

          <Text style={{marginBottom:10, marginTop: 20, marginLeft:8, fontSize: 17, fontWeight: '500'}}>책 소유 상태</Text>
          <Switch
            ios_backgroundColor="#d5d5d5"
            onValueChange={toggleHaveSwitch}
            value={isHave}
            style={{marginLeft:5}}
          />

          
          <Text style={{marginBottom:10, marginTop: 20, marginLeft:8, fontSize: 18, fontWeight: '500'}}>e-book</Text>
          <Switch
            ios_backgroundColor="#d5d5d5"
            onValueChange={toggleEbookSwitch}
            value={isEbook}
            style={{marginLeft:5}}
          />

          <Text style={{marginBottom:10, marginTop: 20, marginLeft:8, fontSize: 17, fontWeight: '500'}}>완독여부</Text>
          <Switch
            ios_backgroundColor="#d5d5d5"
            onValueChange={toggleReadSwitch}
            value={isRead}
            style={{marginLeft:5}}
          />
        <TouchableOpacity 
          style={{marginTop: 50,backgroundColor:'#Ff7171', paddingTop:20, height: 60, borderRadius: 8,  shadowColor: "#000000", shadowOpacity: 0.2, shadowOffset: { width: 2, height: 2 }}}
          onPress={()=>{database.setBookInfo(title, author, publisher, isHave, isEbook, isRead)}}
        >
          <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'bold'}}>입력완료</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  flatlist: {
    marginLeft:8
},
  headerContainer: {
    height:'20%',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 2, height: 2 }
  }


})


export default HomeScreen;
