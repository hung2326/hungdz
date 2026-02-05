
import { PRODUCTS } from '@/constants/mockData';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { OrderItem, useOrders } from '@/contexts/OrderContext';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CheckoutScreen() {
    const { productId } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { addOrder } = useOrders();
    const { user } = useAuth(); // Pre-fill data if needed

    const product = PRODUCTS.find((p) => p.id === productId);

    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [address, setAddress] = useState(user?.address || '');
    const [note, setNote] = useState('');

    if (!product) return null;

    const total = product.price; // Simplify: buy 1 item

    const handleConfirmOrder = () => {
        if (!name || !phone || !address) {
            Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin giao hàng');
            return;
        }

        Alert.alert(
            'Xác nhận đặt hàng',
            `Bạn có chắc chắn muốn đặt món ${product.name}?`,
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Đồng ý', onPress: processOrder }
            ]
        );
    };

    const processOrder = () => {
        const newOrder: OrderItem = {
            id: `ORD-${Date.now().toString().slice(-4)}`,
            items: [product],
            total: total,
            status: 'Delivering',
            date: new Date().toLocaleDateString('vi-VN'),
            address: address,
            customerName: name,
            customerPhone: phone
        };

        addOrder(newOrder);

        Alert.alert(
            'Thành công',
            'Đơn hàng đã được tạo thành công!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Navigate to My Orders tab
                        router.dismissAll();
                        router.replace('/(tabs)/orders');
                    }
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
        >
            <Stack.Screen options={{ title: 'Thanh toán' }} />
            <ScrollView contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + Spacing.xl }]}>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin đơn hàng</Text>
                    <View style={styles.productCard}>
                        <Text style={styles.productName}>{product.name} (x1)</Text>
                        <Text style={styles.productPrice}>{product.price.toLocaleString('vi-VN')} đ</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <Text style={styles.totalLabel}>Tổng cộng</Text>
                        <Text style={styles.totalValue}>{total.toLocaleString('vi-VN')} đ</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin giao hàng</Text>

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
                        <Text style={styles.label}>Địa chỉ giao hàng</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Nhập địa chỉ nhận hàng"
                            multiline
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Ghi chú (Tùy chọn)</Text>
                        <TextInput
                            style={styles.input}
                            value={note}
                            onChangeText={setNote}
                            placeholder="Ghi chú cho tài xế/nhà hàng"
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
                    <Text style={styles.buttonText}>Xác nhận đặt hàng</Text>
                </TouchableOpacity>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: Spacing.m,
        backgroundColor: Colors.lightGray,
    },
    section: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.m,
        padding: Spacing.m,
        marginBottom: Spacing.m,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: Spacing.m,
        color: Colors.text,
    },
    productCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.s,
    },
    productName: {
        fontSize: 16,
        color: Colors.text,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.m,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    inputGroup: {
        marginBottom: Spacing.m,
    },
    label: {
        marginBottom: Spacing.xs,
        color: Colors.textLight,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.s,
        padding: Spacing.m,
        backgroundColor: Colors.white,
        fontSize: 16,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: Colors.primary,
        padding: Spacing.l,
        borderRadius: BorderRadius.m,
        alignItems: 'center',
        marginTop: Spacing.s,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
