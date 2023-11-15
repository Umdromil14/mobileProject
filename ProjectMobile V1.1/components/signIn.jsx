import logo from "../images/logo.png";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import {Image,View,StyleSheet, Pressable} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock,faUser,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";



function SignIn({navigation}) {
    const [identifiant, setIdentifiant] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error,setError] = useState('');
    const [user,setUser] = useState({identifiant:'',password:''});
    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const changeerror = () => {
        setError('A');
    }

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
        </View>
        
        <ValidateButton
            title="Sign In"
            onPress={() => {
                // setUser({identifiant,password});
                // console.log(user);
                //pourquoi je dois appuyer 2 fois sur le bouton pour que le user s'update ?
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