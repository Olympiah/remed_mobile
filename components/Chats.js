import { useState, useEffect, useLayoutEffect } from "react"
import { View, Text, Pressable, Modal, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { StreamChat } from "stream-chat"
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";

const filters = {};
const options = {
    limit: 20,
    messages_limit: 30,
    state: true,
    watch: true
}
const sort = { last_message_at: -1 };

const generateId = len => {
    var result = '';
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charLen = chars.length;
    for (var i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLen));
    }
    return result;
}

const CustomPreviewTitle = ({ channel }) => (
    <Text>
        {channel.data.name} - {channel.data.description}
    </Text>
);

const chatClient = StreamChat.getInstance("8mcg3k4hm39k");

const ChatScreen = ({ navigation }) => {

    const user = {
        id: "jack",
        name: "Jack"
    }

    const [channelKey, setChannelKey] = useState(1);

    // Modal Create Channel
    const [modalVisible, setModalVisible] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');


    // Header 
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => modalVisible ? null : <CreateButton onPress={() => setModalVisible(!modalVisible)} />,
            headerLeft: () => null,
        });
    }, [navigation, modalVisible]);

    const CreateButton = ({ onPress }) => (
        <TouchableOpacity onPress={onPress} >
            <View style={styles.createBtn}>
                <Text style={styles.createText}>Create</Text>
            </View>
        </TouchableOpacity>
    )

    useEffect(() => {
        const connectStreamUser = async () => {
            try {
                await chatClient.connectUser(
                    user,
                    chatClient.devToken(user.id)
                );
                console.log("Logged In");
                setChannelKey(channelKey + 1);
            } catch (err) {
                console.log("Stream Connect Err" + err);
            }
        }
        if (!chatClient.userID) {
            connectStreamUser();
        }
    }, []);

    async function createChatRoom() {
        const channel = chatClient.channel("messaging", generateId(8), {
            name: roomName,
            description: description,
        });

        try {
            await channel.create()
        } catch (err) {
            console.log("Channel Create Err" + err);
        }

        setModalVisible(!modalVisible);
        setRoomName("");
        setDescription("");
    }

    const handleCancel = () => setModalVisible(false);

    return (
        <OverlayProvider>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Create Chat Room</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setRoomName}
                            value={roomName}
                            placeholder="Chat Room Name"
                        />
                        <TextInput
                            style={styles.inputMultiline}
                            onChangeText={setDescription}
                            value={description}
                            multiline
                            numberOfLines={4}
                            maxLength={100}
                            placeholder="Short Description"
                        />
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonCancel]}
                                onPress={handleCancel}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    createChatRoom();
                                }}>
                                <Text style={styles.textStyle}>Create Room</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Chat client={chatClient}>
                <ChannelList
                    key={channelKey}
                    PreviewTitle={CustomPreviewTitle}
                    filters={filters}
                    options={options}
                    sort={sort}
                    onSelect={channel => navigation.navigate("ChatRoom", { channel: channel, chatClient: chatClient, name: channel.data.name })}
                />
            </Chat>
        </OverlayProvider>
    )

}

export default ChatScreen;

const styles = StyleSheet.create({
    createBtn: {
        width: 50,
        height: 20,
        backgroundColor: "blue",
        borderRadius: 18,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    createText: {
        color: "white",
        fontSize: 12,
    },
    input: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 0.2,
        padding: 5,
    },
    inputMultiline: {
        padding: 5,
        width: 200,
        height: 80,
        margin: 12,
        borderWidth: 0.2,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
