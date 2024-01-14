import {
    Image,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { Input, Button, Text } from "@rneui/themed";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import logo from "../../images/logo.png";
import { connection, postUser } from "../../APIAccess/user";
import { isValidForm } from "../../tools/isValidForm";

/**
 * Sign up page
 *
 * @param {object} props
 * @param {any} props.navigation
 *
 * @returns {JSX.Element}
 */
function SignUp({ navigation }) {
    const [form, setForm] = useState({
        username: null,
        email: null,
        password: null,
        repeatPassword: null,
        firstname: null,
        lastname: null,
        errorFirstname: "",
        errorLastname: "",
        errorUsername: "",
        errorMail: "",
        errorPassword: "",
        viewStyle: styles.form,
    });
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Clean the form
     *
     * @returns {void}
     */
    function cleanForm() {
        setForm({
            ...form,
            username: undefined,
            email: undefined,
            password: undefined,
            repeatPassword: undefined,
            firstname: undefined,
            lastname: undefined,
            viewStyle: styles.form,
        });
        cleanError();
    }

    /**
     * Clean the error message
     *
     * @returns {void}
     */
    function cleanError() {
        setForm({
            ...form,
            errorFirstname: "",
            errorLastname: "",
            errorUsername: "",
            errorMail: "",
            errorPassword: "",
        });
    }

    /**
     * Register the user
     *
     * @returns {void}
     */
    function register() {
        if (isValidForm(form, setForm,styles.form.height)) {
            postUser(form)
                .then(() => {
                    connection({
                        login: form.username,
                        password: form.password,
                    }).then(() => {
                        cleanForm();
                        navigation.navigate("Home");
                    });
                })
                .catch((err) => {
                    console.log(err.response?.data?.message);
                    if (
                        err.response?.data?.message.includes("username") ||
                        err.response?.data?.message.includes("email")
                    ) {
                        setForm({
                            ...form,
                            errorUsername:
                                "This username or email is already taken",
                            errorMail:
                                "This username or email is already taken",
                            errorFirstname: "",
                            errorLastname: "",
                            errorPassword: "",
                        });
                    } else {
                        setForm({
                            ...form,
                            errorPassword:
                                "An error occured, please try again later...",
                        });
                    }
                });
        }
    }

    /**
     * Toggle the password visibility
     *
     * @returns {void}
     */
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={globalStyles.background}>
                <Image style={styles.tinyLogo} source={logo} />
                <View style={form.viewStyle}>
                    <Text style={globalStyles.textForm}>First name</Text>
                    <Input
                        inputStyle={globalStyles.inputLabel}
                        inputContainerStyle={globalStyles.inputContainer}
                        placeholder="First name"
                        value={form.firstname}
                        onChangeText={(text) =>
                            setForm({
                                ...form,
                                firstname: text.length === 0 ? null : text,
                            })
                        }
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={form.errorFirstname}
                        errorStyle={globalStyles.error}
                    />
                    <Text style={globalStyles.textForm}>Last name</Text>
                    <Input
                        inputStyle={globalStyles.inputLabel}
                        inputContainerStyle={globalStyles.inputContainer}
                        placeholder="Last name"
                        value={form.lastname}
                        onChangeText={(text) =>
                            setForm({
                                ...form,
                                lastname: text.length === 0 ? null : text,
                            })
                        }
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={form.errorLastname}
                        errorStyle={globalStyles.error}
                    />
                    <Text style={globalStyles.textForm}>
                        Username
                        <Text style={{ color: "#cc0000" }}>*</Text>
                    </Text>
                    <Input
                        inputStyle={globalStyles.inputLabel}
                        inputContainerStyle={globalStyles.inputContainer}
                        placeholder="Username"
                        value={form.username}
                        onChangeText={(text) =>
                            setForm({ ...form, username: text })
                        }
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={form.errorUsername}
                        errorStyle={globalStyles.error}
                    />
                    <Text style={globalStyles.textForm}>
                        Email
                        <Text style={{ color: "#cc0000" }}>*</Text>
                    </Text>
                    <Input
                        inputStyle={globalStyles.inputLabel}
                        inputContainerStyle={globalStyles.inputContainer}
                        placeholder="Email"
                        value={form.email}
                        onChangeText={(text) =>
                            setForm({ ...form, email: text })
                        }
                        leftIcon={
                            <FontAwesomeIcon icon={faEnvelope} size={24} />
                        }
                        errorMessage={form.errorMail}
                        errorStyle={globalStyles.error}
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                    />
                    <Text style={globalStyles.textForm}>
                        Password
                        <Text style={{ color: "#cc0000" }}>*</Text>
                    </Text>

                    <Input
                        inputStyle={globalStyles.inputLabel}
                        inputContainerStyle={globalStyles.inputContainer}
                        placeholder="Password"
                        value={form.password}
                        onChangeText={(text) =>
                            setForm({ ...form, password: text })
                        }
                        leftIcon={<FontAwesomeIcon icon={faLock} size={24} />}
                        rightIcon={
                            <Pressable onPress={toggleShowPassword}>
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    size={24}
                                />
                            </Pressable>
                        }
                        secureTextEntry={!showPassword}
                        errorMessage={form.errorPassword}
                        errorStyle={globalStyles.error}
                    />
                    <Text style={globalStyles.textForm}>
                        Repeat Password
                        <Text style={{ color: "#cc0000" }}>*</Text>
                    </Text>
                    <Input
                        inputStyle={globalStyles.inputLabel}
                        inputContainerStyle={globalStyles.inputContainer}
                        placeholder="Repeat Password"
                        value={form.repeatPassword}
                        onChangeText={(text) =>
                            setForm({ ...form, repeatPassword: text })
                        }
                        leftIcon={<FontAwesomeIcon icon={faLock} size={24} />}
                        rightIcon={
                            <Pressable onPress={toggleShowPassword}>
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    size={24}
                                />
                            </Pressable>
                        }
                        secureTextEntry={!showPassword}
                    />
                    <Text style={{ color: "#cc0000" }}>* Required fields</Text>
                </View>
                <Button
                    title="Register"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "#59A52C",
                        borderWidth: 0,
                        borderRadius: 20,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                        paddingTop: 100,
                    }}
                    onPress={register}
                />
                <Button
                    title="Already have an account ?"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "#0000",
                        borderWidth: 0,
                        borderRadius: 20,
                    }}
                    containerStyle={{
                        width: 200,
                        marginHorizontal: 50,
                        marginVertical: 10,
                    }}
                    onPress={() => {
                        cleanForm();
                        navigation.navigate("SignIn");
                    }}
                />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        top: 50,
        width: 100,
        height: 100,
        marginBottom: 100,
    },
    form: {
        backgroundColor: "#59A52C",
        borderRadius: 20,
        height: 670,
        width: 300,
    },
    input: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
    },
});
export default SignUp;
