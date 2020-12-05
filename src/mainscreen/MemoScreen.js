import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const DATA= [
  {
    booktitle: 'booktitle1',
    title: 'title1',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle2',
    title: 'title2',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle3',
    title: 'title3',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle4',
    title: 'title4',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle4',
    title: 'title4',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle4',
    title: 'title4',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle4',
    title: 'title4',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
  {
    booktitle: 'booktitle4',
    title: 'title4',
    content: '그들의 우리의 같이, 웅대한 이것이다. 너의 속에 피에 현저하게 커다란 커다란 충분히 위하여 아니한 힘있다. 행복스럽고 피어나는 원대하고, 것은 쓸쓸하랴? 얼음에 품었기 청춘은 가슴이 두기 같이, 지혜는 싶이 쓸쓸하랴? 꽃이 일월과 위하여 아름다우냐? 청춘의 보는 장식하는 인생을 청춘 아니다. 가진 뼈 그와 이상 예가 칼이다. 길지 미묘한 대한 눈에 뜨고, 끝까지 품었기 심장의 황금시대다. 천지는 옷을 되는 이상 황금시대를 날카로우나 사막이다. 곳으로 얼마나 희망의 밥을 고행을 풍부하게 뿐이다.'
  },
]


const MemoStack = createStackNavigator();

function MemoScreen() {
  return (
    <MemoStack.Navigator initialRouteName="MemoMain">
      <MemoStack.Screen
        name="MemoMain"
        component={MemoMain}
        options={{title:'독후감 목록'}}
      />
    </MemoStack.Navigator>
  );
}

function MemoMain({navigation}) {
  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({item, index})=>(<MemoItem booktitle={item.booktitle} title={item.title} content={item.content}/>)}
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
