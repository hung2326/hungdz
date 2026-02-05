
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InvalidLoginScreen() {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1144/1144760.png' }} // Warning icon
                    style={styles.icon}
                />
                <Text style={styles.title}>TÊN ĐĂNG NHẬP KHÔNG HỢP LỆ</Text>
                <Text style={styles.message}>VUI LÒNG ĐĂNG NHẬP LẠI</Text>

                <TouchableOpacity style={styles.button} onPress={handleGoBack}>
                    <Text style={styles.buttonText}>THOÁT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.l,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    icon: {
        width: 80,
        height: 80,
        marginBottom: Spacing.l,
        tintColor: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginBottom: Spacing.s,
    },
    message: {
        fontSize: 16,
        color: Colors.text,
        textAlign: 'center',
        marginBottom: Spacing.xl,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingHorizontal: Spacing.xl,
        paddingVertical: Spacing.m,
        borderRadius: BorderRadius.m,
        minWidth: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
