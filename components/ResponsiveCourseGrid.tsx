import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CourseCard from './CourseCard';

const COURSES = [
  {
    id: 'c1',
    title: 'Lập trình cho thiết bị di động',
    instructor: 'Phạm Thị Hồng Dung',
    credits: 3,
  },
  {
    id: 'c2',
    title: 'Cấu trúc dữ liệu và giải thuật',
    instructor: 'Nguyễn Văn A',
    credits: 4,
  },
  {
    id: 'c3',
    title: 'Thiết kế giao diện UX/UI',
    instructor: 'Phan Thị Bảo Trân',
    credits: 3,
  },
];

export function ResponsiveCourseGrid() {
  return (
    <View style={styles.gridContainer}>
      {COURSES.map((course) => (
        <View key={course.id} style={styles.cardWrapper}>
          <CourseCard
            title={course.title}
            instructor={course.instructor}
            credits={course.credits}
            onViewDetail={() => console.log('View:', course.id)}
            onEnroll={() => console.log('Enroll:', course.id)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardWrapper: {
    flexGrow: 1,
    flexBasis: 260,
    minWidth: 240,
    maxWidth: 420,
  },
});