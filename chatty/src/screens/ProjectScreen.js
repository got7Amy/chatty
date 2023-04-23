import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList, Modal, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const ProjectScreen = () => {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [projects, setProjects] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [projectHistory,setProjectHistory]=useState([]);
  const [projectHistoryVisible,setProjectHistoryVisible]=useState(false);
  const [finishDateVisible,setFinishDateVisible]=useState(false);
  const [finishDate, setFinishDate] = useState('');
  const [selectedProject,setSelectedProject]=useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const existingProjects = await AsyncStorage.getItem('projects');
        const existingProjectHistory = await AsyncStorage.getItem('projectHistory');
        setProjects(existingProjects ? JSON.parse(existingProjects) : []);
        setProjectHistory(existingProjectHistory ? JSON.parse(existingProjectHistory) : []);
      } catch (error) {
        console.error(error);
      }
    }
    loadProjects();
  }, []);

  const handleSave = async () => {
    try {
      const newProject = { name: projectName, startDate };
      const updatedProjects = [...projects, newProject];
      await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      setProjectName('');
      setStartDate('');
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (index) => {
    try {
      const updatedProjects = projects.filter((_, i) => i !== index);
      await AsyncStorage.setItem('projects', JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
    } catch (error) {
      console.error(error);
    }
  };

  const addToHistory = async () => {
    try{
      const newRecord = {projectName:selectedProject.projectName, startDate:selectedProject.startDate, finishDate};
      const updatedHistory = [newRecord, ...projectHistory];
      await AsyncStorage.setItem('projectHistory', JSON.stringify(updatedHistory));
      setProjectHistory(updatedHistory);
      handleRemove(selectedProject.index);
      setFinishDateVisible(false);
    }catch(err){
      console.log(err);
    }
  };

  const removeHistory = async (index) => {
    try {
      const updatedHistory = projectHistory.filter((_, i) => i !== index);
      await AsyncStorage.setItem('projectHistory', JSON.stringify(updatedHistory));
      setProjectHistory(updatedHistory);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
        <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Ionicons name="ios-close" size={40} color="black" />
          </TouchableOpacity>
        </View>
          <Text style={styles.title}>Add Project</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Project Name"
              value={projectName}
              onChangeText={setProjectName}
            />
            <TextInput
              style={styles.input}
              placeholder="Start Date (YYYY-MM-DD)"
              value={startDate}
              onChangeText={setStartDate}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal visible={finishDateVisible} animationType="slide">
        <View style={{ flexDirection: 'row', alignItems: 'center' ,justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setFinishDateVisible(false)}>
            <Ionicons name="ios-close" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.project}>
        <Text style={{fontSize: 23, fontFamily: 'Times New Roman', marginBottom: 6}}>{selectedProject?selectedProject.projectName:null}</Text>
          <Text style={styles.projectStartDate}>{selectedProject?selectedProject.startDate:null}</Text>
          <TextInput
            style={styles.input}
            placeholder="Finish Date (YYYY-MM-DD)"
            value={finishDate}
            onChangeText={setFinishDate}
          />
          <TouchableOpacity style={styles.finishButton} onPress={addToHistory}>
            <Text style={styles.removeButtonText}>Finish!</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal visible={projectHistoryVisible} animationType="slide">
        <Text style={styles.header}>Projects History</Text>
        <FlatList
          data={projectHistory}
          renderItem={({ item, index }) => (
            <View style={styles.project}>
              <Text style={styles.projectName}>{item.projectName}</Text>
              <Text style={styles.projectStartDate}>{item.startDate} - {item.finishDate}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeHistory(index)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.closeButton} onPress={() => setProjectHistoryVisible(false)}>
          <Ionicons name="ios-close" size={40} color="black" />
        </TouchableOpacity>
      </Modal>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.header}>Projects</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="ios-add" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setProjectHistoryVisible(true)}>
          <Ionicons name="archive-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
          data={projects}
          renderItem={({ item, index }) => (
            <View style={styles.project}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.projectName}>{item.name}</Text>
                <TouchableOpacity style={{opacity: 0.5}} onPress={()=>{
                    setSelectedProject({projectName:item.name, startDate:item.startDate, finishDate:null, index});
                    setFinishDateVisible(true);
                  }}>
                    <Ionicons name="checkmark-done-circle-outline" size={30} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.projectStartDate}>{item.startDate}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(index)}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    header:{
      flex:1,
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      color: '#333333'
    },
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      color: '#333333'
    },
    form: {
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20
    },
    input: {
      height: 40,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    project: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 5,
      margin: 10,
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    projectName: {
      flex:1,
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333333'
    },
    projectStartDate: {
      fontSize: 18,  
      fontFamily: 'Georgia',
      color: '#333', 
      marginBottom: 5
    },
    removeButton: {
      backgroundColor: '#FF5722',
      padding: 10,
      borderRadius: 5,
      marginTop: 10
    },
    finishButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginTop: 10
    },
    removeButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    emptyList: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    emptyListText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333'
    },
    closeButton: {
      opacity:0.3
    }
  });

export default ProjectScreen;