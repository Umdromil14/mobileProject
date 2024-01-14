import { useState, useEffect } from "react";
import {
    Image,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ActivityIndicator,
} from "react-native";
import { Button } from "@rneui/themed";
import { getVideoGamesWithPlatformsAndGenres } from "../../APIAccess/publication";
import { getPlatforms } from "../../APIAccess/platform";
import { getGenres } from "../../APIAccess/genre";
import images from "../../images/image";
import Header from "../header";
import {
    DARK_GREY,
    HEADER_HEIGHT,
    TAB_NAVIGATOR_HEIGHT,
    GREEN,
    LOAD_SIZE,
} from "../../tools/constants";
import FilterModal from "./FilterModal";
import ErrorText from "../Utils/ErrorText";

const styles = StyleSheet.create({
    inner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorTitle: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "grey",
        fontSize: 15,
        fontWeight: "bold",
    },
});

export default function Error({ navigation, errorData }) {
    const ErrorText = ({ errorMessage }) => {
        return (
            <View style={styles.inner}>
                <Text style={styles.errorTitle}>Whoops...</Text>
                <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
        );
    }

    if (errorData?.code.includes("JWT")) {
        return (
            <ErrorText errorMessage="No games found" />
        )
    }
}