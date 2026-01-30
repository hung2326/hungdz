
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { PRODUCTS } from '@/constants/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProductDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.container}>
                <Text>Không tìm thấy sản phẩm</Text>
            </View>
        );
    }

    const handleBuyNow = () => {
        router.push({
            pathname: '/checkout',
            params: { productId: product.id }
        });
    };

    return (
        <>
            <Stack.Screen options={{
                headerShown: true,
                title: 'Chi tiết sản phẩm',
                headerBackTitle: 'Trở về',
                headerTintColor: Colors.primary
            }} />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Image source={{ uri: product.image }} style={styles.image} />

                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.name}>{product.name}</Text>
                            <View style={styles.rating}>
                                <Ionicons name="star" size={18} color={Colors.warning} />
                                <Text style={styles.ratingText}>{product.rating}</Text>
                            </View>
                        </View>

                        <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>

                        <Text style={styles.sectionTitle}>Mô tả</Text>
                        <Text style={styles.description}>{product.description}</Text>
                    </View>
                </ScrollView>

                <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.m }]}>
                    <View style={styles.quantityContainer}>
                        <Text style={{ color: Colors.textLight }}>Số lượng: 1</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleBuyNow}>
                        <Text style={styles.buttonText}>Đặt Món Ngay - {product.price.toLocaleString('vi-VN')} đ</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        paddingBottom: 120, // Space for footer
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: Spacing.l,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Spacing.s,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        flex: 1,
        marginRight: Spacing.m,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.lightGray,
        paddingHorizontal: Spacing.s,
        paddingVertical: 4,
        borderRadius: BorderRadius.s,
    },
    ratingText: {
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: Spacing.l,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: Spacing.s,
        color: Colors.text,
    },
    description: {
        fontSize: 16,
        color: Colors.textLight,
        lineHeight: 24,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        padding: Spacing.m,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.m,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    quantityContainer: {
        // Placeholder for quantity selector
    },
    button: {
        flex: 1,
        backgroundColor: Colors.primary,
        padding: Spacing.m,
        borderRadius: BorderRadius.m,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
