import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useRoute, useNavigation } from "@react-navigation/native"
import {
    MaterialIcons,
    MaterialCommunityIcons,
    Fontisto,
} from "@expo/vector-icons";
import { Button, Icon } from "native-base"
import Header from "../../components/Header"
import { secToDate } from "../../utils/converters"

const PatientProfile = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { userInfo } = route.params;

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri: userInfo.image,
                }}
                style={styles.imageBackground}
                resizeMode={"cover"}
            />
            {/* Basic Details of the User */}
            <View style={styles.content} >
                <ScrollView showsVerticalScrollIndicator={false} style={[tw`px-4`]}>
                    <Card>
                        <View style={tw`flex-row justify-between`}>
                            <Button
                                leftIcon={<Icon as={MaterialIcons} name="add-circle-outline" size={5} />}
                                onPress={() => navigation.navigate("AddNote")}
                                size={"sm"}
                                colorScheme={"teal"}
                            >
                                Add Note
                            </Button>
                            <Button
                                leftIcon={<Icon as={MaterialIcons} name="add-circle-outline" size={5} />}
                                onPress={() => navigation.navigate("Notes")}
                                variant={"outline"}
                                size={"sm"}
                            >
                                View Notes
                            </Button>
                        </View>
                    </Card>
                    <Card>
                        <View style={tw`flex-row`}>
                            <Image
                                source={{
                                    uri: userInfo.image,
                                }}
                                style={styles.card1Image}
                            />
                            <View style={tw`ml-2`}>
                                {/* Name */}
                                <Text style={styles.text1} >{userInfo.name}</Text>
                                {/* Date of Acc Creation */}
                                <Text style={styles.text2} >Joined on {secToDate(userInfo.created.seconds)}</Text>
                            </View>
                        </View>
                        <IconText
                            Icon={MaterialCommunityIcons}
                            iconName="gender-male-female"
                            text={userInfo.gender}
                            iconBackgroundColor={"#8ecae6"}
                        />
                    </Card>
                    <Header title={"Details"} showIconBtn={false} ml={2} />
                    <Card>
                        <IconText
                            Icon={MaterialIcons}
                            iconName={"email"}
                            text={userInfo.email}
                            iconBackgroundColor={"#2d6a4f"}
                        />
                        <IconText
                            Icon={MaterialCommunityIcons}
                            iconName={"weight"}
                            text={`${userInfo.weight} Kg`}
                            iconBackgroundColor={"#023e8a"}
                        />
                        <IconText
                            Icon={Fontisto}
                            iconName={"blood"}
                            text={`${userInfo.bloodtype}`}
                            iconBackgroundColor={"#e07a5f"}
                        />
                    </Card>
                </ScrollView>
            </View>
        </View>
    );
};

const Card = ({ children }) => {
    return <View style={styles.card1}>{children}</View>;
};

const IconText = ({
    Icon,
    text,
    textFontSize = 12,
    textColor = "#333d29",
    iconBackgroundColor,
    iconName,
}) => {
    return (
        <View style={tw`flex-row my-2 items-center`}>
            <View
                style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}
            >
                <Icon name={iconName} size={22} color={"white"} />
            </View>
            <Text style={[tw`ml-5`, { color: textColor, fontSize: textFontSize, fontFamily:"Poppins" }]}>
                {text}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    imageBackground: {
        width: "100%",
        flex: 1,
    },
    card1: {
        width: "100%",
        height: "auto",
        borderRadius: 18,
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: "white",
        marginVertical: 8,
    },
    card1Image: {
        width: 50,
        height: 50,
        borderRadius: 999,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        flex: 2,
        borderTopRightRadius: 25,
        backgroundColor: "#f8f9fa",
        borderTopLeftRadius: 25,
        marginTop: -15,
    },
    text1: {
        fontSize: 16,
        color: "#023047",
        marginBottom: 5,
        marginTop: 3,
        fontWeight: "bold",
        fontFamily:"Poppins"
    },
    text2: {
        fontSize: 12,
        fontWeight: "200",
        color: "#8e9aaf",
        fontFamily:"Poppins"
    }
});

export default PatientProfile;
