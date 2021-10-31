import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, Alert, View, TextInput, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


function DisplayResScreen({route, navigation}) {


    const [refreshPage, setRefreshPage] = useState("");
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 15, marginBottom: 50, padding: 5}}>Addition Results</Text>
            <Text style={{
                fontSize: 25,
                color: 'red',
                marginBottom: 15
            }}>{route.params.totl == null ? 0 : JSON.stringify(route.params.totl)}</Text>
            <Button
                title="Try again"
                onPress={() => {
                    navigation.goBack()
                }}
            />
        </View>
    );
}

function AddInputScreen({navigation}) {
    const [leftOp, setNewNumber1] = useState(null
    );
    const [rightOp, setNewNumber2] = useState(null
    );
    const handleLeftOp = (enteredNumber) => {
        setNewNumber1(Number.parseInt(enteredNumber));
    };
    const handleRightOp = (enteredNumber) => {
        setNewNumber2(Number.parseInt(enteredNumber));
    };

    const [res, setRes] = useState(null);
    const addOps = () => {
        setRes(() => rightOp + leftOp);
    };
    useEffect(() => {
        addOps();

    });
    return (
        <View style={styles.container}>
            <Text style={styles.descriptionText}>Enter two numbers and hit 'Add' to get the calculated results</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={handleLeftOp}
                    value={leftOp ? leftOp.toString() : leftOp}
                />

                <Text style={styles.plusSign}>+</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    onChangeText={handleRightOp}
                    value={rightOp ? rightOp.toString() : rightOp}
                />


            </View>
            <Button onPress={() => {
                addOps();
                navigation.navigate('Results', {totl: res});
            }} title="Add"/>


        </View>

    );
}

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={AddInputScreen} options={{title: 'Addition Input'}}/>
                <Stack.Screen name="Results" component={DisplayResScreen} options={{title: 'Addition Results'}}/>
            </Stack.Navigator>
        </NavigationContainer>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        padding: 15,
        margin: 15,
        width: 50,
        height: 50,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        bottom: 20,
        margin: 20,
        padding: 10,
    },
    descriptionText: {
        fontSize: 15,
        marginTop: 50,
        padding: 5,

    },
    plusSign: {
        fontSize: 25,
        color: 'red',
        marginTop: 15,
    }
});

