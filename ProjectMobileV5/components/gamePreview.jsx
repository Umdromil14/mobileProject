import logo from "../images/logo.png";
import cod from "../images/1.jpg";
import { View, Text, StatusBar, Image, Pressable, StyleSheet, ScrollView } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ValidateButton } from "../tools/AllForForm";
import { Tab, TabView, AirbnbRating, Input } from "@rneui/themed";
import { useState } from "react";

function GamePreview({ navigation }) {
    const nbChildren = 2;
    const [childSeen, setChildSeen] = useState(0);
    const [isChildrenSeen, setIsChildrenSeen] = useState(false);
    const [heightScroll, setHeightScroll] = useState(0);
    const [index, setIndex] = useState(0);

    const handleHeightScroll = (height) => {
        if (!isChildrenSeen) {
            setHeightScroll(heightScroll + height);
            setChildSeen(childSeen + 1);
            if (childSeen === nbChildren) {
                setIsChildrenSeen(true);
            }
            console.log(heightScroll);
        }
    }

    return (
        <View
            style={{
                flexDirection: "column",
                flexGrow: 1
            }}
        >
            <View style={{ backgroundColor: "#443D3D", paddingBottom: 30 }}>
                <StatusBar backgroundColor={"#443D3D"} hidden={false} />
                <Image style={globalStyles.tinyLogo} source={logo} />
            </View>
            <View
                style={{
                    padding: 10,
                    backgroundColor: "#2C2C2C",
                    flexGrow: 1
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Pressable onPress={navigation.goBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#59A52C" }} />
                    </Pressable>
                    <Text style={[globalStyles.whiteText, { marginLeft: 12, marginTop: 2 }, styles.name]}>Name</Text>
                </View>
                <ScrollView contentContainerStyle={{ flexGrow: 1, height: heightScroll }}>
                    <View onLayout={(e) => handleHeightScroll(e.nativeEvent.layout.height)} style={globalStyles.containerInsideView}>
                        <Image style={{ maxHeight: 210, width: 142, marginLeft: 14 }} source={cod} />
                        <View style={{ flexDirection: 'column', marginLeft: 18 }}>
                            <Text style={[globalStyles.greenText, styles.informationsTitle]}>Release date</Text>
                            <Text style={[globalStyles.whiteText, styles.informationsText]}>attendre BD</Text>
                            <Text style={[globalStyles.greenText, styles.informationsTitle]}>Release price</Text>
                            <Text style={[globalStyles.whiteText, styles.informationsText]}>attendre BD</Text>
                            <Text style={[globalStyles.greenText, styles.informationsTitle]}>Platform</Text>
                            <Text style={[globalStyles.whiteText, styles.informationsText]}>attendre BD</Text>
                            <ValidateButton
                                title={"Store page"}
                                titleStyle={styles.buttonTextStyle}
                                containerStyle={styles.storeButton}
                                onPress={() => { navigation.navigate("Home") }}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20, flexGrow: 1 }}>
                        <Tab value={index} onChange={(e) => setIndex(e)} indicatorStyle={{ backgroundColor: "#59A52C" }}>
                            <Tab.Item
                                title={"Synopsis"}
                                titleStyle={(active) => ({
                                    color: active ? "#59A52C" : "#fff",
                                    fontSize: 24,
                                    fontWeight: "bold"
                                })} />
                            <Tab.Item
                                title={"My review"}
                                titleStyle={(active) => ({
                                    color: active ? "#59A52C" : "#fff",
                                    fontSize: 24,
                                    fontWeight: "bold"
                                })} />
                        </Tab>
                        <TabView value={index} onChange={setIndex} animationType="spring">
                            <TabView.Item style={{ width: '100%'}}>
                                <View>
                                    <Text style={styles.textStyle}>coucouuerdc fvf huevbdcsbhvdc  uh dch vfbdh  hjv fcdh fvhefjcbuedbzjs dvhfbedcj xchb djdvh hjdjv jcvhdbhjvdhjsxjjdfscvfeds xj hvdhsjxhds jxdbhdc hed c ved cjvdhchjvdfchj j djjjjjdcjhdshjhd b db hb jh  jhd</Text>
                                </View>
                            </TabView.Item>
                            <TabView.Item 
                                 style={{ width: '100%' }}>
                                <View onLayout={(e) => handleHeightScroll(e.nativeEvent.layout.height)} style={{ paddingTop: 10 }}>
                                    <AirbnbRating
                                        showRating={false}
                                        size={30}
                                    />
                                    <Text style={styles.textStyle}>coucou2rgtvhf ghvhjd gfj vherv nf ghu fvh fdnfv hjvberhvf nbhgev hdfjfhv'vuesvf jgbhguv nfj jigvj jkghubj n'jgb r viuhguv sj hub'rhidk jfior'fh bhsbuvrj edkdopbuidfbj nrzrjiuv bsorirfzoegi r jih iuerni errvbdf dfvt rffhebcdv jiwc dfvdqkxs fv c sdkcf ejc dfsivcsd nsdjbcs sd dcqjskxnkzokq csvjfbdqzzehvydc fhuuevb d fdshuchs jcjezhuifcj sv vhbhubezjjv ervb jvnriughefbjehferiocknjtghejcvrgvnidbv fcvj bevd jcnhfvbjf njfvbhrd cnbvhdf bdfhbvhuf ndvfdbhj c fdbh dhdfnfvf efvcbh dhcbvbe dndfrvb dffvebd nvfjrvb herhvfhrvjuhsehjsvjheshrbvhjbh her rebv hbr ehvbrvbbv seruhervhbhbv qzf jjkda jzojaioznvdjzoqkpveakopqjsojpodjcaozqfgzveufhuzfizjadjfire oihfj hfhcsjkc reuhjdncieozqonc edjkzqnkda po ekeqjoeoj zkc osr boz rijvdnrfdezkrvbj fs,gjb   irej vn jd i kjcer ufvhs  jierif ejk iu sdk innc jr ueiehfiu zhsc sruerh nsj gjd jsj heuivjkn  hbhvj ruvrnvjntrvdjvjhdrvn jssgn udnj vnrs budrbjv jnfb uyd  jrv jkbuhrkjd vjkdbvhb jjdrnj drj nd efjoeezlzfoperdjf aLQSFEGZJINIJE ?QZOO JFZIUEBUAQOO</Text>
                                    <ValidateButton
                                        title={"Modify"}
                                        containerStyle={[globalStyles.modifyButtonContainer, {marginBottom: 10}]}
                                    />
                                </View>
                            </TabView.Item>
                        </TabView>
                    </View>
                </ScrollView>
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
    ]
});

export default GamePreview;