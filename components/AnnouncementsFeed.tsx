import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ListRenderItem,
} from "react-native";

// 1. Model dữ liệu chuẩn (mục 2.8)
export interface Announcement {
  id: string;
  title: string;
  summary: string;
  category: "academic" | "event" | "service";
  publishedAt: string;
}

// Mock Data
const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Lịch đăng ký môn học Học kỳ 1 (2026-2027)",
    summary: "Sinh viên kiểm tra danh sách môn học mở và đăng ký đúng hạn trên portal trường.",
    category: "academic",
    publishedAt: "2026-08-10",
  },
  {
    id: "ann-2",
    title: "Thông báo bảo trì hệ thống Wi-Fi Campus",
    summary: "Hệ thống mạng nội bộ sẽ tạm ngưng từ 22:00 đến 02:00 sáng ngày mai.",
    category: "service",
    publishedAt: "2026-08-12",
  },
  {
    id: "ann-3",
    title: "Ngày hội Việc làm & Công nghệ NAVER Hackathon 2026",
    summary: "Cơ hội ứng tuyển các vị trí Thực tập sinh và Kỹ sư phần mềm dành cho sinh viên.",
    category: "event",
    publishedAt: "2026-08-14",
  },
];

// 2. Component Hàng (AnnouncementRow) với ngữ nghĩa Pressable & Text
interface RowProps {
  announcement: Announcement;
  onPress: (id: string) => void;
}

function AnnouncementRow({ announcement, onPress }: RowProps) {
  return (
    <Pressable
      onPress={() => onPress(announcement.id)}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      accessibilityRole="button"
      accessibilityHint="Xem chi tiết thông báo"
      accessibilityLabel={`${announcement.title}, danh mục ${announcement.category}`}
    >
      <View style={styles.rowBody}>
        <Text style={styles.category}>{announcement.category.toUpperCase()}</Text>
        <Text style={styles.title}>{announcement.title}</Text>
        <Text numberOfLines={2} style={styles.summary}>
          {announcement.summary}
        </Text>
      </View>
      <Text style={styles.date}>{announcement.publishedAt}</Text>
    </Pressable>
  );
}

// 3. Component Đường kẻ phân cách (ItemSeparatorComponent)
function ListDivider() {
  return <View style={styles.divider} />;
}

// 4. Component chính: FlatList Migration
export function AnnouncementsFeed() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);

  // Định kiểu Typed ListRenderItem
  const renderAnnouncement: ListRenderItem<Announcement> = ({ item }) => (
    <AnnouncementRow
      announcement={item}
      onPress={(id) => console.log("Mở thông báo:", id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncement}
        keyExtractor={(item) => item.id} // Stable key[cite: 1]
        ItemSeparatorComponent={ListDivider}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text accessibilityRole="header" style={styles.headerTitle}>
              Bảng tin SmartCampus
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Hiện chưa có thông báo nào mới.</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>-- Bạn đã xem hết thông báo --</Text>
          </View>
        }
        scrollEnabled={false} // Tắt cuộn riêng nếu đặt trong ScrollView chung của App.tsx
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e5e5",
  },
  header: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  row: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  rowPressed: {
    opacity: 0.6,
  },
  rowBody: {
    flex: 1,
    gap: 2,
  },
  category: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0056b3",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  summary: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    color: "#999",
  },
  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  emptyContainer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 14,
  },
  footer: {
    paddingTop: 16,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#aaa",
  },
});