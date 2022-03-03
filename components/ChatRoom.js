import { View, SafeAreaView, StyleSheet } from "react-native";
import { Channel, Chat, MessageInput, MessageList, OverlayProvider } from "stream-chat-expo";
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Header from "./Header"

const ChatRoom = ({ route }) => {
    const { channel, chatClient } = route.params
    const { bottom } = useSafeAreaInsets()

    return (
        <SafeAreaView>
            {/* <Header title={"Jack & Riley"} showIconBtn pt={2} /> */}
            <OverlayProvider bottomInset={bottom} topInset={0}>
                <Chat client={chatClient}>
                    <Channel channel={channel} keyboardVerticalOffset={0}>
                        <View style={StyleSheet.absoluteFill}>
                            <MessageList />
                            <MessageInput />
                        </View>
                    </Channel>
                </Chat>
            </OverlayProvider>
        </SafeAreaView>
    )
}

export default ChatRoom;