import logo from "../images/logo.png";
import { Text, View, Dimensions, StatusBar, Image, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRightFromBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Settings({ navigation }){
    return (
        <View
            style={{
                flexDirection: 'column',
                height: Dimensions.get('window').height
            }}
        >
            <View style={{backgroundColor: '#443D3D', flex: 10}}>
                <StatusBar
                    backgroundColor={'#443D3D'}
                    hidden={false}
                />
                <Image
                    style={globalStyles.tinyLogo}
                    source={logo}
                />
            </View>
            <View style={{backgroundColor: '#2C2C2C', flex: 70, justifyContent:"space-between"}}>
                <View style={styles.container}>
                    <Pressable onPress={navigation.goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size={40} style={{color: "#59A52C"}}/>
                    </Pressable>
                    <View style={[styles.container, styles.containerButton]}>
                        <Pressable style={{
                            marginBottom: 100, 
                            flexDirection: 'row', 
                            justifyContent: "space-between", 
                            width: 150, 
                            alignSelf: "center"
                        }} onPress={() => navigation.navigate('SignIn')}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} size={30} style={{color: "#59A52C"}}/>
                            <Text style={{color:"#59A52C", fontSize: 20}}>Disconnect</Text>
                        </Pressable> 
                        <Pressable style={{
                            marginBottom: 100, 
                            flexDirection: 'row', 
                            justifyContent: "space-between", 
                            width: 200, 
                            alignSelf: "center"
                        }}>
                            <FontAwesomeIcon icon={faTrashCan} size={30} style={{color: "#CC1616"}}/>
                            <Text style={{color:"#CC1616", fontSize: 20}}>Delete Account</Text>
                        </Pressable> 
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 50,
        marginTop: 20,
        alignSelf: "center"
    },
    containerButton:{
        marginTop: 100
    },
    buttonContainer: {
        width: 200,
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 15
    }
});

export default Settings;