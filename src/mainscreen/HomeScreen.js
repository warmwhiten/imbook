import React, { useEffect, useState } from 'react';
import { FlatList,ScrollView, Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Button, Switch, Alert} from 'react-native';
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
      <HomeStack.Screen
        name="UpdateBook"
        component={UpdateBook}
        options={{title: '책 정보 수정'}}
      />
    </HomeStack.Navigator>
  );
}


function HomeMain({navigation}) {
  const[DATA, setDATA] = useState([]);
  const [isrefreshing, setIsRefreshing] = useState(false);
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

  
 
   db.transaction(tx=>{
    tx.executeSql('Drop table bookreport',
    [],
    (t, success)=>{},
    (_t, error) => {console.log('create bookinfo tabel fail'); console.log(error)}
    )
  })
*/

      db.transaction(tx=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS bookstate ("state_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,"book_id" INTEGER NOT NULL, "have" TEXT NOT NULL, "reading" TEXT NOT NULL, "havingform" TEXT NOT NULL, FOREIGN KEY("book_id") REFERENCES "bookinfo"("id") ON DELETE CASCADE);',
          [],
          (t, success)=>{},
          (_t, error) => {console.log('create bookstate tabel fail'); console.log(error)}
          );
      })

      db.transaction(tx => {
          tx.executeSql('SELECT * FROM bookinfo INNER JOIN bookstate ON (bookinfo.id = bookstate.book_id)', 
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
              console.log('home bookinfo select',BookInfo)
              resolve();
            },
            (_t, error)=>{console.log('select book info fail'); console.log(error)},
          );
          })
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM bookstate', 
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
                console.log('home bookinfo select',BookInfo)
                resolve();
              },
              (_t, error)=>{console.log('select book info fail'); console.log(error)},
            );
            })


      
  })
  setIsRefreshing(true);
  await promise;
  setIsRefreshing(false);
  
}

  useEffect(()=> {
    loadData()
  },[]);

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
        refreshing={isrefreshing}
        onRefresh={loadData}
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
            have: item.have,
            reading: item.reading,
            havingform: item.havingform

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          onPress={() => {
            Alert.alert('알림','책을 삭제하시겠습니까? 독후감도 함께 삭제됩니다.',  
            [
              {
                text: "취소",
                onPress: () => {},
                style: "cancel"
              },
              { text: "OK", onPress: () => {database.deleteBookInfo(id);Alert.alert('알림', '독후감이 삭제되었습니다');navigation.navigate('HomeMain')}}
            ],
            { cancelable: false })}} 
          title="삭제" 
          color='tomato' />
      ),
    });
  }, [navigation]);


  
  return (
    <View style={{flex:1, backgroundColor: '#ffffff'}}>
      <View style={{flexDirection: 'row', paddingTop: 30, }}>
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
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>책 상태 : {JSON.parse(have)?'보유':'미보유'}</Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>책 형태 : {JSON.parse(havingform)?'e-book':'종이책'}</Text>
          <Text style={{paddingRight: 20, paddingBottom:3, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>완독 여부 : {JSON.parse(reading)?'완독':'미완독'}</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("UpdateBook",{pid:id,ptitle:title, pauthor:author, ppublisher:publisher, phave:have, phavingform:havingform, preading:reading})}}>
            <Text style={{paddingTop: 5,color:'blue', textAlign: 'right', paddingRight:20, color:'#007AFF', fontSize: 13}}>책 정보 수정</Text>
          </TouchableOpacity>
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
          ListFooterComponent={
            <View style={{ height: 300}}/>
          }
        />


      </View>
    </View>
  )
}

function AddBook({navigation}) {

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
          onPress={()=>{database.setBookInfo(title, author, publisher, isHave, isEbook, isRead); navigation.navigate('HomeMain')}}
        >
          <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'bold'}}>입력완료</Text>
        </TouchableOpacity>
    </View>
  )
}

function UpdateBook({navigation, route}) {
  const {pid, ptitle, pauthor, ppublisher, phave,phavingform,preading}=route.params;
  console.log('have, ebook, reading',phave, phavingform,preading)

  const [title, setTitle] = useState(ptitle);
  const [author, setAuthor] = useState(pauthor);
  const [publisher, setPublisher] = useState(ppublisher);
  const [isHave, setIsHave] = useState(JSON.parse(phave));
  const [isEbook, setIsEbook] = useState(JSON.parse(phavingform));
  const [isRead, setIsRead] = useState(JSON.parse(preading));
  const toggleHaveSwitch = () => {setIsHave(previousState => !previousState);console.log('nowHave', isHave)};
  const toggleEbookSwitch = () => {setIsEbook(previousState => !previousState);console.log('nowEbook', isEbook)};
  const toggleReadSwitch = () => {setIsRead(previousState => !previousState);console.log('nowRead', isRead)};

  useEffect(()=>{console.log('have?',isHave)})

  return(
    <View style={{flex:1, padding:15, backgroundColor: '#ffffff'}}>
      <Text style={{marginBottom:30, marginTop: 10, marginLeft:8, fontSize: 20, fontWeight: 'bold'}}>책 정보 수정하기</Text>

      <TextInput 
        style={{backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
        defaultValue={title}
        
        onChangeText={text=>setTitle(text)}
        />


        <TextInput 
          style={{marginTop: 25, backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
          defaultValue={author}
          onChangeText={text=>setAuthor(text)} 
        />
        
        <TextInput 
          style={{marginTop: 25, backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
          defaultValue={publisher}
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
          onPress={()=>{database.updateBookInfo(pid,title, author, publisher, isHave, isEbook, isRead);console.log(pid,title, author, publisher, isHave, isEbook, isRead); navigation.navigate('HomeMain')}}
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
