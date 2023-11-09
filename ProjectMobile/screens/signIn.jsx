import logo from "../images/logo.png";
import { globalStyles } from "../styles/globalStyles";
import { Input,Button } from '@rneui/themed';
import { useRef, useState } from "react";
import {Image,View,Text,StyleSheet, Pressable} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLock,faUser,faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function SignIn()
{
    const password = useRef();
    const identifiant = useRef();
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
    <View>
        <Image style = {styles.tinyLogo} source={logo} />
        <View style = {styles.form}>
            <Text style = {{
                paddingTop: 12,
                paddingLeft: 16,
                fontSize: 18,
            }}>
                Username or email
            </Text>
            <Input 
            inputStyle = {globalStyles.inputLabel}
            leftIconContainerStyle = {globalStyles.inputIconLeft}
            inputContainerStyle={globalStyles.inputContainer}
            placeholder = "Username or email" 
            ref={identifiant}
            leftIcon = {<FontAwesomeIcon icon= {faUser} size={24} />}
            />
            <Text style = {{
                paddingTop: 12,
                paddingLeft: 16,
                fontSize: 18,
            }}>Password</Text>
            <Input 
                inputStyle={globalStyles.inputLabelPassword}
                leftIconContainerStyle={globalStyles.inputIconLeft}
                rightIconContainerStyle={globalStyles.inputIconRight}
                inputContainerStyle={globalStyles.inputContainer}
                errorProps={{ 
                    visibility: 'hidden'
                }}
                secureTextEntry={!showPassword} 
                placeholder="Password" 
                ref={password}
                leftIcon={<FontAwesomeIcon icon={faLock} size={24}  />}
                rightIcon={
                    <Pressable onPress={toggleShowPassword}>
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size={24}  />
                    </Pressable>
                }
                onChange={changeerror}
                errorMessage={error}
            />
            
        </View>
        <Button
              title="Sign In"
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: '#59A52C',
                borderWidth: 0,
                borderRadius: 20,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
                paddingTop : 100
              }}
            onPress={() => {
                setUser({identifiant:identifiant.current,password:password})
                console.log(user);
            }}
            />
        <Button
                title="Create a account"
                titleStyle={{ fontWeight: '700' }}
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
    input : {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
    }


});

export default SignIn;