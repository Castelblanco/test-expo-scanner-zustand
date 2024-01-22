import { Link } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Navigation() {
    return (
        <View style={styles.container}>
            <Link href={'/create-todo'} asChild>
                <Button title="Create Todo" />
            </Link>
            <Link href={'/list-todo'} asChild>
                <Button title="List Todo" />
            </Link>
            <Link href={'/'} asChild>
                <Button title="QR Scanner" />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 50,
    },
});
