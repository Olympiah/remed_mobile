import { useState, useEffect, useRef } from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    Dimensions,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { doc, setDoc, updateDoc, serverTimestamp } from "@firebase/firestore"
import { createUserWithEmailAndPassword } from "@firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage"
import { db, storage, auth } from "../../utils/firebase"
import { useRoute } from "@react-navigation/core"
import { Avatar } from 'react-native-elements';
import { IconButton, Icon as NIcon, useToast, Button, TextArea } from "native-base"
import { StreamChat } from "stream-chat"
import { Feather, MaterialIcons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import validator from "validator";

const chatClient = StreamChat.getInstance("8mcg3k4hm39k", "cb9emhwt8rdhzexqs7eqksnjz9usawn5fm5pwh435d2b35t283g74x9m7y6wyxcm");

const DoctorRegister = () => {
    const [name, setName] = useState("");
    const [hospital, setHospital] = useState("");
    const [location, setLocation] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [bio, setBio] = useState("");
    const route = useRoute();
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [showBioModal, setShowBioModal] = useState(false)
    const toastRef = useRef();
    const toast = useToast();
    const user = {
        id: "jack",
        name: "Jack"
    }

    useEffect(() => {
        const connectStreamUser = async () => {
            try {
                await chatClient.connectUser(
                    user,
                    chatClient.devToken(user.id)
                );
                console.log("Logged In");
            } catch (err) {
                console.log("Stream Connect Err" + err);
            }
        }
        if (!chatClient.userID) {
            connectStreamUser();
        }
    }, []);

    const { data: { email, password } } = route.params;

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

    const clickSubmit = async () => {
        const data = {
            email: email,
            name: name,
            hospital: hospital,
            location: location,
            speciality: speciality,
            isDoctor: true,
            bio: bio,
            created: serverTimestamp(),
        }

        if (validator.isEmpty(hospital)) {
            setError("Fill the hospital field");
            return false;
        } else if (validator.isEmpty(location)) {
            setError("Fill the location field");
            return false;
        } else if (validator.isEmpty(name)) {
            setError("Fill the name field");
            return false;
        } else if (validator.isEmpty(bio)) {
            setError("Fill the bio field");
            return false;
        }
        else if (validator.isEmpty(speciality)) {
            setError("Fill the location field");
            return false;
        } else if (!image) {
            setError("Pick a profile picture")
            return false;
        } else {
            /**
             * The function that loads the image for firebase pushing storage
             */

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    resolve(xhr.response);
                };
                xhr.onerror = function () {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = "blob";
                xhr.open("GET", image, true);
                xhr.send(null);
            })

            createUserWithEmailAndPassword(auth, email, password)
                .then(async userCred => {
                    const userRef = doc(db, "users", userCred.user.uid);
                    await setDoc(userRef, data);
                    await chatClient.upsertUser({
                        id: userCred.user.uid,
                        name: data.name,
                    })
                    const imageRef = ref(storage, `users/${userRef.id}`);
                    await uploadBytesResumable(imageRef, blob)
                        .then(async (snapshot) => {
                            const imageDownloadUrl = await getDownloadURL(imageRef);
                            await updateDoc(doc(db, "users", userRef.id), {
                                image: imageDownloadUrl
                            });
                        }).catch(err => console.log("upload " + err.message))
                })
        }
    }

    const selectImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    const handleCancel = () => setShowBioModal(false);


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Additional Info!</Text>
                <View>
                    <Avatar
                        rounded
                        source={{
                            uri: image ? image : 'https://i.pinimg.com/originals/db/40/43/db40433674a9ea8eee9206a49e59f62b.jpg',
                        }}
                        size="large"
                    />
                    <IconButton
                        colorScheme="teal"
                        icon={<NIcon as={Feather} name="camera" />}
                        _icon={{
                            size: "sm",
                        }}
                        onPress={selectImage}
                        position={"absolute"}
                        bottom={2}
                        left={55}
                        variant={"outline"}
                        borderRadius="full"
                        size={"sm"}
                    />
                </View>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <View style={styles.action} >
                    <Text style={styles.input_label}>  Name</Text>
                    <Input
                        style={styles.text_input}
                        color="#14213d"
                        placeholder="Anna Devley"
                        leftIcon={
                            <Icon type="font-awesome" name="user" size={20} color="#14213d" />
                        }
                        onChangeText={val => setName(val)}
                    />

                </View>
                <View style={styles.action} >
                    <Text style={styles.input_label}>  Hospital</Text>
                    <Input
                        style={styles.text_input}
                        color="#14213d"
                        placeholder="Aga Khan "
                        leftIcon={
                            <Icon type="font-awesome" name="h-square" size={20} color="#14213d" />
                        }
                        onChangeText={val => setHospital(val)}
                    />

                </View>
                <View style={styles.action} >
                    <Text style={styles.input_label}> Location</Text>
                    <Input
                        style={styles.text_input}
                        color="#14213d"
                        placeholder="Nairobi,Kenya"
                        leftIcon={
                            <Icon type="font-awesome" name="location-arrow" size={20} color="#14213d" />
                        }
                        onChangeText={val => setLocation(val)}
                    />

                </View>
                <View style={styles.action} >
                    <Text style={styles.input_label}> Speciality</Text>
                    <Input
                        style={styles.text_input}
                        color="#14213d"
                        placeholder="Cardiologist"
                        leftIcon={
                            <Icon type="font-awesome" name="user-md" size={20} color="#14213d" />
                        }
                        onChangeText={val => setSpeciality(val)}
                    />

                </View>
                <Button
                    leftIcon={<NIcon as={MaterialIcons} name="add-circle-outline" size={5} />}
                    onPress={() => setShowBioModal(true)}
                >
                    Add Bio
                </Button>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showBioModal}
                    onRequestClose={() => setShowBioModal(!showBioModal)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Add Bio</Text>
                            <TextArea
                                h={0.18 * Dimensions.get("screen").height}
                                placeholder={"Add a Short Description about you"}
                                w={"100%"}
                                style={{ fontFamily: "Poppins" }}
                                mb={5}
                                value={bio}
                                onChangeText={setBio}
                            />
                            <View style={styles.buttonContainer}>
                                <Pressable
                                    style={[styles.button, styles.buttonCancel]}
                                    onPress={handleCancel}>
                                    <Text style={styles.textStyle}>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity onPress={clickSubmit} >
                    <LinearGradient
                        style={styles.signIn}
                        colors={["#2c7da0", "#98c1d9"]}
                    >
                        <Text style={styles.textSign}>Sign Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </KeyboardAvoidingView>
    )
}

export default DoctorRegister;

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
        paddingVertical: 5,
        paddingHorizontal: 30,
        height: "100%"
    },
    header: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 5,
        alignItems: "center",
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
    uploadImg: {
        width: 50,
        height: 50,
        borderRadius: 999,
        marginTop: 10,
    },
    input_label: {
        color: "#14213d",
        fontSize: 16,
    },
    inputMultiline: {
        width: "100%",
        height: 120,
        borderWidth: 0.2,
        borderWidth: 2,
        borderColor: "gray",
        borderRadius: 16,
        marginBottom: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        width: "100%",
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: "100%",
        elevation: 5,
    },
    button: {
        borderRadius: 4,
        padding: 10,
        elevation: 2,
    },
    buttonCancel: {
        backgroundColor: '#888888',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: 200,
    },
})