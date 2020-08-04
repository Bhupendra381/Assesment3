import "react-native-gesture-handler";
import * as React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import { StatusBar, StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native";

import Layout from "../constants/Layout";
import Theme from "../constants/Theme";
import FontSize from "../constants/FontSize";

import AuthenticationScreen from "../auth/AuthenticationScreen";
import UserScreen from "../screens/UserScreen";
import AdminScreen from "../auth/AdminScreen";
import AppText from "../components/AppText";

import bind from "../redux/bind";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../redux/reducers";

const store = createStore(reducer);

const Stack = createStackNavigator();

const CustomHeader = bind((props) => {
	const { scene, previous, navigation, user, authenticateUser} = props;
	return (
		<View style={styles.headerContainer}>
			<AppText style={styles.headerText}>Hello, </AppText>
			<AppText style={[styles.headerText, styles.headerUsername]}>{user.username}</AppText>
			<TouchableOpacity
				style={styles.logoutIconContainer}
				onPress={() => {
					Alert.alert("Leaving the account", "Are you sure you want to logout?", [
						{ text: "Cancel" },
						{
							text: "Yes",
							onPress: () => {
								authenticateUser({
									type: "",
									name: "",
									username: "",
									password: "",
									favourites: [],
									status: "",
								});
								navigation.navigate("Authentication");
							}
						},
					]);
				}}
			>
				<Image
					source={require("../assets/icons/logout.png")}
					style={styles.logoutIcon}
				/>
			</TouchableOpacity>
		</View>
	);
});



export default class Nav extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={store}>
				<SafeAreaProvider>
					<SafeAreaView style={styles.container}>
						<StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>

						<NavigationContainer>
							<Stack.Navigator
								initialRouteName="Authentication"
								headerMode="screen"
								screenOptions={{
									header: (props) => <CustomHeader {...props}/>,
								}}
							>
								<Stack.Screen name="Authentication" component={AuthenticationScreen}
								              options={{ headerShown: false }}
								/>
								<Stack.Screen name="UserScreen" component={UserScreen}/>
								<Stack.Screen name="AdminScreen" component={AdminScreen}/>
							</Stack.Navigator>
						</NavigationContainer>
					</SafeAreaView>
				</SafeAreaProvider>
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Theme.primary,
		paddingBottom: 0,
		paddingHorizontal: 0,
	},

	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingTop: 12 * Layout.ratio,
		paddingBottom: 6 * Layout.ratio,
		paddingHorizontal: Layout.screenHorizontalOffset,
		backgroundColor: Theme.primary,
	},
	headerText: {
		fontSize: FontSize[24],
		color: Theme.bright,
	},
	headerUsername: {
		fontWeight: "bold",
	},
	logoutIconContainer: {
		marginLeft: "auto",
	},
	logoutIcon: {
		height: 20 * Layout.ratio,
		width: 20 * 500 / 365  * Layout.ratio,
	},
});