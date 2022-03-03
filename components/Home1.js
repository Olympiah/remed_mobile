import { useState, useEffect } from "react"
import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from "react-native"
import tw from "tailwind-react-native-classnames"
import { MaterialCommunityIcons, Feather, FontAwesome, MaterialIcons, AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import { doc, getDoc, onSnapshot, collection } from "@firebase/firestore"
import useAuth from "../hooks/useAuth"
import { db } from "../utils/firebase"
import Loader from "./Loader"
import users_filter from "../utils/users_filter"
import sample_users from "../utils/sample_users"


const HomeScreen = () => {
    const { logout, user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(sample_users);
    const [loadingUsers, setLoadingUsers] = useState(true);


    useEffect(() => {
        const fetchProfile = async () => {
            const profileRef = doc(db, "users", user.uid);
            const profileSnap = await getDoc(profileRef);
            setProfile({ id: profileSnap.id, ...profileSnap.data() })
            setLoading(false);
        }
        fetchProfile();
    }, [db])

    useEffect(() =>
        onSnapshot(
            collection(db, "users"),
            (snapshot) => {
                setUsers(
                    snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
                );
                setLoadingUsers(false);
            }
        ),
        []
    )




    return loading ? (
        <Loader />
    ) : (
        <View style={styles.container}>
            <LinearGradient colors={["#ECE9E6", "#fff"]} style={{ flex: 1 }} >
                <View style={tw`px-4 pt-8 h-full`} >
                    {/* AppBar  */}
                    <View style={tw`flex flex-row justify-between items-start`} >
                        <View style={tw`flex-row`}>
                            {/* Avatar Image */}
                            <Image source={{ uri: profile?.image }} style={styles.image} />
                            {/* Description */}
                            <View style={tw`ml-4`}>
                                <Text style={styles.appBarText1} >Hello 👋🏾</Text>
                                <Text style={styles.appBarText2} >{`${profile.isDoctor ? "Dr. " : ""} ${profile?.name}`}</Text>
                            </View>
                        </View>
                        {/* Hamburger Icon */}
                        <TouchableOpacity onPress={logout}>
                            <View style={styles.appBarIcon} >
                                <AntDesign name="logout" size={24} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* Search */}
                    <View style={[tw`my-5 p-2 bg-white`, styles.search]} >
                        <Feather name="search" size={18} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={profile.isDoctor ? "Search Patient ..." : "Search Doctor ..."}
                        />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <View style={tw`flex-row items-center justify-between mt-3 mb-5`} >
                            {/* Services */}
                            {/* Icon1 */}
                            <ServiceItem text={"Drugs"} Icon={MaterialCommunityIcons} iconName={"pill"} />
                            <ServiceItem text={"Virus"} Icon={MaterialCommunityIcons} iconName="virus" />
                            <ServiceItem text={"Pyscho"} Icon={FontAwesome} iconName={"heartbeat"} />
                            <ServiceItem text={"Other"} Icon={MaterialCommunityIcons} iconName="shield-plus" />
                        </View>
                        {/* Doctors*/}
                        <SectionTitle title={profile.isDoctor ? "Patients" : "Find your Doctor"} pushPage={profile.isDoctor ? "Patients" : "Doctors"} profile={profile} />
                        {loadingUsers ? (
                            <Loader />
                        ) : (
                            <View>
                                {profile.isDoctor ? (
                                    <View>
                                        {users_filter(users, profile.isDoctor).map(userInfo => (
                                            <PatientItem key={userInfo.id} userInfo={userInfo} />
                                        ))}
                                    </View>
                                ) : (
                                    <View>
                                        {users_filter(users, profile.isDoctor).map(userInfo => (
                                            <DoctorItem key={userInfo.id} userInfo={userInfo} />
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </LinearGradient>
        </View>
    )
}

const SectionTitle = ({ title, pushPage = "Home1", profile = null }) => {
    const navigation = useNavigation()
    return (
        <View style={[tw`flex flex-row justify-between items-center px-2`]}>
            {/* Text1 */}
            <Text style={styles.sectionText1}>{title}</Text>
            {/* Text2 */}
            <TouchableOpacity onPress={() => navigation.navigate(pushPage, { profile })}>
                <Text style={styles.sectionText2}>See all</Text>
            </TouchableOpacity>
        </View>
    );
}

const ServiceItem = ({ text, Icon, iconName }) => {
    return (
        <View style={tw`items-center`} >
            {/* Icon */}
            <View style={styles.serviceIconBackground} >
                <Icon name={iconName} size={35} color={"#64dfdf"} />
            </View>
            {/* Text */}
            <Text style={styles.serviceText} >{text}</Text>
        </View>
    )
}

const PatientItem = ({ userInfo }) => {
    const navigation = useNavigation()
    return (
        <View style={tw`flex-row justify-between items-center my-2`} >
            <Image
                source={{ uri: userInfo?.image }}
                style={styles.docImage}
            />
            <Text style={styles.docText1}>{userInfo?.name}</Text>
            {/* Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('PatientProfile', { userInfo })} >
                <MaterialIcons name={"arrow-forward-ios"} size={26} />
            </TouchableOpacity>
        </View>
    )
}

const DoctorItem = ({ userInfo }) => {
    const navigation = useNavigation()
    return (
        <View style={tw`flex-row justify-between items-center my-4`} >
            <View style={tw`flex flex-row items-start`} >
                <Image
                    source={{ uri: userInfo?.image }}
                    style={styles.docImage}
                />
                <View style={tw`ml-3`} >
                    <Text style={styles.docText1}>Dr. {userInfo?.name}</Text>
                    <Text style={styles.docText2}>{userInfo?.speciality}</Text>
                </View>
            </View>
            {/* Icon */}
            <TouchableOpacity onPress={() => navigation.navigate('DoctorProfile', { userInfo })} >
                <MaterialIcons name={"arrow-forward-ios"} size={22} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 18,
    },
    appBarText1: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 4,
        fontFamily: "Poppins",
    },
    appBarText2: {
        fontSize: 14,
        fontFamily: "Poppins",
    },
    appBarIcon: {
        width: 40,
        height: 40,
        borderRadius: 18,
        backgroundColor: "#CFDEF3",
        justifyContent: "center",
        alignItems: "center",
    },
    search: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 23,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    searchInput: {
        width: "90%",
        paddingLeft: 6,
        fontSize: 14,
        color: "#6b705c",
        fontFamily: "Poppins"
    },
    sectionText1: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "Poppins",
    },
    sectionText2: {
        fontSize: 12,
        color: "#f72585",
        fontFamily: "Poppins"
    },
    upcoming: {
        borderRadius: 23,
        height: 150,
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 10,
    },
    upcomingImage: {
        height: 50,
        width: 50,
        borderRadius: 18,
    },
    upcomingText1: {
        fontSize: 17,
        fontWeight: "800",
        color: "#dee2e6",
        marginBottom: 4,
    },
    upcomingText2: {
        fontSize: 12,
        fontWeight: "200",
        color: "#e9ecef",
    },
    upcomingDetailsContainer: {
        backgroundColor: "#48cae4",
        borderRadius: 18,
        height: 40,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: 20,
    },
    upcomingDetailsText: {
        fontSize: 12,
        fontWeight: "300",
        color: "white",
    },
    serviceIconBackground: {
        backgroundColor: "#edf6f9",
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 60,
        borderRadius: 18,
    },
    serviceText: {
        fontSize: 11,
        fontWeight: "200",
        marginTop: 2,
        fontFamily: "Poppins"
    },
    docImage: {
        height: 55,
        width: 55,
        borderRadius: 18,
    },
    docText1: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#023047",
        marginBottom: 10,
        fontFamily: "Poppins"
    },
    docText2: {
        fontSize: 13,
        color: "#8e9aaf",
        fontFamily: "Poppins"
    }
})


export default HomeScreen;