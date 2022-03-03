import { Avatar, VStack, Box, Center, Heading, Stack, HStack } from "native-base";
import { Ionicons, MaterialCommunityIcons, Zocial, AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

function ProfileCard() {
    return (
        <SafeAreaView>
            <Box backgroundColor='white' shadow={9} rounded="lg" maxWidth="90%" minHeight="80%" ml='5%'>

                <Center>
                    <VStack space={2} alignItems={{
                        base: "center",
                        md: "flex-start"
                    }}>
                        <Avatar mt='13%' bg="purple.600" alignSelf="center" size="2xl" source={{
                            uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
                        }}>
                            RB
                        </Avatar>

                        <Stack space={1}>
                            <Heading mt="2%" alignSelf='center' size="md" _light={{
                                color: "blue.900"
                            }} >
                                Cardiologist
                            </Heading>
                            <Heading size="md" alignSelf='center' _light={{ color: "blue.900" }} >
                                Dr.Anaya Chadha
                            </Heading>
                            <HStack mt='2%' alignSelf='center' >
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="star" size={24} color="black" />
                                <AntDesign name="staro" size={24} color="black" />
                            </HStack>

                            <HStack space={5} pt='5%' alignSelf='center' >
                                <Ionicons name="chatbubble-ellipses" size={40} color="black" />
                                <Ionicons name="call" size={40} color="black" />
                                <Ionicons name="videocam" size={40} color="black" />
                                <MaterialCommunityIcons name="map-marker" size={40} color="black" />
                            </HStack>
                            <Heading size="md" mt='7%' mb='2%'>About</Heading>
                            <Text>Dr.Anaya is a  renowned cardiologist🫀 at Nairobi Hospital based in Nairobi,Kenya.
                                {"\n"}
                                {"\n"}Feel free to contact me if in need of consultation.</Text>
                            <HStack mt='3%' space={2} mr='5%'>
                                <Zocial name="email" size={18} color="black" />
                                <Text>anayachadha@gmail.com</Text>
                            </HStack>
                            <HStack mt='3%' space={2}>
                                <Ionicons name="call" size={18} color="black" />

                                <Text>+254712345678</Text>
                            </HStack>

                        </Stack>
                    </VStack>
                </Center>;

            </Box>

        </SafeAreaView>
    );
};


export default ProfileCard;