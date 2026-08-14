import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CourseCard from './components/CourseCard';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CourseCard
        title="Lập trình cho thiết bị di động"
        instructor="Phạm Thị Hồng Dung"
        credits={3}
        onViewDetail={() => console.log('view detail')}
        onEnroll={() => console.log('enroll')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});