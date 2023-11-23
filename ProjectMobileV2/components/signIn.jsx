import logo from "../images/logo.png";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import {Image,View,StyleSheet, Pressable} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock,faUser,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";
import { login } from "../APIAccess/user";
import { isValidUsername } from "../tools/utils";
import { cleaningError } from "../tools/isValidForm";

function SignIn({navigation}) {
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorPassword, setErrorPassword] = useState('');
    const [erroridentifiant, setErrorIdentifiant] = useState('');
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    function changeError(func, e) {
        func(e.target.errorMessage);
    };

    return(  
    <View style={globalStyles.background}>
        <Image style = {styles.tinyLogo} source={logo} />
        <View style = {styles.form}>
            <InputWithLabel
                label="Username or email"
                placeholder="Username or email"
                value={identifiant}
                onChangeText={text => setIdentifiant(text)}
                leftIcon={<FontAwesomeIcon icon={faUser} size={24} />}
                errorMessage={erroridentifiant}
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
                errorMessage={errorPassword}
            />         
        </View>
        
        <ValidateButton
            title="Sign In"
            onPress={() => {
                if (isValidUsername(identifiant)) {
                    login({username:identifiant,password},changeError,{setErrorIdentifiant,setErrorPassword})
                } else if (isValidEmail(identifiant)) {
                    login({email : identifiant,password},changeError,{setErrorIdentifiant,setErrorPassword})
                } else {
                    changeError(setErrorIdentifiant, {target: {errorMessage: "Invalid username or email"}})
                }
                navigation.navigate('Home');
            }}
        />
        <ValidateButton
            title="Create a account"
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
            onPress={() => {
                cleaningError(changeError,{setErrorIdentifiant, setErrorPassword});
                navigation.navigate('SignUp');
            }}
        />

    </View>
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
        height: 231,
        width: 300,
    },


});

export default SignIn;