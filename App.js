import React, { useEffect, useState } from 'react';
import MainStackNavigator from './navigation/MainStackNavigation'
import UserNavigation from "./navigation/UserNavigation";
import { Provider, useSelector } from 'react-redux';
// import RNFirebase from 'react-native-firebase';
// import 'firebase/firestore';
import { Text, View } from 'react-native'
import { ReactReduxFirebaseProvider, useFirestoreConnect, isLoaded, useFirestore  } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import createStore from './store';
import firebaseConfig from './config/firebase-config';
import rrfConfig from './config/rrf-config';
import firebase from 'firebase';
import '@firebase/firestore';

//Animated Home Screen Imports Start
// import { Asset } from 'expo';
// import { AppLoading } from 'expo';
// import Home from './screens/NotUser/Home';
// //Animated Home Screen Imports End

import {decode, encode} from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }

//Animated Home Screen Start

// function cacheImages(images) {
//   return images.map(image => {
//     if (typeof image === 'string') {
//       return Image.prefetch(image);
//     } else {
//       return Asset.fromModule(image).downloadAsync();
//     }
//   });
// }

// export default class App extends React.Component{
//   constructor(){
//       super()
//       this.state = {
//           isReady: false
//       }
//   }

//   async _loadAssetsAsync() {
//       const imageAssets = cacheImages([
       
//         require('../../assets/images/HomeScreenBackground.jpg'),
//       ]);
  
  
//       await Promise.all([...imageAssets]);
//     }

//   return(){
//       if (!this.state.isReady) {
//           return (
//             <AppLoading
//               startAsync={this._loadAssetsAsync}
//               onFinish={() => this.setState({ isReady: true })}
//               onError={console.warn}
//             />
//           );
//         }
    
//       return<Home />
//   }
// }

//Animated Home Screen End




const initialState = {
  firebase: {
    authError: null,
  },
}

// console.log(firebaseConfig)

const store = createStore(initialState);

// store.subscribe(()=> console.log(store.getState()))

try {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  
} catch (err) {
  console.log(err)
};



// useFirestoreConnect([
//   { collection: 'Trips' },
// ]);
// const statuses = useSelector(state => state.firestore.ordered.Trips);



function DetermineView({ children }) {
  const auth = useSelector(state => state.auth.token)
  if (auth=== null) return <MainStackNavigator />;
  return <UserNavigation />
}


const App = () => {
  const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  };

  return (

    <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <DetermineView/>
    </ReactReduxFirebaseProvider>
</Provider>

    );



}

export default App;





