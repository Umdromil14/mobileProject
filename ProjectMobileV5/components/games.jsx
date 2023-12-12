import logo from "../images/logo.png";
import { InputWithLabel, ValidateButton } from "../tools/AllForForm";
import { useRef, useState, useEffect } from "react";
import {
    Image,
    Modal,
    View,
    StyleSheet,
    Pressable,
    StatusBar,
    Dimensions,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
    faBars,
    faChevronDown,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { globalStyles } from "../styles/globalStyles";
import { Icon, Button } from "@rneui/themed";
import { getVideoGamesWithPlatformsAndGenres } from "../APIAccess/publication";
import { getPlatforms } from "../APIAccess/platform";
import { getGenres } from "../APIAccess/genre";
import images from "../images/image";
import Header from "./header";
import {
    DARK_GREY,
    HEADER_HEIGHT,
    TAB_NAVIGATOR_HEIGHT,
    GREEN,
    LIGHT_GREY,
} from "../tools/constants";
// import { Dropdown } from "react-native-element-dropdown";

const IMAGE_MARGIN = 5;
const IMAGE_WIDTH = Dimensions.get("window").width / 3 - IMAGE_MARGIN * 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.36;
const FILTER_BUTTON_WIDTH = 150;

const MODAL_BOX_PADDING = 20;
const MODAL_DIVISION = ["30%", "55%", "15%"];
const MODAL_FLATLIST_ITEM_MARGIN = 2;
const MODAL_FLATLIST_ITEM_WIDTH =
    (Dimensions.get("window").width - MODAL_BOX_PADDING * 2) / 3 -
    MODAL_FLATLIST_ITEM_MARGIN * 2;
const MODAL_FLATLIST_ITEM_HEIGHT = MODAL_FLATLIST_ITEM_WIDTH * 0.5;
const MODAL_BUTTON_MARGIN = 10;

function Games({ navigation }) {
    const [search, setSearch] = useState("");
    const [selectedPlatform, setSelectedPlatform] = useState("PC");
    const [platforms, setPlatforms] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const [videoGames, setVideoGames] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState({
        platform: "PC",
        genres: [],
    });

    const [load, setLoad] = useState({
        loading: true,
        errorMessage: "",
    });

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const handleSelectedGenresChange = (genreId) => {
        const index = selectedGenres.indexOf(genreId);
        if (index !== -1) {
            newSelectedGenres = selectedGenres.slice();
            newSelectedGenres.splice(index, 1);
            setSelectedGenres(newSelectedGenres);
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    const getFilteredGames = () => {
        return videoGames.filter(
            (videoGame) =>
                videoGame.platforms.includes(selectedFilter.platform) &&
                videoGame.name.toLowerCase().includes(search.toLowerCase()) &&
                (selectedFilter.genres.length === 0 ||
                    selectedFilter.genres.every((genre) =>
                        videoGame.genresIds.includes(genre)
                    ))
        );
    };

    let Content;
    if (load.loading) {
        Content = (
            <View style={styles.inner}>
                <Image source={require("../images/load.gif")} />
            </View>
        );
    } else if (load.errorMessage) {
        Content = <ErrorText errorMessage={load.errorMessage} />;
    } else {
        Content = (
            <View style={{ width: "100%", paddingTop: 10 }}>
                <Modal
                    animationGenre="slide"
                    transparent={true}
                    visible={isBottomSheetOpen}
                    onRequestClose={() => {
                        setIsBottomSheetOpen(!isBottomSheetOpen);
                    }}
                >
                    <View style={styles.modal}>
                        <View
                            style={[
                                styles.modalBox,
                                {
                                    height: MODAL_DIVISION[0],
                                },
                            ]}
                        >
                            <Text style={styles.modalTitle}>Platforms</Text>
                            <FlatList
                                data={platforms}
                                horizontal={true}
                                renderItem={({ item }) => (
                                    <Button
                                        title={item.abbreviation}
                                        onPress={() => {
                                            setSelectedPlatform(item.code);
                                        }}
                                        buttonStyle={[
                                            styles.modalFlatListButton,
                                            {
                                                backgroundColor:
                                                    item.code ===
                                                    selectedPlatform
                                                        ? GREEN
                                                        : LIGHT_GREY,
                                            },
                                        ]}
                                    />
                                )}
                            />
                        </View>
                        <View
                            style={[
                                styles.modalBox,
                                {
                                    height: MODAL_DIVISION[1],
                                },
                            ]}
                        >
                            <Text style={styles.modalTitle}>Genres</Text>
                            <GenresFlatList
                                genres={genres}
                                selectedGenres={selectedGenres}
                                handleSelectedGenresChange={
                                    handleSelectedGenresChange
                                }
                            />
                        </View>
                        <View
                            style={[
                                styles.modalBox,
                                {
                                    height: MODAL_DIVISION[2],
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                },
                            ]}
                        >
                            <Button
                                title="RESET"
                                onPress={() => {
                                    setSelectedPlatform("PC");
                                    setSelectedGenres([]);
                                }}
                                buttonStyle={[
                                    styles.modalButton,
                                    {
                                        backgroundColor: DARK_GREY,
                                        borderColor: "#ffffff",
                                        borderWidth: 1,
                                        marginRight: MODAL_BUTTON_MARGIN,
                                    },
                                ]}
                            />
                            <Button
                                title="APPLY"
                                onPress={() => {
                                    setIsBottomSheetOpen(!isBottomSheetOpen);
                                    setSelectedFilter({
                                        platform: selectedPlatform,
                                        genres: selectedGenres,
                                    });
                                }}
                                buttonStyle={[
                                    styles.modalButton,
                                    {
                                        backgroundColor: GREEN,
                                        marginLeft: MODAL_BUTTON_MARGIN,
                                    },
                                ]}
                            />
                        </View>
                    </View>
                </Modal>
                <VideoGamesFlatList videoGames={getFilteredGames()} />
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right:
                            Dimensions.get("window").width / 2 -
                            FILTER_BUTTON_WIDTH / 2,
                        paddingBottom: 16,
                    }}
                >
                    <Button
                        title="FILTERS"
                        onPress={() => {
                            setIsBottomSheetOpen(!isBottomSheetOpen);
                        }}
                        buttonStyle={{
                            backgroundColor: GREEN,
                            borderRadius: 20,
                            width: FILTER_BUTTON_WIDTH,
                        }}
                    />
                </View>
            </View>
        );
    }

    useEffect(() => {
        Promise.all([
            getPlatforms(),
            getGenres(),
            getVideoGamesWithPlatformsAndGenres(),
        ])
            .then((response) => {
                setPlatforms(response[0]);
                setGenres(response[1]);
                setVideoGames(response[2].slice(0, 24));

                setLoad({
                    loading: false,
                    errorMessage: "",
                });
            })
            .catch((error) => {
                if (error.response.request.status === 404) {
                    error.message = "It seems that you have no video games";
                }
                setLoad({
                    loading: false,
                    errorMessage: error.message,
                });
            });
    }, []);

    return (
        <View style={styles.container}>
            <Header onSearchChange={setSearch} />
            <View style={styles.body}>{Content}</View>
        </View>
    );
}

/**
 * Displays an error message
 *
 * @param {string} errorMessage The error message to display
 *
 * @returns {JSX.Element} The error message
 */
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

/**
 * Displays the list of video games
 *
 * @param {Array} videoGames The list of video games to display
 *
 * @returns {JSX.Element} The list of video games or an error message if there are no video games
 */
function VideoGamesFlatList({ videoGames }) {
    if (videoGames.length === 0) {
        return (
            <ErrorText errorMessage="No video games match your search criteria" />
        );
    }

    return (
        <FlatList
            data={videoGames}
            numColumns="3"
            renderItem={({ item }) => (
                <Image
                    source={images[item.id]}
                    style={{
                        margin: IMAGE_MARGIN,
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                    }}
                />
            )}
        />
    );
}

function GenresFlatList({
    genres,
    selectedGenres,
    handleSelectedGenresChange,
}) {
    return (
        <FlatList
            data={genres}
            numColumns="3"
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => {
                        handleSelectedGenresChange(item.id);
                    }}
                >
                    <ImageBackground
                        source={require("../images/button/openWorld.jpg")}
                        style={[
                            styles.modalFlatListButton,
                            {
                                flex: 1,
                                justifyContent: "center",
                            },
                        ]}
                        imageStyle={{
                            borderRadius: 5,
                        }}
                    >
                        <View
                            style={{
                                ...StyleSheet.absoluteFillObject,
                                backgroundColor: selectedGenres.includes(
                                    item.id
                                )
                                    ? "rgba(89, 165, 44, 0.5)"
                                    : "transparent",
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 12,
                                color: "#ffffff",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            {item.name}
                        </Text>
                    </ImageBackground>
                </TouchableOpacity>
            )}
            ListEmptyComponent={
                <ErrorText errorMessage="It seems that no genres have been found" />
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: DARK_GREY,
    },
    body: {
        height:
            Dimensions.get("window").height -
            HEADER_HEIGHT -
            TAB_NAVIGATOR_HEIGHT,
        backgroundColor: DARK_GREY,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    inner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modal: {
        height: 465,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        backgroundColor: DARK_GREY,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderColor: "grey",
    },
    modalBox: {
        width: "100%",
        padding: MODAL_BOX_PADDING,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    modalTitle: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    modalFlatListButton: {
        flex: 1,
        width: MODAL_FLATLIST_ITEM_WIDTH,
        margin: MODAL_FLATLIST_ITEM_MARGIN,
        height: MODAL_FLATLIST_ITEM_HEIGHT,
        borderRadius: 5,
    },
    modalButton: {
        borderRadius: 20,
        width:
            (Dimensions.get("window").width - MODAL_BOX_PADDING * 2) / 2 -
            MODAL_BUTTON_MARGIN,
    },
});

export default Games;
