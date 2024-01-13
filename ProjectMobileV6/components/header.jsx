import logo from "../images/logo.png";
import { Image, View, StyleSheet, StatusBar, Dimensions } from "react-native";
import { useState, useRef } from "react";
import { SearchBar } from "@rneui/themed";
import { LIGHT_GREY, DARK_GREY, HEADER_HEIGHT } from "../tools/constants";

const LOGO_SIZE = 50;
const MARGIN = 15;

// TODO majuscule au fichier
/**
 * Header of the application
 *
 * @param {function=} onSearch function to call when the search bar changes; if not provided, the search bar will not be displayed
 *
 * @returns {JSX.Element} header of the application
 */
export default function Header({ onSearch }) {
    const [search, setSearch] = useState("");

    if (!onSearch) {
        return (
            <View style={styles.header}>
                <StatusBar backgroundColor={LIGHT_GREY} hidden={false} />
                <Image
                    style={styles.logo}
                    source={logo}
                />
            </View>
        );
    }

    return (
        <View style={styles.header}>
            <StatusBar backgroundColor={LIGHT_GREY} hidden={false} />
            <Image
                style={styles.logo}
                source={logo}
            />
            <SearchBar
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder="Search"
                returnKeyType="search"
                value={search}
                onChangeText={(search) => {
                    setSearch(search);
                }}
                onSubmitEditing={() => {
                    onSearch(search);
                }}
                onClear={() => {
                    setSearch("");
                    onSearch("");
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: HEADER_HEIGHT,
        backgroundColor: LIGHT_GREY,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,
        margin: MARGIN,
    },
    containerStyle: {
        width: Dimensions.get("window").width - (LOGO_SIZE + 3 * MARGIN),
        backgroundColor: LIGHT_GREY,
        borderColor: "transparent",
        padding: 0,
        marginRight: MARGIN
    },
    inputContainerStyle: {
        backgroundColor: DARK_GREY,
        borderRadius: 10,
        height: 45,
    },
});
