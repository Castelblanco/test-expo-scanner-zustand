import { Button, Text, View } from 'react-native';
import { useTodos } from '../store/zustand/todos';

export default function ListTodo() {
    const { todos, removeTodo } = useTodos();

    const handleDelete = (id: string) => {
        removeTodo(id);
    };
    return (
        <View>
            {todos.map((todo) => (
                <View key={todo.id}>
                    <Text>{todo.title}</Text>
                    <Text>{todo.description}</Text>
                    <Button
                        title="Borrar"
                        color={'#f00'}
                        onPress={() => handleDelete(todo.id)}
                    />
                </View>
            ))}
        </View>
    );
}
