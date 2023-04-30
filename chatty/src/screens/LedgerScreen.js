import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LedgerScreen = ({ navigation }) => {
	return (
		<View>
			<View style={styles.menuContainer}>
				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate("Game")}
				>
					<Ionicons name="game-controller-outline" size={40} color="black" />
					<Text style={styles.menuItemText}>Game</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate("OtherLedger")}
				>
					<Ionicons name="wallet-outline" size={40} color="black" />
					<Text style={styles.menuItemText}>其他花销</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.menuContainer}>
				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate("RentalBookkeeping")}
				>
					<Ionicons name="business-outline" size={40} color="black" />
					<Text style={styles.menuItemText}>Rental Bookkeeping</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.menuItem}
					onPress={() => navigation.navigate("")}
				>
					<Ionicons name="help-circle-outline" size={40} color="black" />
					<Text style={styles.menuItemText}>Ads</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	menuContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		paddingVertical: 16,
		paddingHorizontal: 20,
		marginVertical: 15,
		borderRadius: 10,
	},
	menuItem: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	menuItemText: {
		marginTop: 8,
		fontSize: 15,
		fontWeight: "bold",
		color: "black",
	},
});

export default LedgerScreen;
