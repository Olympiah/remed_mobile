import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Input, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect, useRef } from "react";
import validator from "validator";
import { useToast, IconButton, Icon as NIcon } from "native-base"
import { Feather } from "@expo/vector-icons"

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showHidePass, setShowHidePass] = useState(true);
    const [error, setError] = useState(null)
    const toast = useToast();
    const toastRef = useRef();

    const viewPass = () => setShowHidePass(!showHidePass);

    useEffect(() => {
        if (error) {
            showMessage(error)
        }
    }, [error]);

    const showMessage = errMsg => {
        toastRef.current = toast.show({
            title: errMsg,
            placement: "top",
        });
    }

    const clickSubmit = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (validator.isEmpty(email)) {
            setError("Email is empty");
            return false;
        }
        else if (!emailRegex.test(email.trim())) {
            setError("Email address is invalid");
            return false
        }
        else if (validator.isEmpty(password)) {
            setError("Password is empty")
            return false
        } else if (password.length < 6) {
            setError("Password must be atleast 6 characters");
            return false
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    // navigation.push("Home");
                    console.log("Login success")
                })
                .catch((err) => {
                    const errorCode = err.code;
                    const errorMessage = err.message;
                    console.log(
                        "Error in sign in message " + errorMessage + "error code " + errorCode
                    );
                });
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome Back!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={styles.action}>
                    <Text style={styles.input_label}>Email</Text>
                    <Input
                        style={styles.text_input}
                        autoCapitalize="none"
                        color="#14213d"
                        placeholder="jasonD@you.com"
                        onChangeText={val => setEmail(val)}
                        leftIcon={
                            <Icon type="material-community-icons" name="email" size={15} color="#14213d" />
                        }
                        textContentType={"emailAddress"}
                    />
                </View>
                <View style={styles.action}>
                    <Text style={styles.input_label}>
                        Password
                    </Text>
                    <Input
                        style={styles.text_input}
                        secureTextEntry={showHidePass}
                        autoCapitalize="none"
                        color="#14213d"
                        placeholder="Your Password"
                        onChangeText={(val) => setPassword(val)}
                        leftIcon={
                            <Icon type="font-awesome" name="lock" size={20} color="#14213d" />
                        }
                        rightIcon={<IconButton onPress={viewPass} colorScheme={"light"} icon={<NIcon as={Feather} name={showHidePass ? "eye-off" : "eye"} size={5} />} />}
                    />
                </View>

                <View style={styles.button}>
                    <TouchableOpacity onPress={clickSubmit}>
                        <LinearGradient
                            style={styles.signIn}
                            colors={["#2c7da0", "#98c1d9"]}
                        >
                            <Text style={styles.textSign}>SignIn</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.push("Register")}
                        style={[
                            styles.signIn,
                            {
                                borderColor: "#2c7da0",
                                borderWidth: 1,
                                marginTop: 15,
                            },
                        ]}
                    >
                        <Text
                            style={{
                                color: "#023047",
                                fontWeight: "bold",
                            }}
                        >
                            SignUp
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#98c1d9",
    },

    button: {
        marginTop: 20,
        width: "100%",
    },
    signIn: {
        height: 40,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
        marginTop: 25,
    },
    textSign: {
        color: "white",
        fontWeight: "bold",
    },

    footer: {
        flex: 3,
        backgroundColor: "#fff",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    text_header: {
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
    },
    text_footer: {
        color: "#14213d",
        fontSize: 18,
    },
    action: {
        borderBottomColor: "#f2f2f2",
    },
    text_input: {
        color: "#14213d",
        justifyContent: "flex-start",
        alignItems: "center",
        fontSize: 16,
        width: "100%",
        paddingHorizontal: 2,
    },
    input_label: {
        color: "#14213d",
        fontSize: 16,
    }
});
