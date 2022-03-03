import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';


const Landing = ({ navigation }) => {
    return (

        <View style={styles.container}>
            <View
                style={styles.header}
            >
                <Animatable.Image
                    animation='bounceIn'
                    duration={1500}
                    source={require('../images/logo.jpeg')}
                    style={styles.logo}
                    resizeMode='stretch'>

                </Animatable.Image>

            </View>
            <Animatable.View
                style={styles.footer}
                animation={'fadeInUpBig'}
            >
                <Text style={styles.title}>RemeD</Text>
                <Text style={styles.text}>We provide quality Healthcare at the touch of a button</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.push('Login')}
                    >
                        <LinearGradient
                            colors={['#98c1d9', '#2c7da0']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get Started</Text>
                            <MaterialIcons
                                name='navigate-next'
                                color='#fff'
                                size={20}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default Landing;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#98c1d9',
        height: '100%',
    },
    text: {
        color: '#00b4d8',
        fontSize: 18,
        fontFamily: 'Poppins'
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    title: {
        color: '#335c67',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'Poppins'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        width: height_logo,
        height: height_logo,
        borderRadius: 100,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 25,


    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
