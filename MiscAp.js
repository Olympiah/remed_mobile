import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import ChatScreen from './components/Chats';
import ChatRoom from "./components/ChatRoom"

const Stack = createStackNavigator()

export default function App(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Chats" >
                <Stack.Screen name="Chats" component={ChatScreen} />
                <Stack.Screen name="ChatRoom" component={ChatRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

