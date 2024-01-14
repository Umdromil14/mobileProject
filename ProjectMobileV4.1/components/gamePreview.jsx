import { View, Text, Image, Pressable, StyleSheet, ScrollView, FlatList, Linking, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ValidateButton } from "../tools/AllForForm";
import { Tab, TabView, AirbnbRating, Button } from "@rneui/themed";
import { useState, useEffect, useCallback } from "react";
import { getVideoGames } from "../APIAccess/videoGame";
import { getPublications } from "../APIAccess/publication";
import { getPlatformsCodeByVideoGame } from "../APIAccess/platform";
import { getGames } from "../APIAccess/game";
import Header from "./header";
import { DARK_GREY, GREEN } from "../tools/constants";
import images from "../images/image";

function GamePreview({ route, navigation }) {

    const { videoGameId, actualPlatform } = route.params;

    const [gamePreview, setGamePreview] = useState({});
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [minHeight, setMinHeight] = useState(0);
    const [lastHeight, setLastHeight] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const videoGames = await getVideoGames(videoGameId);
                const publications = await getPublications(undefined, videoGameId, undefined, actualPlatform);
                const gameReview = await getGames(publications[0].id);
                const platforms = await getPlatformsCodeByVideoGame(videoGameId);
                const preview = {
                    name: videoGames[0].name,
                    releaseDate: new Date(publications[0].release_date).toLocaleDateString(),
                    releasePrice: publications[0].release_price,
                    platforms: platforms,
                    storeUrl: publications[0].store_page_url,
                    synopsis: videoGames[0].description,
                }
                setComment(gameReview[0].review_comment);
                setRating(gameReview[0].review_rating);
                setGamePreview(preview);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [actualPlatform]);

    const [heightScroll, setHeightScroll] = useState(0);
    const [index, setIndex] = useState(0);

    const handleHeightScroll = (height) => {
        console.log(minHeight);
        let scrollHeight = heightScroll + height;
        scrollHeight -= lastHeight;
        setHeightScroll(scrollHeight);
        console.log(scrollHeight);
    }

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

    return (
        <View
            style={{
                flexDirection: "column",
                flexGrow: 1
            }}
        >
            {/* <Header /> */}
            <View
                style={{
                    padding: 10,
                    backgroundColor: DARK_GREY,
                    flexGrow: 1
                }}
            >
                {/* <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={navigation.goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: GREEN }} />
                    </Pressable>
                    <Text style={[globalStyles.whiteText, { marginLeft: 12, marginTop: 2 }, styles.name]}>{gamePreview.name}</Text>
                </View> */}
                {/* <View style={{height: heightScroll}}> */}
                    <ScrollView onLayout={(e) => setHeightScroll(e.nativeEvent.layout.height)} contentContainerStyle={{height: heightScroll}}>
                        <View onLayout={(e) => { setMinHeight(e.nativeEvent.layout.height) }} style={globalStyles.containerInsideView}>
                            <Image style={{ maxHeight: 210, width: 142, marginLeft: 14 }} source={images[videoGameId]} />
                            <View style={{ flexDirection: 'column', marginLeft: 18, maxWidth: 142 }}>
                                <Text style={[globalStyles.greenText, styles.informationsTitle]}>Release date (D/M/Y)</Text>
                                <Text style={[globalStyles.whiteText, styles.informationsText]}>{gamePreview.releaseDate}</Text>
                                <Text style={[globalStyles.greenText, styles.informationsTitle]}>Release price</Text>
                                <Text style={[globalStyles.whiteText, styles.informationsText]}>{gamePreview.releasePrice}</Text>
                                <Text style={[globalStyles.greenText, styles.informationsTitle]}>Platforms</Text>
                                <FlatList
                                    data={gamePreview.platforms}
                                    renderItem={({ item }) => {
                                        let boldPlatform = "normal";
                                        let underlined = "none";
                                        if (item.code === actualPlatform) {
                                            boldPlatform = "bold";
                                        }
                                        else {
                                            underlined = "underline";
                                        }
                                        return (
                                            <Pressable onPress={() => { navigation.setParams({ actualPlatform: item.code }) }}>
                                                <Text
                                                    style={[
                                                        globalStyles.whiteText,
                                                        styles.informationsText,
                                                        {
                                                            marginRight: 5,
                                                            fontWeight: boldPlatform,
                                                            textDecorationLine: underlined
                                                        }]}
                                                >
                                                    {item.abbreviation},
                                                </Text>
                                            </Pressable>
                                        )
                                    }}
                                    horizontal={true} />
                                <OpenURLButton url={gamePreview.storeUrl} />
                            </View>
                        </View>
                        <View style={{ marginTop: 20, flexGrow:1}}>
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
                                    <View>
                                        <Text style={styles.textStyle}>{gamePreview.synopsis}</Text>
                                    </View>
                                </TabView.Item>
                                <TabView.Item
                                    style={{ width: '100%', flexGrow: 1 }}>
                                    <View style={{ paddingTop: 10, flexGrow:1 }}>
                                        <AirbnbRating
                                            showRating={false}
                                            size={30}
                                            defaultRating={rating}

                                        />
                                        <TextInput
                                            value={comment ? comment : "My comment"}
                                            style={[styles.textStyle, styles.commentSection, {flexGrow:1}]}
                                            multiline={true}
                                            onChangeText={(text) => setComment(text)}
                                            onContentSizeChange={(e) => {
                                                const newHeight = e.nativeEvent.contentSize.height + minHeight;
                                                if (newHeight != lastHeight) {
                                                    handleHeightScroll(newHeight);
                                                    // setLastHeight(newHeight);
                                                }
                                            }}
                                        />
                                        <ValidateButton
                                            title={"Modify"}
                                            containerStyle={[globalStyles.modifyButtonContainer, { marginBottom: 10 }]}
                                        />
                                    </View>
                                </TabView.Item>
                            </TabView>
                        </View>
                    </ScrollView>
                {/* </View> */}

            </View>
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