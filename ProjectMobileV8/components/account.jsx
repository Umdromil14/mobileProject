import { InputWithLabel, ValidateButton } from "../tools/AllForForm";
import { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    Text,
    ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";
import { getUser, updateUser } from "../APIAccess/user";
import Header from "./header";
import { DARK_GREY, GREEN } from "../tools/constants";

/**
 * Account page displaying the data of the user
 *
 * @returns {JSX.Element} header of the application
 */
function Account({ navigation }) {

    // TODO utiliser un objet pour les infos
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getUser()
            .then((response) => {
                setUsername(response.username);
                if(response.firstname){
                    setFirstname(response.firstname);
                }
                if(response.lastname){
                    setLastname(response.lastname);
                }
                setEmail(response.email);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, []);

    return (
        <View
            style={{
                flexDirection: "column",
                flex: 1,
            }}
        >
            <Header />
            <View
                style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: DARK_GREY,
                    flex: 1,
                }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <InputWithLabel
                        label="Username"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: GREEN, marginTop: 15 },
                        ]}
                        placeholder="Username"
                        value={String(username)}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <InputWithLabel
                        label="First Name"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: GREEN },
                        ]}
                        placeholder="First Name"
                        value={String(firstname)}
                        onChangeText={(text) => setFirstname(text)}
                    />
                    <InputWithLabel
                        label="Last Name"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: GREEN },
                        ]}
                        placeholder="Last Name"
                        value= {String(lastname)}
                        onChangeText={(text) => setLastname(text)}
                    />
                    <InputWithLabel
                        label="Email"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: GREEN },
                        ]}
                        placeholder="Email"
                        value={String(email)}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <ValidateButton
                        title="Modify"
                        containerStyle={globalStyles.modifyButtonContainer}
                        onPress={() => updateUser({username, firstname, lastname, email})}
                    />
                    <Pressable
                        style={{
                            marginBottom: 20,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 125,
                            alignSelf: "center",
                        }}
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faGear}
                            size={30}
                            style={{ color: GREEN }}
                        />
                        <Text style={{ color: GREEN, fontSize: 20 }}>
                            Settings
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 100,
        alignSelf: "center",
    },
});

export default Account;