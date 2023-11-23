import logo from "../images/logo.png";
import cod from "../images/1.jpg";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import {Image,View,StyleSheet, Pressable, StatusBar, Dimensions, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";

function Discover({ navigation }){

    return(
        <View
            style={{
                flexDirection: 'column',
                height: Dimensions.get('window').height
            }}
        >
              <View style={{ backgroundColor: '#443D3D', flex: 10 }}>
                <StatusBar
                    backgroundColor={'#443D3D'}
                    hidden={false}
                />
                <Image
                    style={[globalStyles.tinyLogo, {alignSelf: "flex-start"}]}
                    source={logo}
                />
            </View>
            <View style={{ backgroundColor: '#2C2C2C', flex: 70, justifyContent: "space-between" }}>
                <Pressable onPress={() => {navigation.navigate('GamePreview')}}>
                    <Image source={cod}/>
                </Pressable>
            </View>
        </View>
    )
}

export default Discover;