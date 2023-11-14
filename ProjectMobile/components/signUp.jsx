import {Image,View,StyleSheet, Pressable, ScrollView, SafeAreaView} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock,faUser,faEye,faEyeSlash,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import { globalStyles } from "../styles/globalStyles";
import logo from "../images/logo.png";
import axios from 'axios';

const axiosInstance = axios.create({baseURL: 'http://localhost:3000/'});

function SignUp ({ navigation })
{
    const [Username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    };
    const changeerror = () => {
        setError('A');
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style = {globalStyles.background}>
                <Image style = {styles.tinyLogo} source={logo} />
                <View style = {styles.form}>
                    <InputWithLabel
                        label = "first name"
                        placeholder = "first name"
                        value={firstname}
                        onChangeText={text => setFirstname(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                    />
                    <InputWithLabel
                        label = "last name"
                        placeholder = "last name"
                        value={lastname}
                        onChangeText={text => setLastname(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                    />

                    <InputWithLabel
                        label="Username"
                        placeholder="Username"
                        value={Username}
                        onChangeText={text => setUsername(text)}
                        leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                    />
                    <InputWithLabel
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        leftIcon={<FontAwesomeIcon icon={faEnvelope} size={24} />}
                    />
                    <InputWithLabel
                        label="Password"
                        placeholder="Password"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        leftIcon={<FontAwesomeIcon icon={faLock} size={24}  />}
                        rightIcon={
                            <Pressable onPress={toggleShowPassword}>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={24}  />
                            </Pressable>
                        }
                        secureTextEntry={!showPassword}
                        onChange={changeerror}
                        errorMessage={error}
                    />
                    <InputWithLabel
                        label="Repeat Password"
                        placeholder="Repeat Password"
                        value={repeatPassword}
                        onChangeText={text => setRepeatPassword(text)}
                        leftIcon={<FontAwesomeIcon icon={faLock} size={24}  />}
                        rightIcon={
                            <Pressable onPress={toggleShowPassword}>
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={24}  />
                            </Pressable>
                        }
                        secureTextEntry={!showPassword}
                        onChange={changeerror}
                        errorMessage={error}
                    />
                </View>
                <ValidateButton
                        title="Sign Up"
                        onPress={() => {
                            console.log(Username);
                            console.log(firstname);
                            console.log(lastname);
                            
                        }}
                    />

                    <ValidateButton
                        title = "Already have an account ?"
                        buttonStyle={{
                            backgroundColor: '#0000',
                            borderWidth: 0,
                            borderRadius: 20,
                        }}
                        containerStyle={{
                            width: 200,
                            marginHorizontal: 50,
                            marginVertical: 10,
                        }}
                        onPress={
                            () => {
                                navigation.navigate('SignIn');
                            }
                        }
                    />
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 300,
        height: 300,
        top: 50,
    },
    form: {
        backgroundColor : "#59A52C",
        borderRadius: 20,
        padding: 10,
        height: 650,
        width: 300,
    },
    input : {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
    }


});
export default SignUp;