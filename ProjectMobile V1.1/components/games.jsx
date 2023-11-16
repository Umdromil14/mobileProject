import logo from "../images/logo.png";
import {InputWithLabel,ValidateButton} from "../tools/AllForForm";
import { useRef, useState,useEffect } from "react";
import {Image,View,StyleSheet, Pressable, StatusBar, Dimensions, Text} from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";


function Games({ navigation }){
    return (
        <View>
            <Text>Games</Text>  
        </View>
    )
}

export default Games;