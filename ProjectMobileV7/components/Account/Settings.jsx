import { Text, View, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faArrowRightFromBracket, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../../APIAccess/user";
import Header from "../header";
import { GREEN } from "../../tools/constants";

/**
 * Settings of the application
 *
 * @returns {JSX.Element} settings of the application
 */
function Settings({ navigation }) {
    return (
        <View
            style={{
                flexDirection: 'column'
            }}
        >
            <Header />
            <View style={{ padding: 10 }}>
                <Pressable onPress={navigation.goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: GREEN }} />
                </Pressable>
                <View style={[globalStyles.containerInsideView, styles.containerButton, { flexDirection: "column" }]}>
                    <Pressable style={{
                        marginBottom: 100,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: 150,
                        alignSelf: "center"
                    }}
                        onPress={() => navigation.navigate('SignIn')}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size={30} style={{ color: GREEN }} />
                        <Text style={{ color: GREEN, fontSize: 20 }}>Disconnect</Text>
                    </Pressable>
                    <Pressable style={{
                        marginBottom: 100,
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        width: 200,
                        alignSelf: "center"
                    }} onPress={deleteUser()}>
                        <FontAwesomeIcon icon={faTrashCan} size={30} style={{ color: "#CC1616" }} />
                        <Text style={{ color: "#CC1616", fontSize: 20 }}>Delete Account</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerButton: {
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