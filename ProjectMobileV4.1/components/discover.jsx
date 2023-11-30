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
                flex: 1
            }}
        >
              <View style={{ backgroundColor: '#443D3D', paddingBottom: 30}}>
                <StatusBar
                    backgroundColor={'#443D3D'}
                    hidden={false}
                />
                <Image
                    style={[globalStyles.tinyLogo, {alignSelf: "flex-start"}]}
                    source={logo}
                />
            </View>
            <View style={{
                    padding:10,
                    backgroundColor: "#2C2C2C",
                    flex:1,
                }}>
                <Pressable onPress={() => {navigation.navigate('GamePreview', {videoGameId: 1, actualPlatform: "PC"})}}>
                    <Image source={cod}/>
                </Pressable>
            </View>
        </View>
    )
}

export default Discover;