import logo from "../images/logo.png";
import { InputWithLabel, ValidateButton } from "../tools/AllForForm";
import { useEffect, useState } from "react";
import {
    Image,
    View,
    StyleSheet,
    Pressable,
    StatusBar,
    Dimensions,
    Text,
    ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";
import { getUser, updateUser } from "../APIAccess/user";
import Header from "./header";

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
                setFirstname(response.firstname);
                setLastname(response.lastname);
                setEmail(response.email);
            })
            .catch((error) => {
                // TODO afficher une erreur correctement
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
                    backgroundColor: "#2C2C2C",
                    flex: 1,
                }}
            >
                <ScrollView contentContainerStyle={styles.container}>
                    <InputWithLabel
                        label="Username"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: "#59A52C", marginTop: 15 },
                        ]}
                        placeholder="Username"
                        value={String(username)}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <InputWithLabel
                        label="First Name"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: "#59A52C" },
                        ]}
                        placeholder="First Name"
                        value={String(firstname)}
                        onChangeText={(text) => setFirstname(text)}
                    />
                    <InputWithLabel
                        label="Last Name"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: "#59A52C" },
                        ]}
                        placeholder="Last Name"
                        value= {String(lastname)}
                        onChangeText={(text) => setLastname(text)}
                    />
                    <InputWithLabel
                        label="Email"
                        labelStyle={[
                            globalStyles.textForm,
                            { color: "#59A52C" },
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
                            style={{ color: "#59A52C" }}
                        />
                        <Text style={{ color: "#59A52C", fontSize: 20 }}>
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