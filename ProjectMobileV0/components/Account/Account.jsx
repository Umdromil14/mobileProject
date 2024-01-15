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
import Header from "../Global/Header";
import {
    GREEN,
    ERROR_JWT_MESSAGE,
    USERNAME,
    FIRSTNAME,
    LASTNAME,
    EMAIL,
    UNKNOW_ERROR,
} from "../../tools/constants";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width - 100,
        alignSelf: "center",
    },
    labelText: {
        paddingTop: 12,
        paddingLeft: 16,
        fontSize: 18,
        fontWeight: "bold",
        color: GREEN,
    },
});
/**
 * Account page displaying the data of the user
 *
 * @param {object} props
 * @param {object} props.navigation navigation object used to navigate between pages
 *
 * @returns {JSX.Element} header of the application
 */
function Account({ navigation }) {
    const token = useSelector((state) => state.token.token);
    const [userForm, setUserForm] = useState({
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
        getUser(token)
            .then((user) => {
                setUserForm(user);
            })
            .catch((error) => {
                if (error.response?.data?.code.includes("JWT")) {
                    navigation.navigate("SignIn", {
                        message: ERROR_JWT_MESSAGE,
                    });
                }
            });
    }, []);

    /**
     * Display the error message or clean if empty one
     *
     * @param {string} errorUsername error message for username
     * @param {string} errorMail error message for mail
     * @param {string} errorFirstname error message for firstname
     * @param {string} errorLastname error message for lastname
     *
     * @returns {void}
     */
    function displayError(
        errorUsername,
        errorMail,
        errorFirstname,
        errorLastname
    ) {
        setUserForm({
            ...userForm,
            errorUsername: errorUsername,
            errorMail: errorMail,
            errorFirstname: errorFirstname,
            errorLastname: errorLastname,
        });
    }

    /**
     * Modify the user
     *
     * @returns {void}
     */
    function modifyUser() {
        if (isValidForm(userForm, setUserForm, true)) {
            updateUser(userForm, token)
                .then(displayError)
                .catch((error) => {
                    if (error.response?.data?.code.includes("JWT")) {
                        navigation.navigate("SignIn", {
                            message: ERROR_JWT_MESSAGE,
                        });
                    } else if (
                        error.response?.data?.code.includes("DUPLICATE")
                    ) {
                        displayError(
                            "Username already taken",
                            "Email already taken"
                        );
                    } else {
                        displayError(UNKNOW_ERROR, UNKNOW_ERROR);
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
                <Text style={styles.labelText}>{USERNAME}</Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={userForm.errorUsername}
                    style={globalStyles.inputForm}
                    placeholder={USERNAME}
                    value={userForm.username}
                    onChangeText={(username) =>
                        setUserForm({ ...userForm, username })
                    }
                />
                <Text style={styles.labelText}>{FIRSTNAME}</Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={userForm.errorFirstname}
                    style={globalStyles.inputForm}
                    placeholder={FIRSTNAME}
                    value={userForm.firstname}
                    onChangeText={(firstname) =>
                        setUserForm({
                            ...userForm,
                            firstname: firstname.length > 0 ? firstname : null,
                        })
                    }
                />
                <Text style={styles.labelText}>{LASTNAME}</Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={userForm.errorLastname}
                    style={globalStyles.inputForm}
                    placeholder={LASTNAME}
                    value={userForm.lastname}
                    onChangeText={(lastname) =>
                        setUserForm({
                            ...userForm,
                            lastname: lastname.length > 0 ? lastname : null,
                        })
                    }
                />
                <Text style={styles.labelText}>{EMAIL}</Text>
                <Input
                    inputStyle={globalStyles.inputLabel}
                    inputContainerStyle={globalStyles.inputContainer}
                    errorStyle={globalStyles.error}
                    errorProps={globalStyles.errorProps}
                    errorMessage={userForm.errorMail}
                    style={globalStyles.inputForm}
                    placeholder={EMAIL}
                    value={userForm.email}
                    onChangeText={(email) =>
                        setUserForm({ ...userForm, email })
                    }
                />
                <Button
                    title="Modify"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={globalStyles.button}
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

export default Account;
