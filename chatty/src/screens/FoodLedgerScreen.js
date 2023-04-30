import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Button,
	TextInput,
	FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";

const FoodLedgerScreen = ({}) => {
	const [total, setTotal] = useState(0);
	const [number, setNumber] = useState("");
	const [merchant, setMerchant] = useState("");
	const [spends, setSpends] = useState([]);
	const [categoryOpen, setCategoryOpen] = useState(false);
	const [categoryValue, setCategoryValue] = useState(null);
	const [category, setCategory] = useState([
		{ label: "Grocery", value: "Grocery" },
		{ label: "Restaurant", value: "Restaurant" },
	]);

	async function loadTotalAndSpends() {
		try {
			const savedTotal = await AsyncStorage.getItem("totalFood");
			const savedSpends = await AsyncStorage.getItem("foodHistory");
			setTotal(savedTotal ? parseFloat(savedTotal) : 0);
			setSpends(savedSpends ? JSON.parse(savedSpends) : []);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		loadTotalAndSpends();
	}, []);

	const onPressAdd = async () => {
		try {
			if (number.length == 0 || categoryValue.length == 0) return;
			const newTotal = (parseFloat(total) + parseFloat(number)).toFixed(2);
			const newSpend = {
				amount: parseFloat(number).toFixed(2),
				merchant,
				categoryValue,
				date: new Date().toLocaleDateString(),
			};

			await AsyncStorage.setItem("totalFood", newTotal.toString());
			await AsyncStorage.setItem(
				"foodHistory",
				JSON.stringify([newSpend, ...spends])
			);
			setTotal(newTotal);
			setSpends([newSpend, ...spends]);
		} catch (err) {
			console.log(err);
		}
	};

	const removeSpend = async (item, index) => {
		try {
			if (item.amount.length == 0) return;
			const updatedSpends = spends.filter((_, i) => i !== index);
			await AsyncStorage.setItem("foodHistory", JSON.stringify(updatedSpends));
			await AsyncStorage.setItem(
				"totalFood",
				(parseFloat(total) - parseFloat(item.amount)).toString()
			);
			setSpends(updatedSpends);

			setTotal(parseFloat(total) - parseFloat(item.amount));
		} catch (error) {
			console.error(error);
		}
	};

	const clear = async () => {
		try {
			await AsyncStorage.setItem("totalFood", "");
			await AsyncStorage.setItem("foodHistory", JSON.stringify([]));
			setTotal(0);
			setSpends([]);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginVertical: 10,
				}}
			>
				<Text style={{ fontSize: 25 }}>Total: ${total}</Text>
				<Text style={{ fontSize: 25 }}>预算: $1200</Text>
				<TouchableOpacity onPress={clear}>
					<Text>下一月</Text>
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					value={number.toString()}
					onChangeText={setNumber}
					placeholder="cost"
				/>
				<TextInput
					style={styles.input}
					value={merchant}
					onChangeText={setMerchant}
					autoCorrect={false}
					placeholder="商家"
				/>
				<Button title="Add" onPress={onPressAdd} />
			</View>
			<DropDownPicker
				open={categoryOpen}
				value={categoryValue}
				items={category}
				setOpen={setCategoryOpen}
				setValue={setCategoryValue}
				setItems={setCategory}
				placeholder="Select Category"
				zIndex={3000}
				zIndexInverse={1000}
			/>
			<View style={{ flexDirection: "row", alignContent: "space-around" }}>
				<Text style={styles.totals}>
					外卖:{" "}
					{spends
						.filter((item) => item.categoryValue === "Restaurant")
						.reduce((acc, curr) => acc + parseInt(curr.amount), 0)}{" "}
				</Text>
				<Text style={styles.totals}>
					食材:{" "}
					{spends
						.filter((item) => item.categoryValue === "Grocery")
						.reduce((acc, curr) => acc + parseInt(curr.amount), 0)}
				</Text>
			</View>
			<View>
				<FlatList
					data={spends.filter((item) => item.categoryValue === "Grocery")}
					renderItem={({ item, index }) => {
						return (
							<View
								style={{ flexDirection: "row", justifyContent: "space-around" }}
							>
								<Text>{item.amount}</Text>
								<Text>{item.merchant}</Text>
								<Text>{item.categoryValue}</Text>
								<Text>{item.date}</Text>
								<TouchableOpacity onPress={() => removeSpend(item, index)}>
									<Text>Remove</Text>
								</TouchableOpacity>
							</View>
						);
					}}
					keyExtractor={(item, index) => index.toString()}
				/>
				<FlatList
					data={spends.filter((item) => item.categoryValue === "Restaurant")}
					renderItem={({ item, index }) => {
						return (
							<View
								style={{ flexDirection: "row", justifyContent: "space-around" }}
							>
								<Text>{item.amount}</Text>
								<Text>{item.merchant}</Text>
								<Text>{item.categoryValue}</Text>
								<Text>{item.date}</Text>
								<TouchableOpacity onPress={() => removeSpend(item, index)}>
									<Text>Remove</Text>
								</TouchableOpacity>
							</View>
						);
					}}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	total: {
		fontSize: 18,
		color: "blue",
		marginBottom: 20,
	},
	totals: {
		flex: 1,
		fontSize: 20,
		margin: 10,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
		marginBottom: 10,
		borderRadius: 5,
		flex: 1,
	},
	picker: {
		borderWidth: 1,
		borderColor: "gray",
		marginBottom: 10,
		borderRadius: 5,
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginVertical: 10,
	},
	button: {
		width: "40%",
	},
	flatList: {
		marginTop: 20,
		maxHeight: 200,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	itemText: {
		fontSize: 16,
		fontWeight: "bold",
	},
});

export default FoodLedgerScreen;
