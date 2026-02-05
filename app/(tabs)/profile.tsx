
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace('/(auth)/login');
    };

    const menuItems = [
        { icon: 'help-circle-outline', title: 'Trung tâm hỗ trợ', onPress: () => alert('Tính năng đang phát triển') },
        { icon: 'create-outline', title: 'Chỉnh sửa hồ sơ', onPress: () => router.push('/profile-edit') },
        { icon: 'document-text-outline', title: 'Điều khoản sử dụng', onPress: () => { } },
        { icon: 'log-out-outline', title: 'Đăng xuất', color: Colors.error, onPress: handleLogout },
    ];

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <Image source={{ uri: user?.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.phone}>{user?.phone}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Ionicons name="location-outline" size={24} color={Colors.primary} />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.infoLabel}>Địa chỉ mặc định</Text>
                        <Text style={styles.infoValue}>{user?.address}</Text>
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.menu}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                        <Ionicons name={item.icon as any} size={24} color={item.color || Colors.text} />
                        <Text style={[styles.menuTitle, { color: item.color || Colors.text }]}>{item.title}</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    header: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        padding: Spacing.xl,
        marginBottom: Spacing.m,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.m,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.xs,
    },
    phone: {
        fontSize: 16,
        color: Colors.textLight,
    },
    infoSection: {
        backgroundColor: Colors.white,
        padding: Spacing.m,
        marginBottom: Spacing.m,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTextContainer: {
        marginLeft: Spacing.m,
        flex: 1,
    },
    infoLabel: {
        fontSize: 12,
        color: Colors.textLight,
    },
    infoValue: {
        fontSize: 14,
        color: Colors.text,
        fontWeight: '500',
    },
    menu: {
        backgroundColor: Colors.white,
        paddingVertical: Spacing.s,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    menuTitle: {
        flex: 1,
        fontSize: 16,
        marginLeft: Spacing.m,
    },
});
