
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import { OrderItem, useOrders } from '@/contexts/OrderContext';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OrdersScreen() {
    const { orders, cancelOrder, updateOrderStatus } = useOrders();
    const [activeTab, setActiveTab] = useState<'Delivering' | 'Delibered'>('Delivering');
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const insets = useSafeAreaInsets();

    // Filter logic: 'Delivering' shows 'Delivering' status. 'Delivered' shows 'Delivered' and 'Cancelled' for history.
    // Or strictly 'Delivering' vs 'Delivered' + 'Cancelled'.
    // Req says: "Chia 2 Tab: Đang giao và Đã nhận"
    const filteredOrders = orders.filter(
        order => activeTab === 'Delivering'
            ? order.status === 'Delivering'
            : (order.status === 'Delivered' || order.status === 'Cancelled')
    );

    const handleCancel = (id: string) => {
        Alert.alert(
            'Huỷ đơn hàng',
            'Bạn có chắc chắn muốn huỷ đơn hàng này?',
            [
                { text: 'Không', style: 'cancel' },
                { text: 'Đồng ý', style: 'destructive', onPress: () => cancelOrder(id) }
            ]
        )
    };

    const handleReceive = (id: string) => {
        Alert.alert(
            'Đã nhận hàng',
            'Xác nhận bạn đã nhận được món ăn?',
            [
                { text: 'Chưa', style: 'cancel' },
                {
                    text: 'Đúng vậy',
                    onPress: () => {
                        updateOrderStatus(id, 'Delivered');
                        setSelectedOrder(id);
                        setRatingModalVisible(true);
                    }
                }
            ]
        )
    };

    const submitRating = () => {
        // API call to submit rating would go here
        setRatingModalVisible(false);
        setComment('');
        setRating(5);
        Alert.alert('Cảm ơn', 'Đánh giá của bạn đã được ghi nhận!');
    }

    const renderItem = ({ item }: { item: OrderItem }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <Text style={[
                    styles.status,
                    { color: item.status === 'Delivering' ? Colors.primary : (item.status === 'Cancelled' ? Colors.error : Colors.success) }
                ]}>
                    {item.status === 'Delivering' ? 'Đang giao' : (item.status === 'Cancelled' ? 'Đã huỷ' : 'Đã giao')}
                </Text>
            </View>

            <View style={styles.orderBody}>
                <Text style={styles.orderInfo}>Ngày đặt: {item.date}</Text>
                <Text style={styles.orderInfo}>Người nhận: {item.customerName} - {item.customerPhone}</Text>
                <Text style={styles.orderInfo}>Địa chỉ: {item.address}</Text>
                <Text style={styles.orderInfo} numberOfLines={1}>
                    Món: {item.items.map(i => i.name).join(', ')}
                </Text>
                <Text style={styles.totalPrice}>Tổng tiền: {item.total.toLocaleString('vi-VN')} đ</Text>
            </View>

            {item.status === 'Delivering' && (
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item.id)}>
                        <Text style={styles.cancelButtonText}>Huỷ đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.receiveButton} onPress={() => handleReceive(item.id)}>
                        <Text style={styles.receiveButtonText}>Đã nhận hàng</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.headerTitle}>Đơn hàng của tôi</Text>

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Delivering' && styles.activeTab]}
                    onPress={() => setActiveTab('Delivering')}
                >
                    <Text style={[styles.tabText, activeTab === 'Delivering' && styles.activeTabText]}>Đang giao</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Delibered' && styles.activeTab]}
                    onPress={() => setActiveTab('Delibered')}
                >
                    <Text style={[styles.tabText, activeTab === 'Delibered' && styles.activeTabText]}>Lịch sử</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredOrders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="receipt-outline" size={64} color={Colors.border} />
                        <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
                    </View>
                }
            />

            {/* Rating Modal */}
            <Modal visible={ratingModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Đánh giá đơn hàng</Text>

                        <View style={styles.stars}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                                    <Ionicons
                                        name={star <= rating ? "star" : "star-outline"}
                                        size={32}
                                        color={Colors.warning}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TextInput
                            style={styles.commentInput}
                            placeholder="Nhập nhận xét của bạn..."
                            multiline
                            value={comment}
                            onChangeText={setComment}
                        />

                        <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
                            <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: Spacing.m,
        textAlign: 'center',
        color: Colors.text,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        padding: Spacing.s,
        marginBottom: Spacing.m,
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.s,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: Colors.primary,
    },
    tabText: {
        color: Colors.textLight,
        fontWeight: '600',
    },
    activeTabText: {
        color: Colors.primary,
    },
    listContent: {
        padding: Spacing.m,
    },
    orderCard: {
        backgroundColor: Colors.white,
        padding: Spacing.m,
        borderRadius: BorderRadius.m,
        marginBottom: Spacing.m,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Spacing.s,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray,
        paddingBottom: Spacing.s,
    },
    orderId: {
        fontWeight: 'bold',
        color: Colors.text,
    },
    status: {
        fontWeight: 'bold',
    },
    orderBody: {
        marginBottom: Spacing.m,
    },
    orderInfo: {
        color: Colors.textLight,
        marginBottom: 4,
        fontSize: 14,
    },
    totalPrice: {
        fontWeight: 'bold',
        color: Colors.primary,
        marginTop: Spacing.s,
        fontSize: 16,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: Spacing.m,
    },
    cancelButton: {
        paddingVertical: Spacing.s,
        paddingHorizontal: Spacing.m,
        borderWidth: 1,
        borderColor: Colors.error,
        borderRadius: BorderRadius.s,
    },
    cancelButtonText: {
        color: Colors.error,
        fontWeight: 'bold',
    },
    receiveButton: {
        paddingVertical: Spacing.s,
        paddingHorizontal: Spacing.m,
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.s,
    },
    receiveButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
    emptyText: {
        marginTop: Spacing.m,
        color: Colors.textLight,
        fontSize: 16,
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: Spacing.l,
    },
    modalContent: {
        backgroundColor: Colors.white,
        padding: Spacing.l,
        borderRadius: BorderRadius.l,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: Spacing.m,
    },
    stars: {
        flexDirection: 'row',
        gap: Spacing.s,
        marginBottom: Spacing.m,
    },
    commentInput: {
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: BorderRadius.m,
        padding: Spacing.s,
        textAlignVertical: 'top',
        marginBottom: Spacing.m,
    },
    submitButton: {
        width: '100%',
        backgroundColor: Colors.primary,
        padding: Spacing.m,
        borderRadius: BorderRadius.m,
        alignItems: 'center',
    },
    submitButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
});
