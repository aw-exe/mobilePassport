import React from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import { VictoryPie, VictoryBar, VictoryGroup, VictoryChart, VictoryLabel} from 'victory-native';
import { useFirestoreConnect, useFirestore, isLoaded, isEmpty  } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Tooltip, Text } from 'react-native-elements';




const BudgetBreakdownChart = () =>{
    const firestore = useFirestore();
    const selectedTrip = useSelector(state=> state.tripID.id)

    const BudgetBreakdownData = `BudgetBreakdownData${selectedTrip}`

    useFirestoreConnect([{ collection: 'Trips', doc: `${selectedTrip}`},
    { collection: 'Trips', 
    doc: `${selectedTrip}`, 
    subcollections: [{ collection: "BudgetBreakdown" }],
    storeAs: BudgetBreakdownData
   }
   ]);
   const BudgetData = useSelector(state =>state.firestore.ordered[BudgetBreakdownData])
  const TripBudgetObj = BudgetData[0]
  
   console.log('Budget Data Budget Data Budget Data')
   console.log(BudgetData)
   console.log('Budget Data Budget Data Budget Data')
   console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log(TripBudgetObj)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
   
   const colorsArray = [ "tomato", "orange", "gold", "cyan", "navy", "green", "red" ]


        Object.keys(TripBudgetObj).forEach(key => {
            if (TripBudgetObj[key]=== 0) delete TripBudgetObj[key];
            if (TripBudgetObj[key]=== selectedTrip) delete TripBudgetObj[key]
          });

        const xkeys = Object.keys(TripBudgetObj);
        const BudgetDataArr = xkeys.map(key => {
        return {x: key, y: TripBudgetObj[key]};
        })
     


        

if(!isLoaded(BudgetData)){
    return(
        <View style={styles.screen}>
            <ActivityIndicator  size="large"/> 
        </View>)
}
if(isEmpty(BudgetData)){
    return(<View>
                <Text>ERROR: No Budget Data to present</Text>
            </View>)
}
return(
    <View>

    <View style={styles.PiechartContainer} >
    <Tooltip 
        popover={<Text>This is a breakdown of your set budget by category</Text>}
        backgroundColor="#aeced1"
        width={200}
        height={100}
        >
            <VictoryPie
            width={380}
                data={BudgetDataArr}
                colorScale={colorsArray}
                innerRadius={50}
                // PAD ANDLE FOR SPACING BETWEEN SEGMENTS
                padAngle={2}
                padding={100}
                
                
            />
    </Tooltip>
    </View>
    <View style={styles.chartContainer}>
    <Tooltip 
    popover={<Text>This a breakdown by cateogry of your budget, expenses and savings </Text>}
    backgroundColor="#aeced1"
    width={200}
    height={100}
    >
        <VictoryChart
        padding={80}>
            <VictoryGroup offset={20}
                colorScale={"qualitative"}
                
            >
                <VictoryBar
                    data={BudgetDataArr}
                />
                <VictoryBar
                    data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
                />
                <VictoryBar
                    data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
                />
            </VictoryGroup>
        </VictoryChart>
    </Tooltip>
    </View>
    </View>

)
}


const styles = StyleSheet.create({
   
      PiechartContainer: {
          alignItems:'center',
          justifyContent: 'center'
          
      },
      legendContainer:{
          alignItems: 'center',
          padding: 0,
          margin: 0
      }
      
})

export default BudgetBreakdownChart;