import { Flex, Text, IconButton, Icon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const Header = ({ title, ActionButton, showIconBtn = true, ...rest }) => {
    const navigation = useNavigation()
    return (
        <Flex justify={'space-between'} direction={'row'} alignItems={'center'} {...rest} >
            {showIconBtn && (
                <IconButton
                    icon={<Icon as={<MaterialIcons name="arrow-back-ios" />}
                        size={5} />}
                    onPress={() => navigation.goBack()}
                />
            )}
            <Text fontWeight={'bold'} style={{ fontFamily: 'Poppins' }} fontSize={'18'}>{title}</Text>
            {ActionButton ? <ActionButton /> : <Text></Text>}
        </Flex>
    );
};

export default Header;
