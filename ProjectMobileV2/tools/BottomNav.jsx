import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../components/account";
import Games from "../components/games";
import Discover from "../components/discover";

const Tab = createBottomTabNavigator();

function Screens(){
    console.log("avant");
    return (
        <Tab.Navigator>
            <Tab.Screen name="GAMES" component={Games}/>
            <Tab.Screen name="DISCOVER" component={Discover}/>
            <Tab.Screen name="ACCOUNT" component={Account}/>
        </Tab.Navigator>
    );
}

export { Screens };