import { Box, Button, Icon } from "native-base";
import Accordion from "../../components/Accordion";
import Header from "../../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import sample_notes from "../../utils/sample_notes";

const Notes = () => {
    const height = Dimensions.get("window").height;
    const navigation = useNavigation();
    const AddNoteBtn = () => (
        <Button
            leftIcon={<Icon as={MaterialIcons} name="add-circle-outline" size={5} />}
            onPress={() => navigation.navigate("AddNote")}
        >
            Add Note
        </Button>
    );

    return (
        <Box pt={height * 0.06} bg={"white"} px={"6"} w={"full"} h={"full"}>
            <Header title={"Notes"} ActionButton={AddNoteBtn} mb={6} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {sample_notes.map(({ title, description }, i) => (
                    <Accordion title={title} description={description} key={i} />
                ))}
            </ScrollView>
        </Box>
    );
};

export default Notes;
