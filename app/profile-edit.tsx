
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditProfileScreen() {
    const router = useRouter();
    const { user, updateProfile } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');

    const handleSave = () => {
        if (!name || !phone || !address) {
            Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
            return;
        }

        updateProfile({
            name,
            phone,
            address,
            avatar,
        });

        Alert.alert('Thành công', 'Đã cập nhật hồ sơ!', [
            { text: 'OK', onPress: () => router.back() }
        ]);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Lưu</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.avatarSection}>
                    <Image source={{ uri: avatar || 'https://via.placeholder.com/150' }} style={styles.avatar} />
                    <View style={styles.avatarInputContainer}>
                        <Text style={styles.label}>Avatar URL</Text>
                        <TextInput
                            style={styles.input}
                            value={avatar}
                            onChangeText={setAvatar}
                            placeholder="Link ảnh đại diện"
                        />
                    </View>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Họ và tên</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Nhập họ tên"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            placeholder="Nhập số điện thoại"
                            keyboardType="phone-pad"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Nhập địa chỉ giao hàng"
                            multiline
                        />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        marginTop: 10, // Basic safe area
    },
    backButton: {
        padding: Spacing.s,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    saveButton: {
        padding: Spacing.s,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    content: {
        padding: Spacing.l,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: BorderRadius.full,
        marginBottom: Spacing.m,
        backgroundColor: Colors.lightGray,
    },
    avatarInputContainer: {
        width: '100%',
    },
    form: {
        gap: Spacing.m,
    },
    inputGroup: {
        gap: Spacing.xs,
    },
    label: {
        fontSize: 14,
        color: Colors.textLight,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.m,
        padding: Spacing.m,
        fontSize: 16,
        color: Colors.text,
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
});
