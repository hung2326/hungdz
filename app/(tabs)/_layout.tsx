
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';

import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: Colors.white, // Add background color for iOS transparent issue
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="receipt" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />
      {/* Hide explore if we don't need it, or delete the file later. For now we just don't add a screen entry or hide it */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null, // Hide from tab bar
        }}
      />
    </Tabs>
  );
}
