import React, { useState } from 'react';
// import React, { Component } from 'react';
import {
    Text, 
    View,
    StyleSheet,
    // Image, 
    // Dimensions,
    TouchableOpacity,
    ImageBackground, 
} from 'react-native';
import { Button } from 'react-native-elements';

// const {width, height} = Dimensions.get('window')

// class Home extends Component {
//     render() {
//         return (
//             <View style={{flex:1, backgroundcolor: 'white', justifyContent: 'flex-end'}}>
//                 <View style={{...StyleSheet.absoluteFill }}>
//                     <Image
//                         source={require('../../assets/images/HomeScreenBackground.jpg')}
//                         style={{ flex:1, height: null, width: null }}
//                     />
//                 </View>
//                 <View style={{height: height / 3}}>
                
//                 <View style={{...styles.button, backgroundcolor:'#cb81e6', opacity: 0.9 }}>
//                     <Text style={{fontSize: 20, fontWeight: 'bold'}}> Sign In</Text>
//                 </View>

//                 <View style={{...styles.button,  backgroundColor: "purple", opacity: 0.9 }}>
//                     <Text style={{fontSize: 20, fontWeight: 'bold'}}> Create Account</Text>
//                 </View>

//                 </View>
//             </View>
//         )
//     }
// }


// const styles = StyleSheet.create ({
//     container: {
//         flex: 1, 
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     button: {
//         backgroundColor: 'white',
//         height: 70,
//         marginHorizontal: 20,
//         borderRadius: 35,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// })

const Home = props => {

    const { navigation } = props
   
    return(
    <ImageBackground 
         source={require('../../assets/images/HomeScreenBackground.jpg')}
        style={styles.backgroundImage}
    >
     <View style={styles.screen}>
            
        <View style= {styles.welcome}>  
            <Text>
                Welcome To Passport
            </Text>
        </View>  
         
        <View style={styles.buttonContainer}>
            <TouchableOpacity>
                <Button  
                    title="Sign Up"
                    type="solid"
                    onPress={()=> props.navigation.navigate('NewUser') }
                    buttonStyle={styles.newUserButton}
                />
                <Button  
                     title="Log In"
                     type="solid"
                     buttonStyle={styles.logInButton}
                     onPress={()=> props.navigation.navigate('LogIn') }
                />
            </TouchableOpacity>
        </View>
     </View>
     </ImageBackground>
        )
    }

 const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
      }, 
      welcome: {
        marginTop: 150,
        fontSize: 50
      },
      buttonContainer: {
          marginBottom: 50
      },
      newUserButton: {
          marginBottom: 8,
          backgroundColor: "purple",
          opacity: 0.9
      },
      logInButton:{
        backgroundColor: '#cb81e6',
        opacity: 0.9
      },
     backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8
        }
      });

export default Home