import { useRef } from "react";
import {
    Modal,
    View,
    StyleSheet,
    Text,
    FlatList,
    Dimensions,
    Touchable,
} from "react-native";
import { Button } from "@rneui/themed";
import images from "../../images/button/images";
import logos from "../../images/platform/logos";
import { DARK_GREY, GREEN } from "../../tools/constants";
import ErrorText from "../Utils/ErrorText";
import ImageButton from "../Utils/ImageButton";
import DropdownList from "../Utils/DropdownList";

const BOX_PADDING = 20;
const MODAL_DIVISION = ["30%", "55%", "15%"];
const FLATLIST_ITEM_MARGIN = 2;
const FLATLIST_ITEM_WIDTH =
    (Dimensions.get("window").width - BOX_PADDING * 2) / 3 -
    FLATLIST_ITEM_MARGIN * 2;
const FLATLIST_ITEM_HEIGHT = FLATLIST_ITEM_WIDTH * 0.5;
const BUTTON_MARGIN = 10;

const styles = StyleSheet.create({
    container: {
        height: 465,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        backgroundColor: DARK_GREY,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    box: {
        width: "100%",
        padding: BOX_PADDING,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom: 10,
    },
    flatListButton: {
        flex: 1,
        width: FLATLIST_ITEM_WIDTH,
        margin: FLATLIST_ITEM_MARGIN,
        height: FLATLIST_ITEM_HEIGHT,
        borderRadius: 5,
        justifyContent: "center",
    },
    button: {
        borderRadius: 20,
        width:
            (Dimensions.get("window").width - BOX_PADDING * 2) / 2 -
            BUTTON_MARGIN,
    },
});

/**
 * Displays a modal to filter the games
 *
 * @param {object} props The props object
 * @param {boolean} props.isOpen Whether the modal is open or not
 * @param {function} props.onClose The function to call when the modal is closed
 * @param {function} props.onReset The function to call when the reset button is pressed
 * @param {function} props.onApply The function to call when the apply button is pressed
 * @param {object[]} props.platforms The platforms
 * @param {object[]} props.genres The genres
 * @param {object} props.selectedFilter The selected filter
 * @param {string} props.selectedFilter.platform The selected platform
 * @param {string[]} props.selectedFilter.genres The selected genres
 *
 * @returns {JSX.Element} The modal
 */
export default function FilterModal({
    isOpen,
    onClose,
    onReset,
    onApply,
    platforms,
    genres,
    selectedFilter,
}) {
    const selectedPlatform = useRef("");
    const selectedGenres = useRef([]);

    const setSelectedPlatform = (platform) => {
        selectedPlatform.current = platform;
    };

    const setSelectedGenres = (genres) => {
        selectedGenres.current = genres;
    };

    setSelectedPlatform(selectedFilter.platform);
    setSelectedGenres(selectedFilter.genres);

    const handleSelectedGenresChange = (genreId) => {
        const index = selectedGenres.current.indexOf(genreId);
        const newSelectedGenres =
            index !== -1
                ? selectedGenres.current.filter((id) => id !== genreId)
                : [...selectedGenres.current, genreId];

        selectedGenres.current = newSelectedGenres;
    };

    const GenresFlatList = () => {
        return genres.length === 0 ? (
            <ErrorText errorMessage="It seems that no genres have been found" />
        ) : (
            <FlatList
                data={genres}
                numColumns={3}
                renderItem={({ item }) => (
                    <ImageButton
                        source={images[item.id]}
                        onPress={() => {
                            handleSelectedGenresChange(item.id);
                        }}
                        text={item.name}
                        style={styles.flatListButton}
                        borderRadius={5}
                        displayOverlay={selectedGenres.current.includes(
                            item.id
                        )}
                    />
                )}
            />
        );
    };

    return (
        <Modal
            animationGenre="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    flex: 1,
                }}
            />
            <View style={styles.container}>
                <View
                    style={[
                        styles.box,
                        {
                            height: MODAL_DIVISION[0],
                        },
                    ]}
                >
                    <Text style={styles.title}>Platforms</Text>
                    <DropdownList
                        data={platforms.map((platform) => ({
                            label: platform.description,
                            value: platform.code,
                            image: logos[platform.code],
                        }))}
                        selectedValue={selectedPlatform.current}
                        onChange={(platform) => {
                            setSelectedPlatform(platform);
                        }}
                    />
                </View>
                <View
                    style={[
                        styles.box,
                        {
                            height: MODAL_DIVISION[1],
                        },
                    ]}
                >
                    <Text style={styles.title}>Genres</Text>
                    <GenresFlatList />
                </View>
                <View
                    style={[
                        styles.box,
                        {
                            height: MODAL_DIVISION[2],
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderBottomWidth: 0,
                        },
                    ]}
                >
                    <Button
                        title="RESET"
                        onPress={() => {
                            onReset();
                            onClose();
                        }}
                        buttonStyle={[
                            styles.button,
                            {
                                backgroundColor: DARK_GREY,
                                borderColor: "#ffffff",
                                borderWidth: 1,
                                marginRight: BUTTON_MARGIN,
                            },
                        ]}
                    />
                    <Button
                        title="APPLY"
                        onPress={() => {
                            onApply(
                                selectedGenres.current,
                                selectedPlatform.current
                            );
                            onClose();
                        }}
                        buttonStyle={[
                            styles.button,
                            {
                                backgroundColor: GREEN,
                                marginLeft: BUTTON_MARGIN,
                            },
                        ]}
                    />
                </View>
            </View>
        </Modal>
    );
}
