import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, Switch,RefreshControl,Pressable,Button, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {database} from '../database';
import * as SQLite from 'expo-sqlite';
import { ScrollView } from 'react-native-gesture-handler';

const db = SQLite.openDatabase('imbook.db');

const MemoStack = createStackNavigator();


function MemoScreen() {

  return (
    <MemoStack.Navigator initialRouteName="MemoMain">
      <MemoStack.Screen
        name="MemoMain"
        component={MemoMain}
        options={{title:'독후감 목록'}}
      />
      <MemoStack.Screen
        name="AddMemo"
        component={AddMemo}
        options={{title:'독후감 쓰기'}}
      />
      <MemoStack.Screen
        name="UpdateMemo"
        component={UpdateMemo}
        options={{title:'독후감 수정'}}
      />


    </MemoStack.Navigator>
  );
}


function MemoMain({navigation}) {
  const [DATA, setDATA] = useState([]);
  const [isrefreshing, setIsRefreshing] = useState(false);


  async function loadData() {
    let promise = new Promise(function(resolve, reject){

      db.transaction(tx=>{
        tx.executeSql('CREATE TABLE IF NOT EXISTS bookreport ("report_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "book_id" INTEGER NOT NULL, "report_title" TEXT NOT NULL , "report" TEXT NOT NULL, FOREIGN KEY("book_id") REFERENCES "bookinfo"("id") ON DELETE CASCADE);',
          [],
          (t, success)=>{},
          (_t, error) => {console.log('create bookreport tabel fail'); console.log(error)}
          );
      })

      db.transaction(tx => {
          tx.executeSql('SELECT * FROM bookreport INNER JOIN bookinfo ON (bookreport.book_id = bookinfo.id)', 
              [], 
              (t, results) => {                   
              const rows = results.rows;
              let BookReport = [];
        
              for (let i = 0; i < rows.length; i++) {
                  BookReport.push({
                  ...rows.item(i),
                  });
              }
              BookReport.reverse();
              setDATA(BookReport)
              resolve();
              
            },
            (_t, error)=>{console.log('select book report fail'); console.log(error)},
          );
          })


      
  })
  setIsRefreshing(true);
  await promise;
  console.log('report data', DATA);
  setIsRefreshing(false);
  
}

  useEffect(()=> {
    loadData()
  },[]);


  return (
    <View style={{flex:1}}>

        <TouchableOpacity style={{position: 'absolute', right: 20, bottom:20, zIndex:1000}} onPress={()=>{navigation.navigate('AddMemo')}}>
          <Ionicons name={'ios-add-circle'}  size={60} color={'tomato'} />
        </TouchableOpacity>

      
      <FlatList
        onRefresh={loadData}
        refreshing={isrefreshing}
        data={DATA}
        keyExtractor={(item, index)=> index.toString()}
        renderItem={({item, index, separators})=>(
          <TouchableOpacity
            onLongPress={()=>{navigation.navigate("UpdateMemo",
            {
              id: item.book_id,
              title: item.report_title,
              content: item.report,
              report_id: item.report_id
            }
              
            )}}
            delayLongPress={700}
          >
            <MemoItem booktitle={item.title} title={item.report_title} content={item.report} index={index}/>
          </TouchableOpacity>
          )}
      />
      
    </View>
  );
}

function MemoItem (props) {
  return(
      <View style={styles.container}>
          <Text style={styles.booktitle}>{props.booktitle}</Text>
          <Text style={styles.title}>"{props.title}"</Text>
          <Text style={styles.content}>{props.content}</Text>
          <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>
      </View>
  );
}

function AddMemo({route, navigation}) {
  const [bookId, setBookId] = useState(0);
  const [reportTitle, setReportTitle] = useState('');
  const [report, setReport] = useState('');

  return(
    <View style={{flex:1, padding:15, backgroundColor: '#ffffff'}}>
      <Text style={{marginBottom:20, marginTop: 10, marginLeft:8, fontSize: 20, fontWeight: 'bold'}}>새 독후감</Text>

      <TextInput 
        style={{backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
        placeholder={'책 id'}
        onChangeText={text=>setBookId(parseInt(text))}
      />

      <TextInput 
        style={{marginTop:20,backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
        placeholder={'독후감 제목'}

        onChangeText={text=>setReportTitle(text)}
        />

      <Text style={{marginTop: 30, marginLeft:8, fontSize: 20, fontWeight: 'bold'}}>내용</Text>
        <TextInput 
          style={{flexShrink :1, marginTop: 20, backgroundColor:'#ffffff', height: 300, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
          multiline ={true}
          onChangeText={text=>setReport(text)} 
        />
        



        <TouchableOpacity 
          style={{marginTop: 13,backgroundColor:'#Ff7171', paddingTop:20, height: 60, borderRadius: 8,  shadowColor: "#000000", shadowOpacity: 0.2, shadowOffset: { width: 2, height: 2 }}}
          onPress={()=>{database.setBookReport(bookId, reportTitle, report);navigation.navigate("MemoMain")}}
        >
          <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'bold'}}>입력완료</Text>
        </TouchableOpacity>
    </View>
  )
}

function UpdateMemo({route, navigation}) {
  const {id, title, content, report_id} = route.params;

  const [bookId, setBookId] = useState(id);
  const [reportTitle, setReportTitle] = useState(title);
  const [report, setReport] = useState(content);
  
  return(
    <View style={{flex:1, padding:15, backgroundColor: '#ffffff'}}>
      <View style={{flexDirection:'row'}}>
        <Text style={{flex:7, marginBottom:20, marginTop: 5, marginLeft:8, fontSize: 20, fontWeight: 'bold'}}>독후감 수정</Text>
        <Button style={{flex: 1, }} title="삭제" color='tomato' onPress={()=>{
}}/>
      </View>
      <TextInput 
        style={{backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
        placeholder={'책 id'}
        defaultValue={String(bookId)}
        onChangeText={text=>setBookId(parseInt(text))}
      />

      <TextInput 
        style={{marginTop:20,backgroundColor:'#ffffff', height: 50, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
        placeholder={'독후감 제목'}
        defaultValue={reportTitle}
        onChangeText={text=>setReportTitle(text)}
        />

      <Text style={{marginTop: 30, marginLeft:8, fontSize: 20, fontWeight: 'bold'}}>내용</Text>
        <TextInput 
          style={{flexShrink :1, marginTop: 20, backgroundColor:'#ffffff', height: 300, paddingLeft:10, shadowColor: "#000000", shadowOpacity: 0.25, shadowOffset: { width: 2, height: 2 }, borderRadius:8, fontSize: 14}}
          multiline ={true}
          defaultValue={report}
          onChangeText={text=>setReport(text)} 
        />
        



        <TouchableOpacity 
          style={{marginTop: 13,backgroundColor:'#Ff7171', paddingTop:20, height: 60, borderRadius: 8,  shadowColor: "#000000", shadowOpacity: 0.2, shadowOffset: { width: 2, height: 2 }}}
          onPress={()=>{database.updateBookReport(bookId, reportTitle, report, report_id);Alert.alert('알림','독후감이 수정되었습니다');navigation.navigate("MemoMain")}}
        >
          <Text style={{textAlign:'center', color:'#ffffff', fontWeight:'bold'}}>입력완료</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

  container:{
    paddingLeft : 20,
    paddingRight: 20,
    paddingTop: 20,
    flex:1, 
    backgroundColor: '#ffffff'
  },
  booktitle : {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  title : {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    paddingTop: 5,
    paddingBottom: 5,
  },
  content : {
   fontSize: 13,
   paddingBottom: 20,
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

export default MemoScreen;
