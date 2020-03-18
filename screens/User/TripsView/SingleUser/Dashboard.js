import React, { useState }  from 'react';
import {
    Text, 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Keyboard, 
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native'
import { useSelector } from 'react-redux'
import Input from '../../../../components/Input'
import Card from '../../../../components/Card'
import { Button } from 'react-native-elements'
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import BudgetBreakdownChart from '../../../../components/Charts/BudgetBreakdownChart'



const Dashboard = props =>{

 
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)
    const UserId = useSelector(state=> state.auth.userId)
    const bbLocation = firestore.collection('Trips').doc(selectedTrip)

    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`
    const Profile = `Profile${UserId}`
     useFirestoreConnect([
        { collection: 'Trips', doc: `${selectedTrip}`},
        { collection: 'Trips', 
            doc: `${selectedTrip}`, 
            subcollections: [{ collection: "BudgetBreakdown" }],
            storeAs: BudgetBreakdownData
        },
        {collection: 'Users', doc: UserId, storeAs: Profile}
    ]);

    
   

    const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
    const UserProfile = useSelector(state =>state.firestore.ordered[Profile])
    const getTrip  = useSelector(state =>state.firestore.data.userTrips[selectedTrip])
   
   const username = UserProfile[0].username

    const [airfareText, setAirfareText]= useState();
    const [transportationText, setTranportationText]= useState();
    const [lodgingText, setLodgingText]= useState();
    const [foodText, setFoodText]= useState();
    const [activitiesText, setActivitiesText]= useState();
    const [emergencyText, setEmergencyText]= useState();
    const [miscText, setMiscText]= useState();
    const [total, setTotal] = useState()
    const[textColor, setTextColor] = useState('black')

      const currentFormTotal = () =>{
         
        
          const currentTotal =  parseInt(airfareText) + parseInt(transportationText) + parseInt(lodgingText) + parseInt(foodText) +
          parseInt(activitiesText) + parseInt(emergencyText) + parseInt(miscText)

          if (Number.isNaN(currentTotal)){
              
              return setTotal(0)
          }

         setTotal(parseInt(currentTotal)) 

         getTrip.totalBudget === currentTotal ? (setTextColor('green')):(console.log(setTextColor('red')))
      }


    const submitBudget = async() =>{
        
    if (getTrip.totalBudget === total){


       try{    
           await bbLocation.collection("BudgetBreakdown").doc(selectedTrip).set({
                Airfare: parseInt(airfareText),
                Tranportation: parseInt(transportationText),
                Lodging: parseInt(lodgingText),
                "Food & Drink": parseInt(foodText),
                Activities: parseInt(activitiesText),
                Emergency: parseInt(emergencyText),
                Misc: parseInt(miscText)
            })
            console.log('after post to DB')
         } catch (err) {
             console.log(err)
         }
     }else{
        BudgetFormInstructions()
     }

    }
    const BudgetFormInstructions = press =>{
        
        Alert.alert(
            'Form Error',
            'Please verify your desired budget by category equals your total trip budget to continue',
            [
                {text: 'Ok',
                onPress: ()=>console.log('Ok Pressed, Alert Closed')
                }
            ]
        )
    }

    if(!isLoaded(BudgetData)){
        return (<View style={styles.Loadingscreen}>
                    <ActivityIndicator  
                        size="large"
                    /> 
                </View>)
    }
  
    if(isEmpty(BudgetData)){
        return(
            
            <TouchableWithoutFeedback 
            onPress={()=> 
            Keyboard.dismiss()}>
                    <KeyboardAvoidingView 
                    style={{flex:1}}
                    behavior="padding"
                    keyboardVerticalOffset={15}
                    >
                    <ScrollView>
                        <View style={styles.screen}>    
                            <Card stlye={styles.card}>
                                <View style={styles.center}>
                                    <Text style={styles.cardHeader}>Budget by Category</Text>
                                 </View>
    
                                 <View style={styles.totalContainer}>
                                    <View style={styles.formTotal}>
                                        <Text style={{color: textColor}}>Category Total: {total}</Text>
                                    </View>
                                    <View style={styles.databaseTotal}>
                                        <Text>Total Budget: {getTrip.totalBudget} </Text>
                                    </View>
                                
                                 </View>
                                 <View style={styles.container}>
                                    <View style={styles.inputContainer}>
                                        <Input
                                        label="Airfare ($)"
                                        placeholder='Enter value here...'
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setAirfareText(text)}
                                        value={airfareText}
                                        returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                        label="Transportation ($)"
                                        placeholder='enter 0 if not desired...'
                                        blurOnSubmit
                                        autoCorrect={true}
                                        keyboardType="number-pad"
                                        maxLength={50}
                                        onChangeText={(text)=> setTranportationText(text)}
                                        value={transportationText}
                                        returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Lodging ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setLodgingText(text)}
                                            value={lodgingText}
                                            returnKeyType='next'
                                        />
                                    </View>
                            
                            
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Food and Drink ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setFoodText(text)}
                                            value={foodText}
                                            returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Activities ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setActivitiesText(text)}
                                            value={activitiesText}
                                            returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Emergency ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setEmergencyText(text)}
                                            value={emergencyText}
                                            returnKeyType='next'
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <Input
                                            label="Miscellaneous ($)"
                                            placeholder=''
                                            blurOnSubmit
                                            autoCorrect={true}
                                            keyboardType="number-pad"
                                            maxLength={50}
                                            onChangeText={(text)=> setMiscText(text)}
                                            value={miscText}
                                            returnKeyType='done'
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button 
                                    type="outline"
                                    title="Continue"
                                    onPress = {submitBudget}
                                    />
                                    <Button 
                                    type="outline"
                                    title="Calculate"
                                    onPress = {currentFormTotal}
                                />
                                </View>
                         </View>
                    </Card>
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
        
     )}
     
   if(isLoaded(BudgetData && <BudgetBreakdownChart/> && UserProfile)) {
   return(
    
    

<ScrollView>
    <View style={styles.screen}>  
    
        <View style={styles.banner}>
            <Text>Welcome {username} </Text>
        </View>  
    
       
        <View style={styles.chartContainer}>
            <BudgetBreakdownChart/>
        </View>
        
           
    </View>
</ScrollView>
)
   }

}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginTop: 40,
      }, 
      Loadingscreen: {
        flex: 1,
        alignItems: 'center',
        marginTop: 40,
        justifyContent: 'center'
      }, 
      card: {
          marginTop: 40
      },
    center : {
        alignItems: 'center',
    },
    cardHeader : {
        fontSize: 20,
        marginBottom: 10
    },
    totalContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTotal: {
        marginBottom: 10
    },
    databaseTotal: {
        marginBottom: 10
    },
    container: {
        width: 300,
        maxWidth: '80%',
        padding: 20, 

    },
    inputContainer: {
        width: '100%',
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    chartContainer: {
        justifyContent: 'center',
        width:'100%',
    },
    banner:{
        marginTop: 30
    }
})

export default Dashboard;