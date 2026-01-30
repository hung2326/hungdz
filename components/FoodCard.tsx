
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface FoodCardProps {
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        rating: number;
    };
    layout?: 'vertical' | 'horizontal';
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, layout = 'vertical' }) => {
    const router = useRouter();

    const handlePress = () => {
        router.push(`/product/${item.id}` as any);
    };

    if (layout === 'horizontal') {
        return (
            <TouchableOpacity style={styles.cardHorizontal} onPress={handlePress}>
                <Image source={{ uri: item.image }} style={styles.imageHorizontal} />
                <View style={styles.contentHorizontal}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
                        <View style={styles.rating}>
                            <Ionicons name="star" size={14} color={Colors.warning} />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.cardVertical} onPress={handlePress}>
            <Image source={{ uri: item.image }} style={styles.imageVertical} />
            <View style={styles.contentVertical}>
                <View style={styles.row}>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={14} color={Colors.warning} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                </View>

                <Text style={styles.price}>{item.price.toLocaleString('vi-VN')} đ</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Horizontal Layout
    cardHorizontal: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.m,
        marginBottom: Spacing.s,
        padding: Spacing.s,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imageHorizontal: {
        width: 80,
        height: 80,
        borderRadius: BorderRadius.s,
        marginRight: Spacing.m,
    },
    contentHorizontal: {
        flex: 1,
        justifyContent: 'space-between',
    },

    // Vertical Layout (Grid)
    cardVertical: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.m,
        marginBottom: Spacing.m,
        marginHorizontal: Spacing.xs,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        overflow: 'hidden',
        maxWidth: '48%', // For 2 column grid
    },
    imageVertical: {
        width: '100%',
        height: 120,
    },
    contentVertical: {
        padding: Spacing.s,
    },

    // Common Objects
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
        flex: 1,
    },
    description: {
        fontSize: 12,
        color: Colors.textLight,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Spacing.xs,
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    ratingText: {
        fontSize: 12,
        color: Colors.text,
    },
});
