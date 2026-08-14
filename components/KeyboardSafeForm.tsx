import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
} from 'react-native';

export function KeyboardSafeForm() {
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  // Tạo các ref để điều hướng con trỏ tự động (Focus Flow - Mục 2.15)[cite: 1]
  const studentIdRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);

  return (
    // 1. KeyboardAvoidingView bọc ngoài cùng điều chỉnh padding/height theo OS[cite: 1]
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.avoidingContainer}
    >
      {/* 2. ScrollView giúp cuộn các field bị che khuất[cite: 1] */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled" // Cho phép bấm nút khi bàn phím đang mở[cite: 1]
        keyboardDismissMode="on-drag" // Vuốt để ẩn bàn phím[cite: 1]
      >
        <Text style={styles.formTitle}>Đăng ký Thông tin Sinh viên</Text>

        {/* Trường 1: Họ tên */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nhập họ tên"
            returnKeyType="next"
            onSubmitEditing={() => studentIdRef.current?.focus()} // Chuyển sang ô Mã SV[cite: 1]
          />
        </View>

        {/* Trường 2: Mã sinh viên */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Mã sinh viên</Text>
          <TextInput
            ref={studentIdRef}
            style={styles.input}
            value={studentId}
            onChangeText={setStudentId}
            placeholder="Ví dụ: SC-2026-0001"
            autoCapitalize="characters"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
          />
        </View>

        {/* Trường 3: Email */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email trường</Text>
          <TextInput
            ref={emailRef}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="student@iuh.edu.vn"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => bioRef.current?.focus()}
          />
        </View>

        {/* Trường 4: Ghi chú / Bio (Trường nằm dưới cùng hay bị che nhất) */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Giới thiệu bản thân (Bio)</Text>
          <TextInput
            ref={bioRef}
            style={[styles.input, styles.multilineInput]}
            value={bio}
            onChangeText={setBio}
            placeholder="Nhập vài dòng giới thiệu..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Nút Submit */}
        <Pressable
          style={({ pressed }) => [styles.submitButton, pressed && styles.pressed]}
          onPress={() => console.log('Submit:', { fullName, studentId, email, bio })}
        >
          <Text style={styles.submitText}>Hoàn tất đăng ký</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  avoidingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  fieldGroup: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  multilineInput: {
    minHeight: 80,
    paddingTop: 10,
  },
  submitButton: {
    minHeight: 48,
    backgroundColor: '#0056b3',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.7,
  },
});