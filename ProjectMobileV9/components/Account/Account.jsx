import { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    ScrollView,
} from "react-native";
import { isValidForm } from "../../tools/isValidForm";
import { Input, Button, Text } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../../styles/globalStyles";
import { getUser, updateUser } from "../../APIAccess/user";
import Header from "../Header";
import { GREEN } from "../../tools/constants";

/**
 * Account page displaying the data of the user
 *
 * @returns {JSX.Element} header of the application
 */
function Account({ navigation }) {
    const [form, setForm] = useState({
        username: undefined,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        errorUsername: undefined,
        errorFirstname: undefined,
        errorLastname: undefined,
        errorMail: undefined,
    });

    useEffect(() => {
        getUser()
            .then((response) => {
                setForm(response);
            })
            .catch((error) => {
                if (error.response?.data?.code.includes("JWT")) {
                    navigation.navigate("SignIn",{disconnect: true});
                }
            });
    }, []);

    function displayError(
        errorUsername,
        errorMail,
        errorFirstname,
        errorLastname
    ) {
        setForm({
            ...form,
            errorUsername: errorUsername,
            errorMail: errorMail,
            errorFirstname: errorFirstname,
            errorLastname: errorLastname,
        });
    }

    function modifyUser() {
        if (isValidForm(form, setForm, true)) {
            updateUser(form)
                .then(displayError)
                .catch((error) => {
                    if (error.response?.data?.code.includes("JWT")) {
                        navigation.navigate("SignIn",{disconnect: true});
                    } else if (
                        error.response?.data?.code.includes("DUPLICATE")
                    ) {
                        displayError(
                            "Username already taken",
                            "Email already taken"
                        );
                    } else {
                        displayError("An error occured", "An error occured");
                    }
                });
        }
    }

    return (
        <View
            style={{
                flexDirection: "column",
                flex: 1,
            }}
        >
            <Header />
            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    { paddingVertical: 10 },
                ]}
            >
                <Text style={[globalStyles.textForm, { color: GREEN }]}>
                    Username
                </Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={form.errorUsername}
                    style={globalStyles.inputForm}
                    placeholder="Username"
                    value={form.username}
                    onChangeText={(username) =>
                        setForm({ ...form, username: username })
                    }
                />
                <Text style={[globalStyles.textForm, { color: GREEN }]}>
                    Firstname
                </Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={form.errorFirstname}
                    style={globalStyles.inputForm}
                    placeholder="First Name"
                    value={form.firstname}
                    onChangeText={(firstname) =>
                        setForm({
                            ...form,
                            firstname: firstname.length > 0 ? firstname : null,
                        })
                    }
                />
                <Text style={[globalStyles.textForm, { color: GREEN }]}>
                    Lastname
                </Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={form.errorLastname}
                    style={globalStyles.inputForm}
                    placeholder="Last Name"
                    value={form.lastname}
                    onChangeText={(lastname) =>
                        setForm({
                            ...form,
                            lastname: lastname.length > 0 ? lastname : null,
                        })
                    }
                />
                <Text style={[globalStyles.textForm, { color: GREEN }]}>
                    Email
                </Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={form.errorMail}
                    style={globalStyles.inputForm}
                    placeholder="Email"
                    value={form.email}
                    onChangeText={(email) => setForm({ ...form, email: email })}
                />
                <Button
                    title="Modify"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "#59A52C",
                        borderWidth: 0,
                        borderRadius: 20,
                    }}
                    containerStyle={globalStyles.modifyButtonContainer}
                    onPress={modifyUser}
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
                    <Text style={{ color: GREEN, fontSize: 20 }}>Settings</Text>
                </Pressable>
            </ScrollView>
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
