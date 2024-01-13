import { Dimensions, View, Pressable, Text, FlatList, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { GREEN } from "../tools/constants";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";
import Header from "./header";
import { Dialog } from "@rneui/themed";
import { getPublications, getVideoGamesWithPlatformsAndGenres } from "../APIAccess/publication";
import images from "../images/image";

const IMAGE_MARGIN = 5;
const IMAGE_WIDTH = Dimensions.get("window").width / 3 - IMAGE_MARGIN * 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.36;

/**
 * Page showing the games depending on the selected part (new games) or the filters used (all games)
 *
 * @param {object} params
 * @param {object=} params.platform platform as an object with all the platform details, if there is no platform, the gams will be filtered with the genres
 * @param {string} params.platform.code the platform code
 * @param {string} params.platform.description the platform description
 * @param {string} params.platform.abbreviation the platform abbreviation
 * @param {boolean=} params.newGame boolean saying if the games to show are younger than 3 months old, if it's not given, the games will not be filtered by age
 * @param {Array=} params.genres Array giving the genres selected by the user to filter the games. If not provided, the games will only be filtered by the platform 
 *
 * @returns {JSX.Element} header of the application
 */
function NewGames({ route, navigation }) {

    const { platform = undefined, newGame = false, genres = [] } = route.params;

    const [publications, setPublications] = useState([]);
    const [search, setSearch] = useState("");

    const [load, setLoad] = useState({
        loading: true,
        errorMessage: "",
    });

    let content;
    if (load.loading) {
        content = <Dialog.Loading loadingProps={{ color: GREEN }} />
    }
    else if (load.errorMessage) {
        content = <ErrorText errorMessage={load.errorMessage} />
    }
    else {
        content = (
            <FlatList
                data={publications}
                numColumns="3"
                renderItem={({ item }) => {
                    console.log(item);
                    return (<Pressable
                        style={styles.imageSize}
                        onPress={() =>
                            navigation.navigate("GamePreview",
                                { videoGameId: item.id, actualPlatform: platform.code })
                        }>
                        <Image style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }} source={images[item.id]} />
                    </Pressable>);
                }}
                style={globalStyles.container}
            />
        );
    }

    useEffect(() => {
        Promise.all([
            getVideoGamesWithPlatformsAndGenres(),
            getPublications({platformCode: platform.code, getLastGames: true})
        ])
            .then((response) => {
                setPublications(response[0].filter((videoGame) => {
                    let inIt = false;
                    if (videoGame.platforms.includes(platform.code)) {
                        if (newGame) {
                            response[1].forEach(publications => {
                                if (publications.video_game_id === videoGame.id) {
                                    inIt = true;
                                }
                            });
                        }
                        else {
                            inIt = true;
                        }
                    }
                    // if (genres.lenght > 0) {
                    //     //! changer ici
                    //     videoGame.typesIds.includes(genres);
                    // }
                    videoGame.name.toLowerCase().includes(search.toLowerCase());
                    if (inIt) {
                        return videoGame;
                    }
                }));
                setLoad({
                    loading: false,
                    errorMessage: ""
                });
            })
            .catch((reason) => {
                if (reason.response?.data.code?.includes("JWT")) {
                    navigation.navigate("SignIn");
                }
                else if (reason.response?.request.status === 404) {
                    setLoad({
                        loading: false,
                        errorMessage: "It seems that there is no games for those parameters"
                    });
                }
                else {
                    setLoad({
                        loading: false,
                        errorMessage: reason.message
                    });
                }
            })
    }, []);

    return (
        <>
            <Header onSearchChange={setSearch} />
            <View style={[{ flexDirection: 'row' }, globalStyles.container]}>
                <Pressable onPress={navigation.goBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: GREEN }} />
                </Pressable>
                <Text style={[globalStyles.whiteText, { marginLeft: 12, marginTop: 2, fontSize: 20 }]}>
                    {newGame? "New games on " + platform.abbreviation : platform.abbreviation}
                </Text>
            </View>
            {content}
        </>

    );
}

function ErrorText({ errorMessage }) {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>
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
    imageSize: {
        margin: IMAGE_MARGIN
    }
});

export default NewGames;