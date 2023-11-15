import {
    Image,
    View,
    StyleSheet,
    Pressable,
    ScrollView,
    SafeAreaView,
    Text,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faLock,
    faUser,
    faEye,
    faEyeSlash,
    faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { InputWithLabel, ValidateButton } from "../tools/AllForForm";
import { useRef, useState, useEffect } from "react";
import { globalStyles } from "../styles/globalStyles";
import logo from "../images/logo.png";
import { postUser } from "../APIAccess/user";

function SignUp({ navigation }) {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [errorUsername, setErrorUsername] = useState("");

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={globalStyles.background}>
                <Image style={styles.tinyLogo} source={logo} />
                <View style={styles.form}>
                    <InputWithLabel
                        label="First name"
                        placeholder="First name"
                        value={firstname}
                        onChangeText={(text) => setFirstname(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                    />
                    <InputWithLabel
                        label="Last name"
                        placeholder="Last name"
                        value={lastname}
                        onChangeText={(text) => setLastname(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
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
                    <Text style={globalStyles.textForm}>* : obligatory statement </Text>
                </View>
                <ValidateButton
                    title="Sign Up"
                    onPress={async () => {
                        await postUser(
                            {
                                firstname,
                                lastname,
                                username,
                                email,
                                password,
                            },
                            {
                                errorMail,
                                setErrorMail,
                                errorPassword,
                                setErrorPassword,
                                errorUsername,
                                setErrorUsername,
                            }
                        );
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
        height: 660,
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
