import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, Linking, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ValidateButton } from "../tools/AllForForm";
import { Tab, TabView, AirbnbRating, Button, Dialog, CheckBox } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { getVideoGames } from "../APIAccess/videoGame";
import { getPublications } from "../APIAccess/publication";
import { getPlatformsCodeByVideoGame } from "../APIAccess/platform";
import { getGames, updateGame } from "../APIAccess/game";
import Header from "./header";
import { DARK_GREY, GREEN } from "../tools/constants";
import images from "../images/image";

/**
 * Page with all the data that will be displayed about a game
 *
 * @param {object} params
 * @param {number} params.videoGameId The id of the video game that will be displayed on the screen
 * @param {string=} params.actualPlatform The code of the platform of the publication that the user chosed, if it's not provided, it will get the favorite platform of a user
 *
 * @returns {JSX.Element} header of the application
 */
function GamePreview({ route, navigation }) {

    const { videoGameId, actualPlatform } = route.params;

    const [gamePreview, setGamePreview] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [checked, setChecked] = useState(false);

    const [load, setLoad] = useState({
        loading: true,
        errorMessage: "",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const videoGames = await getVideoGames(videoGameId);
                const publications = await getPublications({videoGameId: videoGameId, platformCode: actualPlatform});
                const platforms = await getPlatformsCodeByVideoGame(videoGameId);
                const preview = {
                    publicationId: publications[0].id,
                    name: videoGames[0].name,
                    releaseDate: new Date(publications[0].release_date).toLocaleDateString(),
                    releasePrice: publications[0].release_price,
                    platforms: platforms,
                    storeUrl: publications[0].store_page_url,
                    synopsis: videoGames[0].description,
                }
                getGames(publications[0].id)
                    .then((response) => {
                        setComment(response[0].review_comment);
                        setRating(response[0].review_rating);
                        if (response[0].is_owned) {
                            setChecked(true);
                        }
                    }).catch((reason) => {
                        if (reason.response.request.status !== 404) {
                            console.log(reason);
                        }
                    });
                setGamePreview(preview);
                setLoad({
                    loading: false,
                    errorMessage: "",
                });
            } catch (error) {
                setLoad({
                    loading: false,
                    errorMessage: error.message,
                });
            }
        }
        fetchData();
    }, [actualPlatform]);

    const [index, setIndex] = useState(0);

    const OpenURLButton = ({ url }) => {
        const handlePress = useCallback(async () => {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Invalid url`);
            }
        }, [url]);

        return <Button
            title={"Store Page"}
            titleStyle={
                styles.buttonTextStyle}
            buttonStyle={{
                backgroundColor: GREEN,
                borderWidth: 0,
                borderRadius: 20,
            }}
            containerStyle={
                styles.storeButton
            }
            onPress={handlePress} />;
    };

    let content;
    if (load.loading) {
        content = (
            <Dialog.Loading loadingProps={{ color: GREEN }} />
        );
    } else if (load.errorMessage) {
        content = <ErrorText errorMessage={load.errorMessage} />;
    } else {
        content = (
            <>
                <View style={globalStyles.containerInsideView}>
                    <Image style={{ maxHeight: 210, width: 142, marginLeft: 14 }} source={images[videoGameId]} />
                    <CheckBox
                        checked={checked}
                        checkedIcon={<FontAwesomeIcon icon={faCircleCheck} size={40} style={{ color: GREEN }} />}
                        uncheckedIcon={<FontAwesomeIcon icon={faCircleXmark} size={40} style={{ color: "red" }} />}
                        onPress={() => {
                            updateGame(gamePreview.publicationId,
                                {
                                    is_owned: !checked
                                }).catch((reason) => { concole.log(reason.request) });
                            setChecked(!checked);
                        }}
                    // containerStyle={{backgroundColor: "transparent"}}
                    />
                    <View style={{ flexDirection: 'column', marginLeft: 18, maxWidth: 142 }}>
                        <Text style={[globalStyles.greenText, styles.informationsTitle]}>
                            Release date (D/M/Y)
                        </Text>
                        <Text style={[globalStyles.whiteText, styles.informationsText]}>
                            {gamePreview.releaseDate}
                        </Text>
                        <Text style={[globalStyles.greenText, styles.informationsTitle]}>
                            Release price
                        </Text>
                        <Text style={[globalStyles.whiteText, styles.informationsText]}>
                            {gamePreview.releasePrice}
                        </Text>
                        <Text style={[globalStyles.greenText, styles.informationsTitle]}>
                            Platforms
                        </Text>
                        <FlatList
                            data={gamePreview.platforms}
                            renderItem={({ item, index }) => {
                                const isEnd = index === gamePreview.platforms.length - 1;
                                let boldPlatform = "normal";
                                let underlined = "none";
                                if (item.code === actualPlatform) {
                                    boldPlatform = "bold";
                                }
                                else {
                                    underlined = "underline";
                                }
                                return (
                                    <Pressable onPress={() => {
                                        navigation.setParams({ actualPlatform: item.code });
                                        setLoad({
                                            loading: true,
                                            errorMessage: "",
                                        });
                                    }} style={{ flexDirection: "row" }}>
                                        <Text
                                            style={[
                                                globalStyles.whiteText,
                                                styles.informationsText,
                                                {
                                                    fontWeight: boldPlatform,
                                                    textDecorationLine: underlined
                                                }]}
                                        >
                                            {item.abbreviation}
                                        </Text>
                                        <Text style={[
                                            globalStyles.whiteText,
                                            styles.informationsText]}>
                                            {isEnd ? "" : ", "}
                                        </Text>
                                    </Pressable>
                                )
                            }}
                            horizontal={true} />
                        <OpenURLButton url={gamePreview.storeUrl} />
                    </View>
                </View>
                <Tab value={index} onChange={(e) => setIndex(e)} indicatorStyle={{ backgroundColor: GREEN }}>
                    <Tab.Item
                        title={"Synopsis"}
                        titleStyle={(active) => ({
                            color: active ? GREEN : "#fff",
                            fontSize: 24,
                            fontWeight: "bold"
                        })} />
                    <Tab.Item
                        title={"My review"}
                        titleStyle={(active) => ({
                            color: active ? GREEN : "#fff",
                            fontSize: 24,
                            fontWeight: "bold"
                        })} />
                </Tab>
                <TabView value={index} onChange={setIndex} animationType="spring">
                    <TabView.Item style={{ width: '100%' }}>
                        <ScrollView contentContainerStyle={{ padding: 20 }}>
                            <Text style={styles.textStyle}>{gamePreview.synopsis}</Text>
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                        <View style={{ paddingTop: 10, flexGrow: 1 }}>
                            <AirbnbRating
                                showRating={false}
                                size={30}
                                defaultRating={rating ? rating : 0}
                                onFinishRating={(number) => setRating(number)}
                            />
                            <TextInput
                                value={comment ? comment : "My comment"}
                                style={[styles.textStyle, styles.commentSection]}
                                multiline={true}
                                onChangeText={(text) => setComment(text)}
                            />
                            <ValidateButton
                                title={"Modify"}
                                containerStyle={[globalStyles.modifyButtonContainer, { marginBottom: 10 }]}
                                onPress={() =>
                                    updateGame(
                                        gamePreview.publicationId,
                                        {
                                            review_rating: rating,
                                            review_comment: comment
                                        })}
                            />
                        </View>
                    </TabView.Item>
                </TabView>
            </>

        );
    }

    return (
        <>
            <Header />
            <View
                style={{
                    padding: 10,
                    backgroundColor: DARK_GREY,
                    flexGrow: 1
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={navigation.goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: GREEN }} />
                    </Pressable>
                    <Text style={[globalStyles.whiteText, { marginLeft: 12, marginTop: 2 }, styles.name]}>
                        {gamePreview.name}
                    </Text>
                </View>
                {content}
            </View>
        </>
    );
}

function ErrorText({ errorMessage }) {
    return (
        <View style={styles.inner}>
            <Text
                style={{
                    color: "#ffffff",
                    fontSize: 16,
                    fontWeight: "bold",
                }}
            >
                Whoops...
            </Text>
            <Text
                style={{
                    color: "grey",
                    fontSize: 15,
                    fontWeight: "bold",
                }}
            >
                {errorMessage}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontSize: 20
    },
    informationsTitle: {
        fontSize: 12,
        marginTop: 10
    },
    informationsText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    storeButton: {
        marginTop: 11,
        marginLeft: 1,
        width: 150,
        height: 50
    },
    buttonTextStyle: {
        fontWeight: "400",
        textAlign: "center",
        fontSize: 16,
        fontStyle: "normal"
    },
    textStyle: [
        globalStyles.containerInsideView,
        globalStyles.whiteText,
        { textAlign: "justify" }
    ],
    commentSection: {
        width: "90%",
        minHeight: 100,
        borderWidth: 3,
        borderColor: GREEN,
        padding: 10
    }
});

export default GamePreview;