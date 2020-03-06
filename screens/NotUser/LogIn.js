import React from 'react';
import {
    Text, 
    View, 
    Button, 
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard

} from 'react-native'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Colors from '../../constants/colors';

const LogIn = props => {
    const { navigation } = props


    return(
    <ImageBackground 
            source={require('../../assets/images/LogInBackground.jpg')}
            style={styles.backgroundImage}>

        <TouchableWithoutFeedback 
            onPress={()=> 
                Keyboard.dismiss()}>

            <View style={styles.screen}>
                <Card style={styles.card}>
                    <View style={styles.center}>
                        <Text style={styles.cardHeader}>Log In</Text>
                    </View>
                    <View style={styles.container}>
                        <Input
                        style={styles.input}
                        label="Username"
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={30}
                        // onChangeText={}
                        // value={}
                        />
                        
                        <Input 
                        style={styles.input}
                        label="Password"
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="default"
                        maxLength={30}
                        // onChangeText={}
                        // value={}
                        />
                       
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button
                                title="Sign In"
                                color= {Colors.primary}
                                accessibilityLabel = "Sign In"
                                
                            />
                        </View>

                        <View style={styles.button}>
                            <Button 
                                title="Cancel"
                                color= {Colors.accent}
                                accessibilityLabel = "Cancel"
                                onPress={()=>props.navigation.navigate('Home')}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                            title="Dummy Login"
                           
                            />
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    </ImageBackground>

    )
}



const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      marginTop: 40,
      opacity: 0.9
    }, 
    center : {
        alignItems: 'center',
    },
    container: {
        width: 300,
        maxWidth: '100%',
        padding: 20, 
    },
    card: {
        maxWidth: '80%',
    },
    cardHeader : {
        fontSize: 20
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 0.8
     },
     input: {
        width: '100%',
        textAlign: 'center'
    
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 100
      },
})

export default LogIn;