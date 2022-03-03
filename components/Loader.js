import {View} from "react-native"
import { Spinner } from "native-base"

const Loader = () => (
    <View style={{ flex: 1, justifyContent:"center", alignItems:"center" }}>
        <Spinner color={"indigo.500"} size={"lg"} />
    </View>
)

export default Loader;