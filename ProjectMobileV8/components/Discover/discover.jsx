import { useState, useEffect } from "react";
import {
    Image,
    View,
    StyleSheet,
    Pressable,
    Dimensions,
    Text,
    FlatList,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { globalStyles } from "../../styles/globalStyles";
import { Dialog } from "@rneui/themed";
import Header from "../Header";
import {
    GREEN,
    TAB_NAVIGATOR_HEIGHT,
    HEADER_HEIGHT,
} from "../../tools/constants";
import { getPublications } from "../../APIAccess/publication";
import { getPlatforms } from "../../APIAccess/platform";
import images from "../../images/image";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { addNewGames } from "../../store/slice/newGames";
import { addPlatform } from "../../store/slice/platform";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const MAGNIFYING_GLASS_SIZE = 25;
const IMAGE_MARGIN = 5;
const IMAGE_WIDTH = Dimensions.get("window").width / 3 - IMAGE_MARGIN * 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.36;

/**
 * Function creating the different flatlists of the video games needed to show the discover page
 *
 * @param {string=} platform The platform code from which the publications are related, if undefined, the publications should be the user's games
 * @param {Object} publicationsData The publications data of the video games that will be displayed
 *
 * @returns {JSX.Element} header of the application
 */
function FlatListVideoGame({ platform, publicationsData }) {
    const navigation = useNavigation();
    let actualVideoGameId = 0;
    let gameData = [];

    if (platform === undefined && publicationsData !== undefined) {
        gameData = publicationsData
            .filter((publication) => {
                if (publication.video_game_id !== actualVideoGameId) {
                    actualVideoGameId = publication.video_game_id;
                    return publication;
                }
            })
            .slice(-5);
    }

    const selectedPublications = Object.keys(publicationsData).find(
        (element) => {
            return element === platform;
        }
    );

    return (
        <FlatList
            data={
                platform !== undefined
                    ? publicationsData[selectedPublications].slice(-5)
                    : gameData
                    ? gameData
                    : publicationsData
            }
            renderItem={({ item }) => (
                <Pressable
                    style={{ marginLeft: IMAGE_MARGIN }}
                    onPress={() =>
                        navigation.navigate("GamePreview", {
                            videoGameId: item.video_game_id,
                            actualPlatform: item.platform_code,
                        })
                    }
                >
                    <Image
                        style={{ height: IMAGE_HEIGHT, width: IMAGE_WIDTH }}
                        source={images[item.video_game_id]}
                    />
                </Pressable>
            )}
            horizontal={true}
            style={styles.insideFlatlist}
            ListEmptyComponent={
                <Text
                    style={[
                        globalStyles.greenText,
                        globalStyles.centered,
                        {
                            height: 50,
                            color: "grey",
                            fontSize: 15,
                            fontWeight: "bold",
                        },
                    ]}
                >
                    You don't have any game yet!
                </Text>
            }
        />
    );
}

/**
 * Function creating the flatlist of platforms and user game that will be displayed on the discover page
 *
 * @returns {JSX.Element} header of the application
 */
function FlatListPlatform() {
    const navigation = useNavigation();

    const [platformsData, setPlatformsData] = useState([]);
    const [publications, setPublications] = useState([]);
    const [myGames, setMyGames] = useState([]);

    const platforms = useSelector((state) => state.platformList.platforms);
    const newGames = useSelector((state) => state.newGames.newGames);
    const dispatch = useDispatch();

    const [load, setLoad] = useState({
        loading: true,
        errorMessage: "",
    });

    const fillData = () => {
        const filterPlatform = platforms.filter((platform) => {
            return Object.keys(newGames).some((key) => {
                return key === platform.code;
            });
        });
        setPlatformsData([{}, ...filterPlatform]);
        setPublications(newGames);
    };

    useEffect(() => {
        const fetchData = async () => {
            getPublications({ getOwnGames: true })
                .then((response) => {
                    setMyGames(response);
                })
                .catch((reason) => {
                    if (reason.response.request.status !== 404) {
                        console.log(reason);
                    }
                });
            if (Object.keys(newGames).length === 0) {
                try {
                    const [allPlatforms, newPublications] = await Promise.all([
                        getPlatforms(),
                        getPublications({ getLastGames: true }),
                    ]);
                    allPlatforms.forEach((platform) => {
                        dispatch(addPlatform(platform));
                    });
                    newPublications.forEach((publication) => {
                        dispatch(
                            addNewGames({
                                key: publication.platform_code,
                                values: publication,
                            })
                        );
                    });
                } catch (error) {
                    if (error.response.request.status !== 404) {
                        console.log(reason);
                    }
                }
            }
            fillData();
            setLoad({
                loading: false,
                errorMessage: "",
            });
        };
        fetchData();
    }, []);

    let contentPlatforms;
    if (load.loading) {
        contentPlatforms = <Dialog.Loading loadingProps={{ color: GREEN }} />;
    } else if (load.errorMessage) {
        contentPlatforms = <ErrorText errorMessage={load.errorMessage} />;
    } else {
        contentPlatforms = (
            <FlatList
                data={platformsData}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.outsideFlatlist}>
                            <Pressable
                                onPress={() =>
                                    item.abbreviation
                                        ? navigation.navigate("RecentGames", {
                                              defaultPlatform: item.code,
                                              sortByDate: true,
                                              getOwnGames: false,
                                          })
                                        : navigation.navigate("Home", {
                                              screen: "Games",
                                          })
                                }
                                style={{ flexDirection: "row" }}
                            >
                                <Text
                                    style={[
                                        globalStyles.whiteText,
                                        { fontSize: 17 },
                                    ]}
                                >
                                    {item.abbreviation
                                        ? "New games on " + item.abbreviation
                                        : "My Games"}
                                </Text>
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    size={25}
                                    style={{ color: "white" }}
                                />
                            </Pressable>
                            <FlatListVideoGame
                                platform={item.code}
                                publicationsData={
                                    item.code ? publications : myGames
                                }
                            />
                        </View>
                    );
                }}
            />
        );
    }

    return <>{contentPlatforms}</>;
}

/**
 * Discover page of the application which is the first page after the sign in
 *
 * @returns {JSX.Element} header of the application
 */
function Discover() {
    const navigation = useNavigation();

    return (
        <View
            style={{
                flexDirection: "column",
            }}
        >
            <Header />
            <View
                style={{
                    paddingTop: 20,
                    paddingLeft: 20,
                    height:
                        Dimensions.get("window").height -
                        TAB_NAVIGATOR_HEIGHT -
                        HEADER_HEIGHT,
                }}
            >
                <FlatListPlatform />
            </View>
            <View
                style={{
                    position: "absolute",
                    bottom:
                        Dimensions.get("window").height -
                        TAB_NAVIGATOR_HEIGHT -
                        HEADER_HEIGHT / 2 -
                        MAGNIFYING_GLASS_SIZE / 2,
                    right: 15,
                }}
            >
                <Pressable
                    onPress={() => {
                        navigation.navigate("AllGames", {
                            getOwnGames: false,
                        });
                    }}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size={MAGNIFYING_GLASS_SIZE}
                        style={{ color: "grey" }}
                    />
                </Pressable>
            </View>
        </View>
    );
}

function ErrorText({ errorMessage }) {
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
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
    insideFlatlist: {
        marginVertical: 20,
    },
    outsideFlatlist: {
        maxHeight: "100%",
    },
});

export default Discover;
