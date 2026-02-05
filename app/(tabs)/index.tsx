
import { FoodCard } from '@/components/FoodCard';
import { Header } from '@/components/Header';
import { BANNERS, PRODUCTS } from '@/constants/mockData';
import { BorderRadius, Colors, Spacing } from '@/constants/theme';
import React from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);

  // Render Banner Item
  const renderBanner = ({ item }: { item: string }) => (
    <Image source={{ uri: item }} style={styles.bannerImage} />
  );

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Banner Carousel - Simple Horizontal ScrollView for standard react-native */}
        <View style={styles.section}>
          <FlatList
            data={BANNERS}
            renderItem={renderBanner}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            contentContainerStyle={styles.bannerContainer}
          />
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Món Ngon Bán Chạy 🔥</Text>
          <FlatList
            data={bestSellers}
            renderItem={({ item }) => <View style={{ width: 300, paddingRight: Spacing.m }}><FoodCard item={item} layout="horizontal" /></View>}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* All Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thực Đơn Hôm Nay 🍜</Text>
          <View style={styles.list}>
            {PRODUCTS.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <FoodCard item={item} layout="horizontal" />
              </View>
            ))}
          </View>
        </View>

        {/* Bottom spacer for tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  section: {
    marginTop: Spacing.l,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: Spacing.m,
    marginBottom: Spacing.m,
  },
  bannerContainer: {
    paddingHorizontal: Spacing.m,
    gap: Spacing.m,
  },
  bannerImage: {
    width: 320,
    height: 160,
    borderRadius: BorderRadius.l,
    marginRight: Spacing.m,
  },
  listContent: {
    paddingHorizontal: Spacing.m,
  },
  list: {
    paddingHorizontal: Spacing.m,
    gap: Spacing.m,
  },
  listItem: {
    width: '100%',
  },
});
