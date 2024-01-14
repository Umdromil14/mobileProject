import { Dimensions, View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, Linking, TextInput, Alert, TouchableWithoutFeedback, Modal } from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { ValidateButton } from "../../tools/AllForForm";
import { Tab, TabView, AirbnbRating, Button, Dialog, CheckBox } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { getPublications } from "../../APIAccess/publication";
import { getPlatformsByVideoGame } from "../../APIAccess/platform";
import { getGamesByVideoGame, updateGame } from "../../APIAccess/game";
import Header from "../header";
import { DARK_GREY, GREEN } from "../../tools/constants";
import images from "../../images/image";
import UpdateReview from "./UpdateReviewModal";

const IMAGE_WIDTH = Dimensions.get("window").width / 3;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.36;

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

    const [gamePreviews, setGamePreviews] = useState(new Map());
    const [gameReviews, setGameReviews] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const [load, setLoad] = useState({
        loading: true,
        errorMessage: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [publications, platforms, games] = await Promise.all([
                    getPublications({ videoGameId: videoGameId, getVideoGamesInfo: true }),
                    getPlatformsByVideoGame(videoGameId),
                    getGamesByVideoGame(videoGameId)
                ]);

                const previews = new Map();
                platforms.forEach(platform => {
                    const values = publications.find(element =>
                        element.platform_code === platform.code
                    );
                    previews.set(platform, values);
                });
                setGamePreviews(new Map(previews));
                setGameReviews(games);
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
    }, []);

    const renderPreviews = () => {
        const keys = Array.from(gamePreviews.keys());
        const actualPublication = gamePreviews.get(keys.find(platform => platform.code === actualPlatform));
        const actualReview = gameReviews.find((review) => review.publication_id === actualPublication.id);
        return (
            <>
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={navigation.goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: GREEN }} />
                    </Pressable>
                    <Text style={[globalStyles.whiteText, { marginLeft: 12, marginTop: 2 }, styles.name]}>
                        {actualPublication.name}
                    </Text>
                </View>
                <View style={globalStyles.containerInsideView}>
                    <View style={{ height: IMAGE_HEIGHT, marginTop: 15 }}>
                        <Image style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }} source={images[videoGameId]} />
                        <View style={{ position: "absolute", alignSelf: "center", top: IMAGE_HEIGHT - 40 }}>
                            <CheckBox
                                checked={actualReview.is_owned}
                                checkedIcon={<FontAwesomeIcon icon={faCircleCheck} size={40} style={{ color: GREEN }} />}
                                uncheckedIcon={<FontAwesomeIcon icon={faCircleXmark} size={40} style={{ color: "red" }} />}
                                onPress={() => {
                                    updateGame(actualPublication.publication_id,
                                        {
                                            is_owned: !actualReview.is_owned
                                        }).catch((reason) => { concole.log(reason.request) });
                                    setChecked(!checked);
                                }}
                                containerStyle={{ backgroundColor: "transparent" }}
                            />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', marginLeft: 18, maxWidth: 142 }}>
                        <Text style={[globalStyles.greenText, styles.informationsTitle]}>
                            Release date (D/M/Y)
                        </Text>
                        <Text style={actualPublication.release_date ? [globalStyles.whiteText, styles.informationsText] : styles.unknown}>
                            {actualPublication.release_date ? new Date(actualPublication.release_date).toLocaleDateString() : "Unknown"}
                        </Text>
                        <Text style={[globalStyles.greenText, styles.informationsTitle]}>
                            Release price
                        </Text>
                        <Text style={actualPublication.release_price ? [globalStyles.whiteText, styles.informationsText] : styles.unknown}>
                            {actualPublication.release_price ? actualPublication.release_price + "€" : "Unknown"}
                        </Text>
                        <Text style={[globalStyles.greenText, styles.informationsTitle]}>
                            Platforms
                        </Text>
                        <FlatList
                            data={Array.from(gamePreviews.keys())}
                            renderItem={({ item, index }) => {
                                const isEnd = index === Array.from(gamePreviews.keys()).length - 1;
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
                        <OpenURLButton url={actualPublication.store_page_url} />
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
                            <Text style={
                                [actualPublication.description ? styles.textStyle : [styles.textStyle, { color: "grey" }], {fontSize: 15}]
                            }>
                                {actualPublication.description ? actualPublication.description : "Unknown"}
                            </Text>
                        </ScrollView>
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%'}}>
                        <ScrollView contentContainerStyle={{ padding: 20, alignSelf: "center" }}>
                            <AirbnbRating
                                showRating={false}
                                size={30}
                                defaultRating={actualReview.review_rating ? actualReview.review_rating : 0}
                                onFinishRating={(number) => setRating(number)}
                                isDisabled={true}
                            />
                            <Text
                                style={[styles.textStyle, (actualReview.review_comment ? globalStyles.whiteText : { color: "grey" }), {fontSize: 15}]}
                            >
                                {actualReview.review_comment ? actualReview.review_comment : "No comment for the moment"}
                            </Text>
                            <ValidateButton
                                title={"Modify"}
                                containerStyle={globalStyles.modifyButtonContainer}
                                onPress={() => setModalVisible(true)}
                            />
                        </ScrollView>
                    </TabView.Item>
                </TabView>
                <UpdateReview
                    isVisible={modalVisible}
                    onClose={({comment = undefined, rating = undefined}) => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(false);
                        if (comment !== undefined || rating !== undefined) {
                            const newReviews = gameReviews.map(review => {
                                if (review.publication_id === actualPublication.id) {
                                    review.review_comment = comment;
                                    review.review_rating = rating;
                                }
                                return review;
                            });
                            setGameReviews(newReviews);
                        }
                    }}
                    publicationId={actualPublication.id}
                    comment={actualReview.review_comment}
                    rating={actualReview.review_rating}
                />
            </>
        );
    }

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
            disabled={url ? false : true}
            disabledStyle={{ backgroundColor: '#59A52C99' }}
            onPress={handlePress} />;
    };

    let content;
    if (load.loading) {
        content = (
            <>
                <Pressable onPress={navigation.goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: GREEN }} />
                </Pressable>
                <Dialog.Loading loadingProps={{ color: GREEN }} />
            </>
        );
    } else if (load.errorMessage) {
        content = <ErrorText errorMessage={load.errorMessage} />;
    } else {
        content = renderPreviews();
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
    unknown: {
        fontSize: 16,
        fontWeight: "bold",
        color: "grey"
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
    ]
});

export default GamePreview;