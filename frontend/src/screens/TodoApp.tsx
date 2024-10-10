import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Task from "../../components/Task";
import { Todo } from "../../types";
import { useNavigation } from "@react-navigation/native";

export default function TodoApp() {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<Todo[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const apiURL = 'http://10.22.40.158:5000';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${apiURL}/get`);
      const data = await response.json();
      setTaskItems(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTask = async () => {
    Keyboard.dismiss();
    try {
      const response = await fetch(`${apiURL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: task, description: '' }),
      });
      const newTask = await response.json();
      setTaskItems([...taskItems, newTask]);
      setTask('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleSave = async (id: string | undefined, newTitle: string, newDescription: string) => {
    try {
        const response = await fetch(`${apiURL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTitle, description: newDescription }),
        });
        const updatedTask = await response.json();
        setTaskItems(taskItems.map(task => task._id === updatedTask._id ? updatedTask : task));
    } catch (error) {
        console.error('Error updating todo:', error);
    }
};

  const handleDelete = async (id: string | undefined) => {
    try {
      await fetch(`${apiURL}/delete/${id}`, {
        method: 'DELETE',
      });
      setTaskItems(taskItems.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id: string | undefined) => {
    try {
        const response = await fetch(`${apiURL}/mark-complete/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updatedTask = await response.json();
        setTaskItems(taskItems.map(task => task._id === updatedTask._id ? updatedTask : task));
    } catch (error) {
        console.error('Error marking todo as complete:', error);
    }
};

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskItems.map((item, index) => (
              <Task
                key={index}
                id={item._id}
                title={item.title}
                isCompleted={item.isCompleted}
                text={item.title}
                onSave={(newText: string, newDescription: string) => handleSave(item._id, newText, newDescription)}
                onToggleComplete={() => handleToggleComplete(item._id)}
                onDelete={() => handleDelete(item._id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});