import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';
import AsynStorage from '@react-native-async-storage/async-storage';

const storage: PersistStorage<TTodoStore> = {
    getItem: async (name: string): Promise<StorageValue<TTodoStore> | null> => {
        const data = await AsynStorage.getItem(name);
        return data ? JSON.parse(data) : null;
    },
    setItem: async (
        name: string,
        value: StorageValue<TTodoStore>
    ): Promise<void> => {
        await AsynStorage.setItem(name, JSON.stringify(value));
    },
    removeItem: async (name: string): Promise<void> => {
        await AsynStorage.removeItem(name);
    },
};

export type TTodo = {
    id: string;
    title: string;
    description: string;
};

type TTodoStore = {
    todos: TTodo[];
    addTodo: (todo: TTodo) => void;
    removeTodo: (id: string) => void;
};

export const useTodos = create(
    persist<TTodoStore>(
        (set, get) => ({
            todos: [],
            addTodo(todo) {
                const { todos } = get();
                todos.push(todo);
                set({ todos });
            },
            removeTodo(id) {
                const { todos } = get();
                const newTodos = todos.filter((todo) => todo.id !== id);

                set({ todos: newTodos });
            },
        }),
        {
            name: 'todos_persist',
            storage,
        }
    )
);
