import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import { Input, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { Radio, Icon as NIcon, useToast, IconButton } from "native-base"
import validator from "validator";
// import { connect } from "getstream"

// 1.Choose btw doctor and patient

// Doctor
// patient

// 2. Additional Doctor details
// hospital
// location
// speciality
// bio
// image***

// 3. Additional patient details
// image
// blood type
// gender
// weight


// const client = connect("8mcg3k4hm39k")

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(true);
    const toast = useToast();
    const [error, setError] = useState(null);
    const toastRef = useRef();
    

    const viewPass = () => setShow(!show);
    const pushNavigation = () => {
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
        } else if (validator.isEmpty(confirmPassword)) {
            setError("Confirm Password is empty");
            return false;
        } else if (validator.isEmpty(role)) {
            setError("Choose a role");
            return false;
        } else if (password.trim() !== confirmPassword.trim()) {
            setError("Passwords don't match");
            return false
        } else {
            const data = { email, password };
            if (role === "doctor") {
                navigation.navigate("DoctorRegister", { data })
            } else if (role === "patient") {
                navigation.navigate("PatientRegister", { data })
            }
        }
    }

    useEffect(() => {
        if (error) {
            showMessage(error)
        }
    }, [error])

    const showMessage = (errMessage) => {
        toastRef.current = toast.show({
            title: errMessage,
            placement: "top",
        });
    }



    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Create an Account</Text>
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
                        secureTextEntry={show}
                        autoCapitalize="none"
                        color="#14213d"
                        placeholder="Your Password"
                        onChangeText={(val) => setPassword(val)}
                        leftIcon={
                            <Icon type="font-awesome" name="lock" size={20} color="#14213d" />
                        }
                        rightIcon={<IconButton onPress={viewPass} colorScheme={"light"} icon={<NIcon as={Feather} name={show ? "eye-off" : "eye"} size={5} />} />}
                    />
                </View>
                <View style={styles.action}>
                    <Text style={styles.input_label}>
                        Confirm Password
                    </Text>
                    <Input
                        style={styles.text_input}
                        secureTextEntry={show}
                        autoCapitalize="none"
                        color="#14213d"
                        placeholder="Confirm Password"
                        onChangeText={(val) => setConfirmPassword(val)}
                        leftIcon={
                            <Icon type="font-awesome" name="lock" size={20} color="#14213d" />
                        }
                        rightIcon={<IconButton onPress={viewPass} colorScheme={"light"} icon={<NIcon as={Feather} name={show ? "eye-off" : "eye"} size={5} />} />}
                    />
                </View>
                <Text style={styles.input_label}>
                    Choose Role
                </Text>
                <Radio.Group name="exampleGroup" accessibilityLabel="Select role" onChange={val => setRole(val)}>
                    <View style={styles.radio_container} >
                        <Radio value="doctor" colorScheme="teal" size="sm" mr={2}>
                            Doctor
                        </Radio>
                        <Radio value="patient" colorScheme="green" size="sm">
                            Patient
                        </Radio>
                    </View>
                </Radio.Group>
                <TouchableOpacity onPress={pushNavigation} >
                    <LinearGradient
                        style={styles.signIn}
                        colors={["#2c7da0", "#98c1d9"]}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#98c1d9",
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
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    header: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 15,
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
        fontSize: 12,
        width: "100%",
        paddingHorizontal: 2,
    },
    radio_container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        marginTop: 8,
    },
    input_label: {
        color: "#14213d",
        fontSize: 12,
    }
});
