import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons"
import ChatScreen from './components/Chats';
import ChatRoom from "./components/ChatRoom";
import Doc from "./components/Doc";
import Patient from "./components/Patient";
import Home1 from "./components/Home1";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Landing from "./screens/Landing";
import Doctors from "./screens/Doctors";
import Patients from "./screens/Patients";
import PatientRegister from "./screens/Register/PatientRegister";
import DoctorRegister from "./screens/Register/DoctorRegister";
import Notes from "./screens/Notes"
import MyProfile from "./screens/MyProfile"
import AddNote from "./screens/Notes/AddNote"
import useAuth from "./hooks/useAuth"
import DoctorProfile from "./screens/Profiles/DoctorProfile"
import PatientProfile from "./screens/Profiles/PatientProfile"
import Paypal from './components/Payment/Paypal'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();


const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home1">
            <Stack.Screen name="Home1" options={{ headerShown: false }} component={Home1} />
            <Stack.Screen name="DoctorProfile" options={{ headerShown: false }} component={DoctorProfile} />
            <Stack.Screen name="PatientProfile" options={{ headerShown: false }} component={PatientProfile} />
            <Stack.Screen name="Doctors" options={{ headerShown: false }} component={Doctors} />
            <Stack.Screen name="Patients" options={{ headerShown: false }} component={Patients} />
            <Stack.Screen name="Notes" options={{ headerShown: false }} component={Notes} />
            <Stack.Screen name="AddNote" options={{ headerShown: false }} component={AddNote} />
            <Stack.Screen name="Paypal" options={{ headerShown: false }} component={Paypal} />
        </Stack.Navigator>
    )
}

const ChatStack = () => {
    return (
        <Stack.Navigator initialRouteName="Chats">
            <Stack.Screen name="Chats" options={{ headerTitle: "Conversations" }} component={ChatScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
        </Stack.Navigator>
    )
}

const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MyProfile" options={{ headerShown: false }} component={MyProfile} />
        </Stack.Navigator>
    )
}

const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#fb8500",
                tabBarLabelStyle: { fontSize: 8 },
                tabBarShowLabel: false,
                tabBarStyle: { paddingVertical: 5, borderTopLeftRadius: 15, borderTopRightRadius: 15, height: 40 },
            }}
        >
            <Tab.Screen
                name={"Home"}
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <AntDesign
                            name="home"
                            color={color}
                            size={18}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={"Chat"}
                component={ChatStack}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            name="chatbubble-ellipses"
                            color={color}
                            size={18}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={"Profile"}
                component={ProfileStack}
                options={{
                    tabBarLabel: 'My Profile',
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="user"
                            color={color}
                            size={18}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
            <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
            <Stack.Screen options={{ headerShown: false }} name="PatientRegister" component={PatientRegister} />
            <Stack.Screen options={{ headerShown: false }} name="DoctorRegister" component={DoctorRegister} />
        </Stack.Navigator>
    )
}

export default function Navigator() {
    const { user } = useAuth();
    return (
        <Stack.Navigator>
            {user ? (
                <Stack.Screen options={{ headerShown: false }} name={"BottomTabs"} component={BottomTabs} />
            ) : (
                <Stack.Screen options={{ headerShown: false }} name={"AuthStack"} component={AuthStack} />
            )}
        </Stack.Navigator>
    )
}

/* 

export default function Navigator() {
    const { user } = useAuth();
    return (
        <Stack.Navigator initialRouteName="Landing" >
            {user ? (
                <Stack.Group>
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
                    <Stack.Screen name="Chats" options={{ headerTitle: "Conversations" }} component={ChatScreen} />
                    <Stack.Screen name="ChatRoom" component={ChatRoom} />
                    <Stack.Screen name="Notes" options={{ headerShown: false }} component={Notes} />
                    <Stack.Screen name="AddNote" options={{ headerShown: false }} component={AddNote} />
                    <Stack.Screen name="DoctorProfile" options={{ headerShown: false }} component={DoctorProfile} />
                    <Stack.Screen name="Doc" options={{ headerShown: false }} component={Doc} />
                    <Stack.Screen name="Patient" options={{ headerShown: false }} component={Patient} />
                    <Stack.Screen name="Home1" options={{ headerShown: false }} component={Home1} />
                    <Stack.Screen name="PatientProfile" options={{ headerShown: false }} component={PatientProfile} />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
                    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
                    <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
                    <Stack.Screen options={{ headerShown: false }} name="PatientRegister" component={PatientRegister} />
                    <Stack.Screen options={{ headerShown: false }} name="DoctorRegister" component={DoctorRegister} />
                </Stack.Group>
            )}
        </Stack.Navigator>
    )
}

 */