import { Dimensions } from "react-native";

const ratio = 1;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
	ratio,
	window: {
		width,
		height,
	},
	tabBar: {
		titleBarOffset: 17 * ratio,
		tabBarOffset: 13 * ratio,
		tabBarHeight: 45 * ratio,
		IndicatorHeight: 4 * ratio,
		IndicatorBorderRadius: 6 * ratio,
	},
	screenHorizontalOffset: 17 * ratio,
	screenVerticalOffset: 21 * ratio,
};
