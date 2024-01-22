import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { TTodo, useTodos } from '../store/zustand/todos';
import { randomUUID } from 'expo-crypto';

export default function CreateTodo() {
    const [todo, setTodo] = useState<TTodo>({
        id: '',
        description: '',
        title: '',
    });

    const { addTodo } = useTodos();

    const handleInputTitle = (title: string) => {
        setTodo({ ...todo, title });
    };

    const handleInputDescription = (description: string) => {
        setTodo({ ...todo, description });
    };

    const handleCreate = () => {
        addTodo({
            id: randomUUID(),
            title: todo.title,
            description: todo.description,
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Todo</Text>
            <TextInput
                onChangeText={handleInputTitle}
                style={styles.input}
                placeholder="title"
            />
            <TextInput
                onChangeText={handleInputDescription}
                style={styles.input}
                placeholder="Description"
            />
            <Button title="Create" onPress={handleCreate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '60%',
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        marginBottom: 20,
        fontWeight: '600',
        fontSize: 30,
    },
    input: {
        width: '100%',
        marginBottom: 20,
        padding: 4,
        borderColor: '#08f',
        borderWidth: 2,
        fontSize: 20,
    },
});
