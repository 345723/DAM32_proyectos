
import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  // Agregar tarea
  const addTask = () => {
    if (task.trim() === '') return; 
    setTaskList([...taskList, task]);
    setTask('');
  };

  // Eliminar tarea
  const deleteTask = (index) => {
    const newList = taskList.filter((_, i) => i !== index);
    setTaskList(newList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>

      {/* Input y botón */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Escribe una tarea"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={[styles.button, styles.green]} onPress={addTask}>
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de tareas usando map */}
      <ScrollView style={{ flex: 1 }}>
        {taskList.map((item, index) => (
          <View key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
            <TouchableOpacity
              style={[styles.button, styles.red]}
              onPress={() => deleteTask(index)}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  green: {
    backgroundColor: '#4CAF50',
  },
  red: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  taskText: {
    fontSize: 16,
  },
});
