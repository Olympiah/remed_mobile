import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import useAuth from "../hooks/useAuth";

const Home = ({ navigation }) => {
    const { logout } = useAuth();
    return (
        <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Home1')}>
                <LinearGradient
                    style={styles.btn}
                    colors={["#2c7da0", "#98c1d9"]}
                >
                    <Text style={styles.btnText}>Home1</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Notes')}>
                <LinearGradient
                    style={styles.btn}
                    colors={["#2c7da0", "#98c1d9"]}
                >
                    <Text style={styles.btnText}>Notes</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Doc')}>
                <LinearGradient
                    style={styles.btn}
                    colors={["#2c7da0", "#98c1d9"]}
                >
                    <Text style={styles.btnText}>Doctor Profile</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PatientProfile')}>
                <LinearGradient
                    style={styles.btn}
                    colors={["#2c7da0", "#98c1d9"]}
                >
                    <Text style={styles.btnText}>Patient Profile</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Chats')}>
                <LinearGradient
                    style={styles.btn}
                    colors={["#2c7da0", "#98c1d9"]}
                >
                    <Text style={styles.btnText}>Chats</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
                <LinearGradient
                    style={styles.btn}
                    colors={["#2c7da0", "#98c1d9"]}
                >
                    <Text style={styles.btnText}>Logout</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
        marginTop: 25,
    },
    btnText: {
        color: "white",
        fontWeight: "bold",
    },
})

export default Home; 
