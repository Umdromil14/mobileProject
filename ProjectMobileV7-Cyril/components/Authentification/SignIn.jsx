import logo from "../../images/logo.png";
import { InputWithLabel, ValidateButton } from "../../tools/AllForForm";
import { useEffect, useState } from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faLock,
    faUser,
    faEye,
    faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../../styles/globalStyles";
import { connection } from "../../APIAccess/user";
import { isValidEmail, isValidUsername } from "../../tools/utils";

function SignIn({ navigation }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");
    const [erroridentifiant, setErrorIdentifiant] = useState("");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    function cleanError() {
        setErrorIdentifiant("");
        setErrorPassword("");
    }
    function cleanForm() {
        setLogin("");
        setPassword("");
    }

    function signIn() {
        cleanError();
        if (login && (isValidUsername(login) || isValidEmail(login))) {
            connection({ login, password })
                .then(() => {
                    cleanForm();
                    navigation.navigate("Home");
                })
                .catch((err) => {
                    err.response?.status === 401
                        ? setErrorPassword("Wrong username/email or password")
                        : setErrorPassword("An error occured");
                });
        } else {
            setErrorIdentifiant("Please enter a valid email or username");
        }
    }

    return (
        <View style={globalStyles.background}>
            <Image style={styles.tinyLogo} source={logo} />
            <View style={styles.form}>
                <InputWithLabel
                    label="identifiant"
                    placeholder="Username or email"
                    value={login}
                    onChangeText={(text) => setLogin(text)}
                    leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                    errorMessage={erroridentifiant}
                />
                <InputWithLabel
                    label="Password"
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
            </View>

            <ValidateButton title="Sign In" onPress={signIn} />
            <ValidateButton
                title="Create a account"
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
                    cleanError();
                    navigation.navigate("SignUp");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
        top: 50,
        marginBottom: 100,
    },
    form: {
        backgroundColor: "#59A52C",
        borderRadius: 20,
        padding: 10,
        height: 231,
        width: 300,
    },
});

export default SignIn;
