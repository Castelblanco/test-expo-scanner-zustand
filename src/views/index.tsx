import { BarCodeScanningResult, Camera, PermissionStatus } from 'expo-camera';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const STATUS_CAMERA = PermissionStatus;

export default function Page() {
    const [hasPermission, setHasPermission] = useState<boolean>(false);
    const [scanned, setScanned] = useState(true);
    const [qr, setQr] = useState('');
    const cameraRef = useRef<LegacyRef<Camera>>();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === STATUS_CAMERA.GRANTED);
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: BarCodeScanningResult) => {
        setScanned(true);
        console.log({ type });
        setQr(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    if (scanned)
        return (
            <View style={styles.container}>
                <Text
                    style={{
                        color: '#fff',
                    }}
                >
                    {qr}
                </Text>
                <Button onPress={() => setScanned(false)} title="Scan QR" />
            </View>
        );

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                ref={cameraRef.current}
                onBarCodeScanned={handleBarCodeScanned}
            ></Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000a',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    camera: {
        alignItems: 'center',
        width: 300,
        height: 400,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});
