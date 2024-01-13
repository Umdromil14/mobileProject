import { useState, useEffect, useRef } from "react";
import {
    Image,
    View,
    StyleSheet,
    FlatList,
    Dimensions,
    ActivityIndicator,
    Pressable,
} from "react-native";
import { Button } from "@rneui/themed";
import { getPublications } from "../../APIAccess/publication";
import { getPlatforms } from "../../APIAccess/platform";
import { getGenres } from "../../APIAccess/genre";
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
import { API_BASE_URL } from "../../APIAccess/AxiosInstance";

const DEFAULT_PLATFORM = "PC";
const LIMIT = 48;

const IMAGE_MARGIN = 5;
const IMAGE_WIDTH = Dimensions.get("window").width / 3 - IMAGE_MARGIN * 2;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.36;
const FILTER_BUTTON_WIDTH = 150;

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
    filterButtonContainer: {
        position: "absolute",
        bottom: 0,
        right: Dimensions.get("window").width / 2 - FILTER_BUTTON_WIDTH / 2,
        paddingBottom: 16,
    },
    filterButton: {
        backgroundColor: GREEN,
        borderRadius: 20,
        width: FILTER_BUTTON_WIDTH,
    },
});

/**
 * Displays the video games
 *
 * @param {object} props The props object
 * @param {object} props.navigation The navigation object
 *
 * @returns {JSX.Element} The video games
 */
export default function Games({ navigation }) {
    const [search, setSearch] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [videoGames, setVideoGames] = useState([]);

    const [selectedFilter, setSelectedFilter] = useState({
        platform: DEFAULT_PLATFORM,
        genres: [],
    });

    const page = useRef(1);
    const firstLoad = useRef(true);
    const [isLoading, setIsLoading] = useState(true);
    const [loadMore, setLoadMore] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        Promise.all([getPlatforms(), getGenres(undefined, true)])
            .then((response) => {
                setPlatforms(response[0]);
                setGenres(response[1]);
            })
            .catch((error) => {
                if (error.response?.data.code?.includes("JWT")) {
                    navigation.navigate("SignIn");
                }
            });
    }, []);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
        } else {
            setIsLoading(false);
        }
    }, [videoGames]);

    useEffect(() => {
        setIsLoading(true);
        addGames(true);
    }, [selectedFilter.platform, selectedFilter.genres, search]);

    /**
     * Adds games to the list; if a JWT error is catched, the user is redirected to the sign in page
     *
     * @param {boolean=} reload `true` if the list should be emptied before adding the games, `false` otherwise; defaults to `false`
     *
     * @returns {void}
     */
    const addGames = (reload = false) => {
        if (reload) {
            page.current = 1;
        }

        getPublications({
            platformCode: selectedFilter.platform,
            videoGameName: search,
            genresIds: selectedFilter.genres,
            getOwnGames: true,
            alphabetical: true,
            page: page.current,
            limit: LIMIT,
        })
            .then((newVideoGames) => {
                if (reload) {
                    setVideoGames(newVideoGames);
                } else {
                    setVideoGames([...videoGames, ...newVideoGames]);
                }

                if (newVideoGames.length < LIMIT) {
                    setLoadMore(false);
                } else {
                    setLoadMore(true);
                }
                page.current += 1;
            })
            .catch((error) => {
                if (error.response?.data.code?.includes("JWT")) {
                    navigation.navigate("SignIn");
                } else {
                    if (reload) {
                        setVideoGames([]);
                    }
                    setLoadMore(false);
                }
            });
    };

    /**
     * Renders a video game in the flatlist
     *
     * @param {object} param0 The object containing the video game
     * @param {object} param0.item The video game
     * @param {number} param0.item.video_game_id The video game's id
     * @param {string} param0.item.platform_code The video game's platform code
     *
     * @returns {JSX.Element} The video game; a pressable image that redirects to the game preview page
     */
    const renderItem = ({ item }) => {
        return (
            <Pressable
                onPress={() => {
                    navigation.navigate("GamePreview", {
                        videoGameId: item.video_game_id,
                        actualPlatform: item.platform_code,
                    });
                }}
            >
                <Image
                    source={{
                        uri: `${API_BASE_URL}/videoGame/${item.video_game_id}.png`,
                    }}
                    style={{
                        margin: IMAGE_MARGIN,
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                    }}
                />
            </Pressable>
        );
    };

    /**
     * Handles the load more event; adds more games to the list if loadMore is `true`
     *
     * @returns {void}
     */
    const handleLoadMore = () => {
        if (loadMore) {
            addGames();
        }
    };

    /**
     * Renders the footer of the flatlist; an activity indicator if loadMore is `true`, an empty view otherwise
     *
     * @returns {JSX.Element} The footer
     */
    const renderFooter = () => {
        return loadMore ? (
            <ActivityIndicator
                style={{ paddingTop: 16, paddingBottom: 70 }}
                size="large"
                color={GREEN}
            />
        ) : (
            <View style={{ paddingBottom: 30 }} />
        );
    };

    /**
     * Renders the flatlist; an activity indicator if isLoading is `true`, an error message if no video games are found, the flatlist otherwise
     *
     * @returns {JSX.Element} The flatlist, an activity indicator or an error message
     */
    const renderFlatlist = () => {
        if (isLoading) {
            return (
                <View style={styles.inner}>
                    <ActivityIndicator size={LOAD_SIZE} color={GREEN} />
                </View>
            );
        }

        if (videoGames.length === 0) {
            if (search !== "" || selectedFilter.genres.length !== 0) {
                return (
                    <ErrorText errorMessage="No video games match your search criteria" />
                );
            }
            return (
                <ErrorText errorMessage="It seems that you have no video games" />
            );
        }

        return (
            <FlatList
                data={videoGames}
                numColumns={3}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
            />
        );
    };

    /**
     * Resets the selected filter to the default platform and an empty array of genres
     * 
     * @returns {void}
     */
    const modalOnReset = () => {
        setSelectedFilter({
            platform: DEFAULT_PLATFORM,
            genres: [],
        });
    };

    /**
     * Sets the selected filter to the given platform and genres
     * 
     * @param {int[]} genres The genres ids
     * @param {string} platform The platform code
     * 
     * @returns {void}
     */
    const modalOnApply = (genres, platform) => {
        setSelectedFilter({
            platform,
            genres,
        });
    };

    return (
        <View style={styles.container}>
            <Header onSearch={setSearch} />
            <View style={styles.body}>
                <View style={{ width: "100%", paddingTop: 10 }}>
                    <FilterModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onReset={modalOnReset}
                        onApply={modalOnApply}
                        platforms={platforms}
                        genres={genres}
                        selectedFilter={selectedFilter}
                    />
                    {renderFlatlist()}
                    <View style={styles.filterButtonContainer}>
                        <Button
                            title="FILTERS"
                            onPress={() => setIsModalOpen(true)}
                            buttonStyle={styles.filterButton}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}
