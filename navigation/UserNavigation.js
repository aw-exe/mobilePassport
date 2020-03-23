import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TripsScreen from '../screens/User/Trips';
import LocationServicesScreen from '../screens/User/LocationServices'
import AddTripScreen from '../screens/User/AddTrip';
import MyAccountScreen from '../screens/User/MyAccount'
import DrawerAvatar from '../components/DrawerAvatar'
import IndividualDashboardScreen from '../screens/User/TripsView/SingleUser/Dashboard'
import SavingsScreen from '../screens/User/TripsView/SingleUser/Savings'
import ExpensesScreen from '../screens/User/TripsView/SingleUser/Expenses'
import ItineraryScreen from '../screens/User/TripsView/SingleUser/Itinerary'
import MapsScreen from '../screens/User/MapScreen'
import RecentActivityScreen from '../screens/User/TripsView/SingleUser/RecentActivity'
import { Ionicons } from '@expo/vector-icons';
import  HeaderButton  from '../components/HeaderButton';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { ActivityIndicator, View } from 'react-native';






const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#cb81e6',
  },
};

const UserNavigation = () => {
  
  const UserId = useSelector(state=> state.auth.userId)
  const Profile = `Profile${UserId}`
  useFirestoreConnect([
      {collection: 'Users', doc: UserId, storeAs: 'Profile'}
  ]);

  const UserProfile = useSelector(state =>state.firestore.data[Profile])


  if(!isLoaded(UserProfile)){
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator 
        size="large"
      />
    </View>
  }
   
    return (
      <NavigationContainer theme={MyTheme}>
        <Drawer.Navigator 
          initialRouteName="Trips"
          drawerStyle={DrawerColor}
          drawerContent={props => DrawerAvatar({...props, UserProfile})}
          drawerContentOptions={DrawerOptions}>
              <Drawer.Screen name="My Account" component={MyAccountScreen} />
              <Drawer.Screen name="Trips" component={TripsPageNavigator} />
              <Drawer.Screen name="Location Services" component={LocationServicesScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    
    );
  }
 

const TripsPageNavigator = () =>{
  return(
  <Stack.Navigator >
        <Stack.Screen name="My Trips" component={TripsScreen} 
            options= {{
              headerTitle: 'My Trips',
              headerTitleStyle: {
                fontFamily: 'comfortaa-bold',
              },
              headerStyle: {
                backgroundColor: 'white',
              },
             }}
          />
        <Stack.Screen name="AddTrip" component={AddTripScreen} 
          options= {{
          headerTitle: 'Trip Builder',
          headerTitleStyle: {
            fontFamily: 'comfortaa-bold',
          },
          headerStyle: {
            backgroundColor: 'white',
          },
         }}/>
        <Stack.Screen name="MapsScreen" component={MapsScreen} 
          options={{
            headerTitle: 'Map',
            headerTitleStyle: {
              fontFamily: 'comfortaa-bold',
            },
            headerStyle: {
              backgroundColor: 'white',
            },
            headerRight: ()=>(<HeaderButton/>),}}/>
        <Stack.Screen name="DashNav" 
            component={DashboardNavigator} 
            options={{headerShown: false }}
          
            />
  </Stack.Navigator>
  )
}

const DashboardNavigator = () => {

  return(
    <Tab.Navigator
    options={({ route }) => ({ tripId: tripId })}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Savings') {
          iconName = focused
            ? 'ios-calculator': 'ios-calculator';
        } else if (route.name === 'Expenses') {
          iconName = focused ? 'md-pricetags' : 'md-pricetags';
        }else if(route.name === 'Dashboard'){
          iconName = focused ? 'md-list-box' :'md-list'
        }else if(route.name === 'Itinerary'){
          iconName = focused ? 'ios-calendar' :'ios-calendar'
        }else if(route.name === 'Add'){
          iconName = focused ? 'md-arrow-round-up' :'md-arrow-round-up'
        }else if(route.name === 'Actions'){
          iconName = focused ? 'ios-clipboard' : 'ios-clipboard'
        }
       
        return <Ionicons name={iconName} size={size} color={color} />;
      }

    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}
    >
    


      <Tab.Screen name="Dashboard" component={IndividualDashboardScreen}/>
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Savings" component={SavingsScreen} />
      <Tab.Screen name="Itinerary" component={ItineraryScreen} />
      <Tab.Screen name="Actions" component={RecentActivityScreen} />
    </Tab.Navigator>
  )
}



const DrawerColor = {
    backgroundColor: '#09cdf6', 
};

const DrawerOptions ={ 
    activeTintColor: 'white',
    inactiveTintColor: 'black', 
};

export default UserNavigation;