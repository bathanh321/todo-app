import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Task = (props: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(props.text);
    const [editDescription, setEditDescription] = useState(props.description);
    const [isCompleted, setIsCompleted] = useState(props.isCompleted);
    const [confirm, setConfirm] = useState(false);

    const handlePress = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = () => {
        props.onSave(editText, editDescription);
        setIsEditing(false);
    };

    const handleToggleComplete = () => {
        setIsCompleted(!isCompleted);
        props.onToggleComplete();
    };

    const handleDelete = () => {
        setConfirm(false);
        props.onDelete();
    }

    return (
        <View>
            <TouchableOpacity style={{ marginRight: 8 }} onPress={handlePress}>
                <View style={styles.item}>
                    <View style={styles.itemLeft}>
                        <TouchableOpacity onPress={handleToggleComplete}>
                            <Icon name={props.isCompleted === true ? "check-square" : "square"} size={24} color="green" />
                        </TouchableOpacity>
                        <Text style={styles.itemText}>{props.text}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setConfirm(true)}>
                        <Icon name="trash" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            {isEditing && (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={editText}
                        onChangeText={setEditText}
                        placeholder="Edit title"
                    />
                    <TextInput
                        style={styles.input}
                        value={editDescription}
                        onChangeText={setEditDescription}
                        placeholder="Edit description"
                    />
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
             <Modal
                animationType="slide"
                transparent={true}
                visible={confirm}
                onRequestClose={() => setConfirm(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure you want to delete {props.title}?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonCancel]}
                                onPress={() => setConfirm(false)}
                            >
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonDelete]}
                                onPress={handleDelete}
                            >
                                <Text style={styles.textStyle}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        maxWidth: '80%',
        marginLeft: 10,
    },
    editContainer: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        marginBottom: 10,
    },
    saveText: {
        color: 'blue',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonCancel: {
        backgroundColor: '#2196F3',
    },
    buttonDelete: {
        backgroundColor: '#FF0000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Task;