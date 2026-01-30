
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterScreen() {
    const router = useRouter();
    const { register, isLoading } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
            return;
        }

        // Simulate register
        register();
        Alert.alert('Thành công', 'Đăng ký thành công! Vui lòng đăng nhập.', [
            { text: 'OK', onPress: () => router.replace('/(auth)/login') }
        ]);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.logoContainer}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7541/7541793.png' }}
                        style={styles.logo}
                    />
                    <Text style={styles.appName}>Food App</Text>
                </View>

                <View style={styles.form}>
                    <Text style={styles.title}>Đăng Ký Tài Khoản</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập họ tên của bạn"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

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

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Xác nhận mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleRegister}
                        disabled={isLoading}
                    >
                        <Text style={styles.buttonText}>{isLoading ? 'Đang xử lý...' : 'ĐĂNG KÝ'}</Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Đã có tài khoản?</Text>
                        <Link href="/(auth)/login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.link}>Đăng nhập ngay</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: Spacing.l,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
        marginTop: Spacing.xl,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: Spacing.s,
    },
    appName: {
        fontSize: 20,
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
        marginBottom: Spacing.xl,
    },
    footerText: {
        color: Colors.textLight,
    },
    link: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
