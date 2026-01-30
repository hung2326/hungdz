
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login, isLoading } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        // Valid login simulation (accept any non-empty input for now as per req "validation basic")
        login();
        // Router logic will be handled by Context -> _layout auth guard usually, 
        // but for immediate feedback we can redirect after login logic if needed or let the root layout handle it.
        // Here we assume root layout listens to user state.
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7541/7541793.png' }}
                    style={styles.logo}
                />
                <Text style={styles.appName}>Food App</Text>
            </View>

            <View style={styles.form}>
                <Text style={styles.title}>Đăng Nhập</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email / Số điện thoại</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email hoặc SĐT"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Mật khẩu</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập mật khẩu"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    <Text style={styles.buttonText}>{isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Chưa có tài khoản?</Text>
                    <Link href="/(auth)/register" asChild>
                        <TouchableOpacity>
                            <Text style={styles.link}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        padding: Spacing.l,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: Spacing.s,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    form: {
        width: '100%',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: Spacing.l,
        color: Colors.text,
    },
    inputGroup: {
        marginBottom: Spacing.m,
    },
    label: {
        fontSize: 14,
        color: Colors.textLight,
        marginBottom: Spacing.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.m,
        padding: Spacing.m,
        fontSize: 16,
        color: Colors.text,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: Spacing.m,
        borderRadius: BorderRadius.m,
        alignItems: 'center',
        marginTop: Spacing.m,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: Spacing.l,
        gap: Spacing.xs,
    },
    footerText: {
        color: Colors.textLight,
    },
    link: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
