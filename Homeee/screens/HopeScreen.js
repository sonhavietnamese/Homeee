import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { createStackNavigator } from "@react-navigation/stack";
import RBSheet from "react-native-raw-bottom-sheet";

import FindPeopleAround from './FindPeopleAround';
import DiaryScreen from './DiaryScreen';
import PlanScreen from './PlanScreen';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { string } from '../strings/en';
class Hope extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };
    }

    componentDidMount() {
        const userId = auth().currentUser.uid;
        database().ref('Users/' + userId).on('value', snapshot => this.setState({ username: snapshot.val().userName }))
    }

    handleFindButton = () => {
        this.props.navigation.navigate('FindPeopleAroundScreen')
    }

    moveToDiaryScreen = () => {
        this.props.navigation.navigate('DiaryScreen')
    }

    moveToPlanScreen = () => {
        this.props.navigation.navigate('PlanScreen')
    }

    render() {
        const { username } = this.state
        return (
            <View style={styles.container}>
                <View>
                    <Text>{string.goodMorning}</Text>
                    <Text> {username} </Text>
                </View>
                <TouchableOpacity onPress={() => this.Scrollable.open()} style={styles.find}>
                    <Text>{string.findHomemate}</Text>
                </TouchableOpacity>
                <RBSheet
                    ref={ref => {
                        this.Scrollable = ref;
                    }}
                    closeOnDragDown
                    customStyles={{
                        container: {
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                    height={550}
                    duration={350}
                >
                    <ScrollView>
                        <FindPeopleAround />
                    </ScrollView>
                </RBSheet>
                <TouchableOpacity onPress={this.moveToDiaryScreen} style={styles.find}>
                    <Text style={styles.buttonText} > {string.diary} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.moveToPlanScreen} style={styles.find}>
                    <Text style={styles.buttonText} > {string.plan} </Text>
                </TouchableOpacity>
            </View >
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    headerText: {
        fontSize: 14,
        fontFamily: 'sofialight'
    },
    username: {
        fontSize: 16,
        fontFamily: 'Sofiabold'
    },
    find: {
        height: 25,
        width: 150,
        backgroundColor: 'pink',
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'sofialight'
    }
});

const Stack = createStackNavigator();

function HopeScreen() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='HopeScreen' component={Hope} />
            <Stack.Screen name='FindPeopleAroundScreen' component={FindPeopleAround} />
            <Stack.Screen name='DiaryScreen' component={DiaryScreen} />
            <Stack.Screen name='PlanScreen' component={PlanScreen} />
        </Stack.Navigator>
    )
}

export default HopeScreen;