import logo from "../images/logo.png";
import cod from "../images/1.jpg";
import { View, Text, Dimensions, StatusBar, Image, Pressable, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { ValidateButton } from "../tools/AllForForm";
import { Tab, TabView } from "@rneui/themed";
import { useState } from "react";

function GamePreview({navigation}){
    const [index, setIndex] = useState(0);
    return (
        <View
            style={{
                flexDirection: "column",
                height: Dimensions.get("window").height,
            }}
        >
            <View style={{ backgroundColor: "#443D3D", flex: 10 }}>
                <StatusBar backgroundColor={"#443D3D"} hidden={false} />
                <Image style={globalStyles.tinyLogo} source={logo} />
            </View>
            <View
                style={{
                    backgroundColor: "#2C2C2C",
                    flex: 70,
                    justifyContent: "space-between",
                }}
            >
                <View style={globalStyles.containerInsideView}>
                    <View style={{flexDirection:'row'}}>
                        <Pressable onPress={navigation.goBack}>
                            <FontAwesomeIcon icon={faArrowLeft} size={40} style={{ color: "#59A52C" }} />
                        </Pressable>
                        <Text style={[globalStyles.whiteText, {marginLeft: 12, marginTop: 2}, styles.name]}>Name</Text>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 25}}>
                        <Image style={{height: 210, width: 142, marginLeft:14}} source={cod}/>
                        <View style={{flexDirection:'column', marginLeft: 18}}>
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
                                onPress={() => {navigation.navigate("Home")}}
                            />
                        </View>
                    </View>
                </View>
                <View style={{marginTop: 20, height: "100%"}}>
                    <Tab value={index} onChange={(e) => setIndex(e)} indicatorStyle={{backgroundColor: "#59A52C"}}>
                        <Tab.Item
                            title={"Synopsis"} 
                            titleStyle={(active) => ({
                                color: active? "#59A52C" : "#fff",
                                fontSize: 24,
                                fontWeight: "bold"
                        })}/>
                        <Tab.Item 
                            title={"My review"}
                            titleStyle={(active) => ({
                                color: active? "#59A52C" : "#fff",
                                fontSize: 24,
                                fontWeight: "bold"
                        })}/>
                    </Tab>
                    <TabView value={index} onChange={setIndex} animationType="spring">
                        <TabView.Item style={{width: '100%'}}>
                            <Text style={styles.textStyle}>coucouuerdc fvf huevbdcsbhvdc  uh dch vfbdh  hjv fcdh fvhefjcbuedbzjs dvhfbedcj xchb djdvh hjdjv jcvhdbhjvdhjsxjjdfscvfeds xj hvdhsjxhds jxdbhdc hed c ved cjvdhchjvdfchj j djjjjjdcjhdshjhd b db hb jh  jhd</Text>
                        </TabView.Item>
                        <TabView.Item style={{width: '100%'}}>
                            <Text style={styles.textStyle}>coucou2rgtvhf grvbdf dfvtdbv fcvj bevd jcnhfvbjf njfvbhrd cnbvhdf bdfhbvhuf ndvfdbhj c fdbh dhdfnfvf hbhvj ruvrnvjntrvdjvjhdrvn jssgn udnj vnrs budrbjv jnfb uyd  jrv jkbuhrkjd vjkdbvhb jjdrnj drj nd efjoeezlzfoperdjf aLQSFEGZJINIJE ?QZOO JFZIUEBUAQOO</Text>
                        </TabView.Item>
                    </TabView>
                </View>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
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
        {textAlign: "justify"}
    ]
});

export default GamePreview;