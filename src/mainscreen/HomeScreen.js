import React, { useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableHighlight, Image } from 'react-native';
import HomeImageItem from '../component/HomeImageItem.js';
import * as SQLite from 'expo-sqlite';
import { createStackNavigator } from '@react-navigation/stack';

const DATA = [
  {
    id: '1',
    image: '../../assets/images/BookSample01.jpg',
    title: '이만큼 가까이1'
  },
  {
    id: '2',
    image: '../../assets/images/BookSample01.jpg',
    title: '이만큼 가까이2'
  },
  {
    id: '3',
    image: '../../assets/images/BookSample01.jpg',
    title: '이만큼 가까이3'
  },
  {
    id: '4',
    image: '../../assets/images/BookSample01.jpg',
    title: '이만큼 가까이4'
  },
  {
    id: '5',
    image: '../../assets/images/BookSample01.jpg',
    title: '이만큼 가까이5'
  },
  {
    id: '6',
    image: '../../assets/images/BookSample01.jpg',
    title: '이만큼 가까이6'
  },
]

const HomeStack = createStackNavigator();

function HomeScreen({route, navigation}) {
  const [count, setCount] = useState(0);
  const {database, id} = route.params;

  return (
    <HomeStack.Navigator initialRouteName="HomeMain">
      <HomeStack.Screen
        name="HomeMain"
        component={HomeMain}
        options={{title:'내가 읽은 책'}}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={HomeDetail}
        options={{title: '상세보기'}}
      />
    </HomeStack.Navigator>
  );
}


function HomeMain({navigation}) {
  return (
    <View>  
      <FlatList
        data={DATA}
        contentContainerStyle={styles.flatlist}
        renderItem={({item, index, separators}) =>(
          <TouchableHighlight
          underlayColor="#ffffff"
          onPress={()=>navigation.navigate('HomeDetail',{
            title: item.title,
          })}
          >
          
            <HomeImageItem title={item.title} image={item.image}/>
          
          </TouchableHighlight>
        )}
      />
  </View>
  );
}

function HomeDetail({route, navigation}) {
  const {title} = route.params;
  const text = '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.';
  
  
  return (
    <View style={{flex:1, backgroundColor: '#ffffff'}}>
      <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 25}}>
        <View style={{flex:1, paddingLeft:20}}>
          <Image 
          style={{width:85, height: 120}} 
          source={require('../../assets/images/BookSample01.jpg')}
          />
        </View>

        <View>
          <Text style={{paddingRight: 20, paddingBottom:55, fontSize: 20, fontWeight: 'bold'}}>{title}</Text>

          <Text style={{paddingRight: 20, paddingBottom:5, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>작가 : 정세랑 </Text>
          <Text style={{paddingRight: 20, fontSize: 15, textAlign: 'right', textAlignVertical: 'bottom', color:'#5C5C5C'}}>출판사 :창비 </Text>
        </View>
      </View>
      
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={{paddingBottom: 10, fontSize: 20, fontWeight: 'bold'}}>독후감</Text>

        <View style={{borderBottomColor:'#EAEAEA', borderBottomWidth: 1}}/>

        <FlatList
          data={DATA2}
          renderItem={({item, index, separators})=>(
            <View>
              <Text style={{paddingTop: 10, paddingBottom: 5, fontSize: 17, fontWeight: '500'}}>{item.reportTitle}</Text>
              <Text style={{paddingBottom: 10}}>{item.content}</Text>
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



const styles = StyleSheet.create({
  flatlist: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
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

const DATA2 = [
  {
    reportTitle: '제목1',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.',
  },
  {
    reportTitle: '제목2',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.',
  },
  {
    reportTitle: '제목3',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.',
  },
  {
    reportTitle: '제목4',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.',
  }


]

export default HomeScreen;
