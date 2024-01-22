import { Slot } from 'expo-router';
import Navigation from '../components/navigation';

export default function Layout() {
    return (
        <>
            <Navigation />
            <Slot />
        </>
    );
}
