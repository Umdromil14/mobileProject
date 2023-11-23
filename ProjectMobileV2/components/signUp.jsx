import {
    Image,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    SafeAreaView,
    Text,
} from "react-native";
import { Input, Button } from "@rneui/themed";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { InputWithLabel, ValidateButton } from "../tools/AllForForm";
import { useEffect, useRef, useState } from "react";
import { globalStyles } from "../styles/globalStyles";
import logo from "../images/logo.png";
import { postUser } from "../APIAccess/user";
import { isValidForm } from "../tools/isValidForm";
import { createRef } from "react";

function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMail, setErrorMail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorUsername, setErrorUsername] = useState("");
    const [errorFirstname, setErrorFirstname] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [viewStyle, setViewStyle] = useState(styles.form);
    // const test = useRef();
    // function print() {
    //     console.log(test);
    // }

    
    function changeError(func, e) {
        func(e.target.errorMessage);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={globalStyles.background}>
                <Image style={styles.tinyLogo} source={logo} />
                <View style={viewStyle}>

                    <InputWithLabel
                        label="First name"
                        placeholder="First name"
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={errorFirstname}
                    />
                    <InputWithLabel
                        label="Last name"
                        placeholder="Last name"
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={errorLastname}
                    />

                    <InputWithLabel
                        label="Username*"
                        placeholder="Username"
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                        errorMessage={errorUsername}
                    />
                    <InputWithLabel
                        label="Email*"
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        leftIcon={
                            <FontAwesomeIcon icon={faEnvelope} size={24} />
                        }
                        errorMessage={errorMail}
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                    />
                    <InputWithLabel
                        label="Password*"
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
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
                        errorMessage={errorPassword}
                    />
                    <InputWithLabel
                        label="Repeat Password*"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChangeText={(text) => setRepeatPassword(text)}
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
                <ValidateButton
                    title="register"
                    onPress={async () => {
                        const isValid = await isValidForm(
                            changeError,
                            {
                                setErrorMail,
                                setErrorPassword,
                                setErrorUsername,
                                setErrorFirstname,
                                setErrorLastname,
                                setViewStyle,
                            },
                            username,
                            email,
                            styles.form,
                            true,
                            password,
                            repeatPassword,
                            firstname,
                            lastname
                        );
                        if (isValid) {
                            await postUser({
                                firstname: firstname.trim(),
                                lastname: lastname.trim(),
                                username: username.trim(),
                                email: email.trim(),
                                password: password.trim(),
                                repeatPassword: repeatPassword.trim(),
                            },
                            changeError,
                            {
                                setErrorMail,
                                setErrorUsername,
                            }
                            );
                        }
                    }}
                />

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
                        navigation.navigate("SignIn");
                    }}
                />
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 250,
        height: 250,
    },
    form: {
        backgroundColor: "#59A52C",
        borderRadius: 20,
        height: 640,
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
