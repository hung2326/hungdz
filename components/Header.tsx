
import React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Header = () => {
    const { user } = useAuth();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top + Spacing.s }]}>
            <View style={styles.topRow}>
                <View style={styles.userInfo}>
                    <Image
                        source={{ uri: user?.avatar }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.greeting}>Xin chào,</Text>
                        <Text style={styles.username}>{user?.name}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={24} color={Colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={Colors.textLight} style={styles.searchIcon} />
                <TextInput
                    placeholder="Bạn muốn ăn gì hôm nay?"
                    style={styles.searchInput}
                    placeholderTextColor={Colors.textLight}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingHorizontal: Spacing.m,
        paddingBottom: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.m,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
    },
    greeting: {
        fontSize: 12,
        color: Colors.textLight,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    iconButton: {
        padding: Spacing.xs,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: BorderRadius.m,
        paddingHorizontal: Spacing.m,
        height: 44,
    },
    searchIcon: {
        marginRight: Spacing.s,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        color: Colors.text,
    },
});
