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
import { faL } from "@fortawesome/free-solid-svg-icons";

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
        addGames(DEFAULT_PLATFORM, [], true);
    }, []);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
        } else {
            setIsLoading(false);
        }
    }, [videoGames]);

    const addGames = (platform, genres, reload = false) => {
        if (reload) {
            page.current = 1;
        }

        getVideoGamesWithPlatformsAndGenres(
            platform,
            undefined,
            genres,
            true,
            page.current,
            LIMIT
        )
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

    const renderItem = ({ item }) => {
        return (
            <Pressable onPress={() => navigation.navigate("GamePreview",
            { videoGameId: item.id, actualPlatform: item.platforms[0] })}>
                <Image
                    source={images[item.id]}
                    style={{
                        margin: IMAGE_MARGIN,
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                    }}
                />
            </Pressable>
        );
    };

    const handleLoadMore = () => {
        if (loadMore) {
            addGames(selectedFilter.platform, selectedFilter.genres);
        }
    };

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

    const renderFlatlist = () => {
        if (isLoading) {
            return (
                <View style={styles.inner}>
                    <ActivityIndicator size={LOAD_SIZE} color={GREEN} />
                </View>
            );
        }

        if (videoGames.length === 0) {
            return (
                <ErrorText errorMessage="It seems that no video games have been found" />
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

    const modalOnReset = () => {
        setIsLoading(true);
        setSelectedFilter({
            platform: DEFAULT_PLATFORM,
            genres: [],
        });
        addGames(DEFAULT_PLATFORM, [], true);
    };

    const modalOnApply = (genres, platform) => {
        if (
            JSON.stringify(selectedFilter.genres) !== JSON.stringify(genres) ||
            selectedFilter.platform !== platform
        ) {
            setIsLoading(true);
            setSelectedFilter({
                platform,
                genres,
            });
            addGames(platform, genres, true);
        }
    };

    return (
        <View style={styles.container}>
            <Header onSearchChange={setSearch} />
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
