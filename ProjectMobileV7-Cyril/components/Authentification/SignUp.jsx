import {
    Image,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    SafeAreaView,
    Alert,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { InputWithLabel, ValidateButton } from "../../tools/AllForForm";
import { useState } from "react";
import { globalStyles } from "../../styles/globalStyles";
import logo from "../../images/logo.png";
import { connection, postUser } from "../../APIAccess/user";
import { isValidForm } from "../../tools/isValidForm";

function SignUp({ navigation }) {
    const [form, setForm] = useState({
        username: undefined,
        email: undefined,
        password: undefined,
        repeatPassword: undefined,
        firstname: undefined,
        lastname: undefined,
        errorFirstname: "",
        errorLastname: "",
        errorUsername: "",
        errorMail: "",
        errorPassword: "",
        viewStyle: styles.form,
    });
    const [showPassword, setShowPassword] = useState(false);

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

    function register() {
        if (isValidForm(form, setForm)) {
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
                    if (err.response?.data?.message.includes("username") || err.response?.data?.message.includes("email")) {
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

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={globalStyles.background}>
                <Image style={styles.tinyLogo} source={logo} />
                <View style={form.viewStyle}>
                    <InputWithLabel
                        label="First name"
                        placeholder="First name"
                        value={form.firstname}
                        onChangeText={(text) =>
                            setForm({ ...form, firstname: text })
                        }
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={form.errorFirstname}
                    />
                    <InputWithLabel
                        label="Last name"
                        placeholder="Last name"
                        value={form.lastname}
                        onChangeText={(text) =>
                            setForm({ ...form, lastname: text })
                        }
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={form.errorLastname}
                    />

                    <InputWithLabel
                        label="Username*"
                        placeholder="Username"
                        value={form.username}
                        onChangeText={(text) =>
                            setForm({ ...form, username: text })
                        }
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={form.errorUsername}
                    />
                    <InputWithLabel
                        label="Email*"
                        placeholder="Email"
                        value={form.email}
                        onChangeText={(text) =>
                            setForm({ ...form, email: text })
                        }
                        leftIcon={
                            <FontAwesomeIcon icon={faEnvelope} size={24} />
                        }
                        errorMessage={form.errorMail}
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                    />
                    <InputWithLabel
                        label="Password*"
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
                    />
                    <InputWithLabel
                        label="Repeat Password*"
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
                </View>
                <ValidateButton title="register" onPress={register} />

                <ValidateButton
                    title="Already have an account ?"
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
        height: 680,
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
