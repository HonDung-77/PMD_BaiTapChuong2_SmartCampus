import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import CourseCard from './components/CourseCard';
import { CustomButton, IconButton } from './components/CustomButton';
import { AnnouncementsFeed } from './components/AnnouncementsFeed';
import { SectionedAnnouncements } from './components/SectionedAnnouncements';

export default function App() {
  const [loading, setLoading] = useState(false);

  const handlePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Giả lập bấm nút loading trong 2 giây
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      {/* EXERCISE 3: CourseCard
      <CourseCard
        title="Lập trình cho thiết bị di động"
        instructor="Phạm Thị Hồng Dung"
        credits={3}
        onViewDetail={() => console.log('view detail')}
        onEnroll={() => console.log('enroll')}
      /> */}

      {/* EXERCISE 4: Press-State System */}
      {/* 1. Nút bình thường / Đang nhấn */}
      {/* <CustomButton label="Primary Button" onPress={handlePress} /> */}

      {/* 2. Trạng thái Loading */}
      {/* <CustomButton label="Primary Loading" onPress={() => { }} loading={loading} /> */}

      {/* 3. Trạng thái Disabled (Vô hiệu hóa) */}
      {/* <CustomButton label="Primary Disabled" onPress={() => { }} disabled /> */}

      {/* 4. Secondary Button */}
      {/* <CustomButton label="Secondary Button" variant="secondary" onPress={() => { }} /> */}

      {/* 5. Icon Buttons */}
      {/* <View style={styles.row}>
        <IconButton icon="🔍" onPress={() => { }} accessibilityLabel="Tìm kiếm" />
        <IconButton icon="⚙️" onPress={() => { }} accessibilityLabel="Cài đặt" disabled />
      </View> */}
      {/* EXERCISE 5: FlatList Migration */}
      {/* <AnnouncementsFeed /> */}
      {/* EXERCISE 6 */}
      <SectionedAnnouncements />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
    color: '#1a1a1a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
});