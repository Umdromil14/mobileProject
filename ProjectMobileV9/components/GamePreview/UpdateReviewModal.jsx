import {
    Modal,
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Pressable,
} from "react-native";
import { globalStyles } from "../../styles/globalStyles";
import { Button } from "@rneui/themed";
import { AirbnbRating } from "@rneui/themed";
import { useState } from "react";
import { updateGame } from "../../APIAccess/game";
import { DARK_GREY, GREEN } from "../../tools/constants";

function UpdateReview({ isVisible, onClose, publicationId, comment, rating }) {
    const [newComment, setNewComment] = useState(comment);
    const [newRating, setNewRating] = useState(rating);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => onClose(newComment, newRating)}
        >
            <Pressable
                onPress={onClose}
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    flexGrow: 1,
                }}
            />
            <KeyboardAvoidingView
                behavior={"padding"}
                style={[{ width: "100%", backgroundColor: DARK_GREY }]}
            >
                <View
                    style={[
                        { maxHeight: "100%", width: "80%" },
                        globalStyles.centered,
                    ]}
                >
                    <Text style={styles.titles}>Rating</Text>
                    <AirbnbRating
                        showRating={false}
                        size={30}
                        defaultRating={newRating ? newRating : 0}
                        onFinishRating={(number) => setNewRating(number)}
                    />
                    <Text style={styles.titles}>Comment</Text>
                    <TextInput
                        style={[globalStyles.whiteText, globalStyles.centered]}
                        textAlign="center"
                        defaultValue={newComment ? newComment : ""}
                        multiline={true}
                        onChangeText={(text) => setNewComment(text)}
                        placeholder="Your comment"
                        placeholderTextColor={globalStyles.whiteText}
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingBottom: 10,
                        }}
                    >
                        <Button
                            title="Cancel"
                            titleStyle={{ fontWeight: "700" }}
                            buttonStyle={{
                                backgroundColor: GREEN,
                                borderWidth: 0,
                                borderRadius: 20,
                            }}
                            containerStyle={[
                                globalStyles.modifyButtonContainer,
                                { width: 150, marginBottom: 10 },
                            ]}
                            onPress={() => {
                                setNewRating(rating);
                                setNewComment(comment);
                                onClose({});
                            }}
                        />
                        <Button
                            title="Update"
                            containerStyle={[
                                globalStyles.modifyButtonContainer,
                                { width: 150, marginBottom: 10 },
                            ]}
                            buttonStyle={{
                                backgroundColor: GREEN,
                                borderWidth: 0,
                                borderRadius: 20,
                            }}
                            onPress={() => {
                                if (
                                    newComment !== comment ||
                                    newRating !== rating
                                ) {
                                    updateGame(publicationId, {
                                        review_comment: newComment,
                                        review_rating: newRating,
                                    });
                                    onClose({
                                        comment: newComment,
                                        rating: newRating,
                                    });
                                } else {
                                    onClose({});
                                }
                            }}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    titles: [globalStyles.whiteText, globalStyles.textForm],
});

export default UpdateReview;
