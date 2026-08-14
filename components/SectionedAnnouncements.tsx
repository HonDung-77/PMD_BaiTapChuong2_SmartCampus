import React from 'react';
import {
  View,
  Text,
  SectionList,
  Pressable,
  StyleSheet,
  SectionListRenderItem,
} from 'react-native';
import { Announcement } from './AnnouncementsFeed';

interface AnnouncementSection {
  title: string;
  data: Announcement[];
}

const SECTION_DATA: AnnouncementSection[] = [
  {
    title: 'Today',
    data: [
      {
        id: 'sec-1',
        title: 'Hội thảo AI-Driven Transformation tại Campus F-Town3',
        summary: 'Đăng ký tham gia buổi kiến tập và seminar công nghệ hàng đầu.',
        category: 'event',
        publishedAt: '09:30',
      },
    ],
  },
  {
    title: 'This Week',
    data: [
      {
        id: 'sec-2',
        title: 'Lịch bảo trì máy chủ LMS',
        summary: 'Hệ thống LMS sẽ nâng cấp trong khoảng từ 00:00 đến 03:00.',
        category: 'service',
        publishedAt: 'Thứ 3',
      },
      {
        id: 'sec-3',
        title: 'Cập nhật phòng học đồ án UX Design',
        summary: 'Lớp Tương tác Người Máy chuyển sang phòng A4.02.',
        category: 'academic',
        publishedAt: 'Thứ 2',
      },
    ],
  },
  {
    title: 'Earlier',
    data: [
      {
        id: 'sec-4',
        title: 'Thông báo nộp học phí bổ sung',
        summary: 'Hạn cuối hoàn thành nghĩa vụ học phí đến hết tuần này.',
        category: 'academic',
        publishedAt: '01/08',
      },
    ],
  },
];

export function SectionedAnnouncements() {
  // Render Item chuẩn kiểu TypeScript
  const renderItem: SectionListRenderItem<Announcement> = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${item.category}`}
    >
      <View style={styles.rowBody}>
        <Text style={styles.category}>{item.category.toUpperCase()}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.summary}>{item.summary}</Text>
      </View>
      <Text style={styles.date}>{item.publishedAt}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={SECTION_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text accessibilityRole="header" style={styles.sectionHeader}>
            {title}
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        stickySectionHeadersEnabled={true} // Bật sticky header để kiểm thử[cite: 1]
        scrollEnabled={false} // Tắt scroll riêng để lồng vừa trong App.tsx
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0056b3',
    backgroundColor: '#f8f9fa',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 4,
  },
  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },
  pressed: {
    opacity: 0.6,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  category: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6c757d',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  summary: {
    fontSize: 12,
    color: '#666',
  },
  date: {
    fontSize: 11,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});