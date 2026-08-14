import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface AnnouncementProps {
  title: string;
  category: string;
  date: string;
  isRead?: boolean;
  onPress: () => void;
}

export function AccessibleAnnouncementCard({
  title,
  category,
  date,
  isRead = false,
  onPress,
}: AnnouncementProps) {
  return (
    <Pressable
      onPress={onPress}
      // 1. Accessibility Role & Label chuẩn
      accessibilityRole="button"
      accessibilityLabel={`Thông báo: ${title}. Danh mục: ${category}. Ngày đăng: ${date}`}
      accessibilityHint="Nhấn hai lần để mở xem chi tiết thông báo"
      // 2. Accessibility State chính xác
      accessibilityState={{ selected: isRead }}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        isRead && styles.readCard,
      ]}
    >
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.category}>
          {category.toUpperCase()}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    // 3. Touch target tối thiểu & Padding co giãn
    minHeight: 48,
    padding: 14,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  readCard: {
    backgroundColor: '#f9f9f9',
  },
  content: {
    gap: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    // 4. Đảm bảo Contrast Ratio > 4.5:1
    color: '#004085',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  date: {
    fontSize: 12,
    color: '#555555',
  },
});