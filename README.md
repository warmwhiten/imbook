# imbook

  
    
      
내 책을 관리하고 책의 독후감을 관리하는 React Native 어플리케이션 imbook 입니다. 별도의 서버 없이 SQLite를 이용하여 사용자 데이터를 기기 안에 저장하고 관리합니다.

## Description
  
imbook은 다음과 같은 기능을 제공합니다
  - **내 책 관리** : 책의 보유 여부, 책의 소유 형태 (e-book/종이책), 책 완독 여부에 따라 내 책을 확인하고, 관리할 수 있습니다.
  - **독후감 관리** : 책을 읽고 독후감을 작성할 수 있습니다. 독후감을 책 상세화면과 독후감 화면에서 조회할 수 있습니다.
  - **상태별 책 목록 조회** : 각 상태에 해당하는 책이 몇 권 있는지 확인할 수 있고, 상태별 책 목록을 확인할 수 있습니다.

  
    
## Preview


![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/40848918/101899912-e92b0580-3bf1-11eb-95c3-bcd2b4ae1888.gif)
![ezgif com-gif-maker (11)](https://user-images.githubusercontent.com/40848918/101899910-e8926f00-3bf1-11eb-9a02-1965a41d6053.gif)
![ezgif com-gif-maker (9)](https://user-images.githubusercontent.com/40848918/101899906-e6301500-3bf1-11eb-84b5-e58a9d96788c.gif)
![ezgif com-gif-maker (8)](https://user-images.githubusercontent.com/40848918/101899909-e7f9d880-3bf1-11eb-940a-339dc9a37e45.gif)




## Installation

1. local 환경에 레파지토리를 clone 해주세요
```
$ git clone https://github.com/warmwhiten/imbook.git
$ cd imbook
```
2. 프로그램 실행을 위해 Expo Cli설치가 필요합니다. [expo installation](https://docs.expo.io/get-started/installation/)
```
$ npm install --global expo-cli
```
3. Expo cli가 설치되었으면 expo install 명령을 통해 의존성 모듈을 설치해주세요. 
```
$ expo install
```
4. expo start 명령을 통해 프로그램을 실행시킬 수 있습니다. 출력되는 qr코드를 모바일 디바이스에 인식하면 앱이 실행됩니다. 이 과정에는 모바일 디바이스에 expo 앱 설치가 필요합니다. 
```
$ expo start
```

## Dependencies
```
    "@react-native-community/masked-view": "0.1.10",
    "@react-navigation/bottom-tabs": "^5.11.2",
    "@react-navigation/drawer": "^5.11.4",
    "@react-navigation/native": "^5.8.10",
    "@react-navigation/stack": "^5.12.8",
    "expo": "^40.0.0",
    "expo-asset": "~8.2.1",
    "expo-file-system": "~9.3.0",
    "expo-image-manipulator": "~8.4.0",
    "expo-splash-screen": "~0.8.1",
    "expo-sqlite": "~8.5.0",
    "expo-status-bar": "~1.0.3",
    "expo-updates": "~0.4.1",
    "react": "16.13.1",
    "react-dom": "16.13.1",
    "react-native": "0.63.4",
    "react-native-gesture-handler": "~1.8.0",
    "react-native-reanimated": "~1.13.0",
    "react-native-safe-area-context": "3.1.9",
    "react-native-screens": "~2.15.0",
    "react-native-unimodules": "~0.12.0",
    "react-native-web": "~0.13.12"
```

## License
MIT License

Copyright (c) 2020 Dahee Kim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
