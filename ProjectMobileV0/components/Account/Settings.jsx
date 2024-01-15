import { Text, View, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faArrowLeft,
    faArrowRightFromBracket,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { deleteUser } from "../../APIAccess/user";
import Header from "../Global/Header";
import { ERROR_JWT_MESSAGE, GREEN, UNKNOW_ERROR } from "../../tools/constants";
import { useState } from "react";
import { removeToken } from "../../store/slice/token";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
    containerButton: {
        marginTop: 100,
    },
    buttonContainer: {
        width: 200,
        alignSelf: "center",
        marginBottom: 50,
        marginTop: 15,
    },
});

/**
 * Settings of the application
 *
 * @returns {JSX.Element} settings of the application
 */
function Settings({ navigation }) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.token);
    const [error, setError] = useState("");

    /**
     * Delete the user
     *
     * @returns {void}
     */
    function deleteButton() {
        deleteUser(token)
            .then(() => {
                dispatch(removeToken());
                navigation.navigate("SignIn", { message: "Account deleted" });
            })
            .catch((error) => {
                if (error.response?.data?.code.includes("JWT")) {
                    navigation.navigate("SignIn", {
                        message: ERROR_JWT_MESSAGE,
                    });
                } else {
                    setError(
                        error.response?.data?.code.includes("FORBIDDEN")
                            ? "You can't delete your account"
                            : UNKNOW_ERROR
                    );
                }
            });
    }

    return (
        <View
            style={{
                flexDirection: "column",
            }}
        >
            <Header />
            {error && (
                <Text
                    style={{
                        color: "#CC1616",
                        fontSize: 20,
                        textAlign: "center",
                    }}
                >
                    {error}
                </Text>
            )}
            <View style={{ padding: 10 }}>
                <Pressable onPress={navigation.goBack}>
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        size={40}
                        style={{ color: GREEN }}
                    />
                </Pressable>
                <View
                    style={[
                        globalStyles.containerInsideView,
                        styles.containerButton,
                        { flexDirection: "column" },
                    ]}
                >
                    <Pressable
                        style={{
                            marginBottom: 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 150,
                            alignSelf: "center",
                        }}
                        onPress={() => {
                            dispatch(removeToken());
                            navigation.navigate("SignIn", {
                                message: "Disconnected",
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            size={30}
                            style={{ color: GREEN }}
                        />
                        <Text style={{ color: GREEN, fontSize: 20 }}>
                            Disconnect
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            marginBottom: 100,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            width: 200,
                            alignSelf: "center",
                        }}
                        onPress={deleteButton}
                    >
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            size={30}
                            style={{ color: "#CC1616" }}
                        />
                        <Text style={{ color: "#CC1616", fontSize: 20 }}>
                            Delete Account
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default Settings;
