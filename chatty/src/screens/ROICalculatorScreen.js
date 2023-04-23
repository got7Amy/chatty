import {React,useState} from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,Modal,Button} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ROICalculatorScreen = () => {
    const [costs, setCosts] = useState([
        { title: 'Purchase Price', value: '0' },
        { title: 'Closing Cost', value: '0' },
        { title: 'Pre-Rent Holding Costs', value: '0' },
        { title: 'Estimated Repairs', value: '0' }
    ]);
    const [totalCost, setTotalCost] = useState(0);
    const [cash, setCash] = useState([
        { title: 'Down Payment', value: '0' },
        { title: 'Loan', value: '0' }
    ]);
    const [totalCash, setTotalCash] = useState(0);
    const [mortgage,setMortgage]=useState('0');
    const [income,setIncome]=useState('0');
    const [expenses, setExpenses] = useState([
        { title: 'Mortgage', value: '0' },
        { title: 'Taxes', value: '0' },
        { title: 'Insurance', value: '0' },
        { title: 'Flood Insurance', value: '0' },
        { title: 'Vacancy', value: '0' },
        { title: 'Repairs', value: '0' },
        { title: 'Capital Expenditures', value: '0' },
        { title: 'Water', value: '0' },
        { title: 'Gas', value: '0' },
        { title: 'Electricity', value: '0' },
        { title: 'Lawn Care', value: '0' },
        { title: 'Property Management', value: '0' },
        { title: 'Other', value: '0' },
    ]);
    const [totalExpense, setTotalExpense] = useState(0);
    const [popupVisible, setPopupVisible] = useState(false);
    const [interiorRepairs, setInteriorRepairs] = useState([
        { title: 'Sheetrock', value: '0' },
        { title: 'Plumbing', value: '0' },
        { title: 'Carpentry', value: '0' },
        { title: 'Electrical', value: '0' },
        { title: 'Painting', value: '0' },
        { title: 'HVAC', value: '0' },
        { title: 'Cabinet', value: '0' },
        { title: 'Appliances', value: '0' },
        { title: 'Doors', value: '0' },
        { title: 'Flooring', value: '0' },
        { title: 'Insulation', value: '0' }
    ]);
    const [exteriorRepairs, setExteriorRepairs] = useState([
        { title: 'Roof', value: '0' },
        { title: 'Concerte', value: '0' },
        { title: 'Gutters', value: '0' },
        { title: 'Garage', value: '0' },
        { title: 'Siding', value: '0' },
        { title: 'Windows', value: '0' },
        { title: 'Landscaping', value: '0' },
        { title: 'Painting', value: '0' },
        { title: 'Septic', value: '0' },
        { title: 'Deck', value: '0' },
        { title: 'Foundation', value: '0' },
        { title: 'Other', value: '0' }
    ]);

    const handleCostChange = (index, cost) => {
        setCosts(prevCosts => {
            const newCosts = [...prevCosts];
            newCosts[index].value = cost;
            return newCosts;
        });
    };

    const calculateTotalCost = () => {
        const newTotalCost=costs.reduce((acc,curr)=>acc+parseInt(curr.value),0);
        setTotalCost(newTotalCost);
    };

    const handleCashChange = (index, cash) => {
        setCash(prevCash => {
            const newCash = [...prevCash];
            newCash[index].value = cash;
            return newCash;
        });
    };

    const calculateTotalCash = () => {
        const newTotalCash=totalCost-cash[1].value;
        setTotalCash(newTotalCash);
    };

    const handleExpenseChange = (index, expense) => {
        setExpenses(prevExpenses => {
            const newExpenses = [...prevExpenses];
            newExpenses[index].value = expense;
            return newExpenses;
        });
    };

    const calculateTotalExpense = () => {
        const newTotalExpense=expenses.reduce((acc,curr)=>acc+parseInt(curr.value),0);
        setTotalExpense(newTotalExpense);
    };

    const handleInteriorRepairChange = (index, interiorRepair) => {
        setInteriorRepairs(prevInteriorRepairs => {
            const newInteriorRepairs = [...prevInteriorRepairs];
            newInteriorRepairs[index].value = interiorRepair;
            return newInteriorRepairs;
        });
    };

    const handleExteriorRepairChange = (index ,exteriorRepair) => {
        setExteriorRepairs(prevExteriorRepairs => {
            const newExteriorRepairs = [...prevExteriorRepairs];
            newExteriorRepairs[index].value = exteriorRepair;
            return newExteriorRepairs;
        });
    }

    const calculateRepairs = () => {
        const totalRepairs = interiorRepairs.reduce((acc,curr)=>acc+parseInt(curr.value),0) + exteriorRepairs.reduce((acc,curr)=>acc+parseInt(curr.value),0);
        costs[3] = { title: 'Estimated Repairs', value: `${totalRepairs}` };
        setPopupVisible(false);
    };

    return (
        <ScrollView style={{paddingHorizontal:10}}>
            <Text style={styles.header}>ROI Calculator</Text>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}></Text>
                {costs.map((cost,index)=>(
                    <View key={index} style={styles.row}>
                        <Text style={styles.label}>{cost.title}</Text>
                        <TextInput
                            style={styles.input}
                            value={cost.value}
                            onChangeText={cost=>{handleCostChange(index,cost)}}
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                    </View>
                ))}
                <View style={styles.totalRow}>
                    <TouchableOpacity style={styles.button} onPress={calculateTotalCost} >
                        <Text style={styles.buttonText}>Calculate Total Cost of Project</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 16,width:80}}>{totalCost}</Text>
                    <TouchableOpacity onPress={()=>setPopupVisible(true)}>
                        <Ionicons name="hammer-outline" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}></Text>
                {cash.map((cash,index)=>(
                    <View key={index} style={styles.row}>
                        <Text style={styles.label}>{cash.title}</Text>
                        <TextInput
                            style={styles.input}
                            value={cash.value}
                            onChangeText={cash=>{handleCashChange(index,cash)}}
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                    </View>
                ))}
                <View style={styles.totalRow}>
                    <TouchableOpacity style={styles.button} onPress={calculateTotalCash}>
                        <Text style={styles.buttonText}>Calculate Total Cash Needed</Text>
                    </TouchableOpacity>
                    <Text style={styles.total}>{totalCash}</Text>
                </View>
                <Text style={styles.annotation}>Total Project Cost  - Loan Amount</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}></Text>
                <View style={styles.totalRow}>
                    <Text style={styles.label}>Monthly Mortgage Payment</Text>
                    <TextInput
                        style={styles.input}
                        value={mortgage}
                        onChangeText={(value)=>{
                            expenses[0]={ title: 'Mortgage', value: `${value}` };
                            setMortgage(value);
                        }}
                        keyboardType="numeric"
                        returnKeyType="done"
                    />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}></Text>
                <View style={styles.totalRow}>
                    <Text style={styles.label}>Total Monthly Income</Text>
                    <TextInput
                        style={styles.input}
                        value={income}
                        onChangeText={setIncome}
                        keyboardType="numeric"
                        returnKeyType="done"
                    />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}></Text>
                {expenses.map((expense,index)=>(
                    <View key={index} style={styles.row}>
                        <Text style={styles.label}>{expense.title}</Text>
                        <TextInput
                            style={styles.input}
                            value={expense.value}
                            onChangeText={expense=>{handleExpenseChange(index,expense)}}
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                    </View>
                ))}
                <View style={styles.totalRow}>
                    <TouchableOpacity style={styles.button} onPress={calculateTotalExpense}>
                        <Text style={styles.buttonText}>Calculate Total Expenses</Text>
                    </TouchableOpacity>
                    <Text>{totalExpense}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionHeader}></Text>
                <View style={styles.totalRow}>
                    <Text style={styles.title}>Per Month Cashflow</Text>
                    <Text style={styles.number}>{income} - {totalExpense} = {income-totalExpense}</Text>
                </View>
                <Text style={styles.annotation}>Total Monthly Income - Total Expenses</Text>
                <View style={styles.totalRow}>
                    <Text style={styles.title}>Annual Cash Flow</Text>
                    <Text style={styles.number}> {income-totalExpense} * 12 = {(income-totalExpense)*12}</Text>
                </View>
                <Text style={styles.annotation}>Per Month Cashflow * 12</Text>
                <View style={styles.totalRow}>
                    <Text style={styles.title}>CoCROI</Text>
                    <Text style={styles.number}>{(income-totalExpense)*12} / {totalCash} = {(income-totalExpense)*12/totalCash}</Text>
                </View>
                <Text style={styles.annotation}>Annual Cashflow / Total Invested Capital</Text>
            </View>
            <Modal visible={popupVisible} animationType="slide">
                <ScrollView style={{marginTop:30, paddingHorizontal:10}}>
                    <Text style={styles.repairHeader}>Interior Repairs</Text>
                    {interiorRepairs.map((interiorRepair,index)=>(
                        <View key={index} style={styles.row}>
                            <Text style={styles.label}>{interiorRepair.title}</Text>
                            <TextInput
                                style={styles.input}
                                value={interiorRepair.value}
                                onChangeText={interiorRepair=>{handleInteriorRepairChange(index,interiorRepair)}}
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </View>
                    ))}
                    <Text style={styles.repairHeader}>Exterior Repairs</Text>
                    {exteriorRepairs.map((exteriorRepair,index)=>(
                        <View key={index} style={styles.row}>
                            <Text style={styles.label}>{exteriorRepair.title}</Text>
                            <TextInput
                                style={styles.input}
                                value={exteriorRepair.value}
                                onChangeText={exteriorRepair=>{handleExteriorRepairChange(index,exteriorRepair)}}
                                keyboardType="numeric"
                                returnKeyType="done"
                            />
                        </View>
                    ))}
                    <View style={{flexDirection: 'row', paddingBottom:7}}>
                        <View style={{flex: 1}}>
                            <Button title="Calculate" onPress={calculateRepairs} />
                        </View>
                        <TouchableOpacity style={{opacity:0.3}} onPress={() => setPopupVisible(false)}>
                            <Ionicons name="ios-close" size={35} color="black" />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      textAlign:'center',
      fontSize: 24,
      fontWeight: 'bold',
      paddingTop:10,
      fontFamily:'Papyrus'
    },
    section: {
      marginBottom: 20,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    label: {
      flex: 1,
      fontSize: 16,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingLeft: 10,
      fontSize: 16,
    },
    totalRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#007aff',
      borderRadius: 4,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginRight: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    total: {
      fontSize: 16,
    },
    title:{
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor:'blue',
        color:'white',
        borderRadius: 4,
        overflow: "hidden",
    },
    number:{
        flex: 1,
        height: 40,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 20
    },
    annotation:{
        color:'grey',
        paddingBottom:10,
        paddingTop:4,
        paddingLeft:5,
        fontSize:15
    },
    repairHeader:{
        alignSelf:'center',
        fontFamily:'Times New Roman',
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop:10,
        fontSize:20
    }
  });
  
  

export default ROICalculatorScreen;