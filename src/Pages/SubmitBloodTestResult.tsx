import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BasicInput, Lottie, StandardText , StandartButton} from '../Components';
import { GeneralState, LabResultsState } from '../Redux';
import { General } from '../Redux/States/General/GeneralSlice';
import LottieAnimations from '../Theme/LottieAnimations';
import { dictionary } from '../Utils/Texts';

const SubmitBloodTestResult = () => {
    const [temp, setTemp] = useState<boolean>(false);
    const [testName, setTestName] = useState<string>('');
    const [testValue, setTestValue] = useState<number>(0);
    const dispatch = useDispatch();
    const labResultsStatus =  useSelector(GeneralState.Selectors.selectBloodTestDataStatus);

    const handlePress = async() => {
        //ADD VALIDATION!!
        dispatch(LabResultsState.Actions.setBloodTestInputs({testName,testValue}));
        await dispatch(LabResultsState.Thunks.getLabResults(()=> {
          console.log('dddddddddddddddddddddd',labResultsStatus)
          setTemp(labResultsStatus)
        }));
    }
  
  return (
    <SafeAreaView style={styles.flex}>
      <StatusBar />
        <View style={styles.centerFlex}>
            <StandardText >{dictionary.header}</StandardText>
        </View>
        <View style={styles.centerFlex}>
            <BasicInput 
            onChange ={setTestName}
            style={styles.standartScale} 
            placeholder={dictionary.placeHolders.testName}/>
        </View>
        <View style={styles.centerFlex}>
            <BasicInput 
            onChange ={setTestValue}
            style={styles.standartScale} 
            type={'numeric'} 
            placeholder={dictionary.placeHolders.value}/>
        </View>
      <View style={styles.bigScale}>
        <StandartButton 
        onPress={handlePress} 
        type={'regular'}>
          {dictionary.pressMe}
        </StandartButton>
      </View>
        <View style={styles.bigScale}>
       { temp && 
       <>
        <StandardText >{dictionary.header}</StandardText>
        <Lottie
          animation={LottieAnimations.smile}
          style={styles.standartScale}
          skipAnimation={false}
        />
       </>
       }
        </View>
    
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    centerFlex:{
        flex:1,
        justifyContent:'center', alignItems:'center'
    },
    flex:{
        flex:1,
    },
    standartScale:{
        height:'50%',width:'70%'
    },
    bigScale:{
        flex:2, justifyContent:'center', alignItems:'center'
    }
})


export default SubmitBloodTestResult;



