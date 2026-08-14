import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

// 1. Định kiểu dữ liệu Form
interface FormValues {
  fullName: string;
  studentId: string;
  email: string;
  program: string;
  summary: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type TouchedFields = Partial<Record<keyof FormValues, boolean>>;

const INITIAL_VALUES: FormValues = {
  fullName: '',
  studentId: '',
  email: '',
  program: '',
  summary: '',
};

// 2. Hàm kiểm tra Validation với thông điệp hướng dẫn hành động cụ thể
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  // Tên: Không được để trống hoặc chỉ chứa khoảng trắng
  if (!values.fullName.trim()) {
    errors.fullName = 'Enter your full name.';
  }

  // Mã SV: Bắt buộc đúng định dạng SC-YYYY-NNNN
  if (!/^SC-\d{4}-\d{4}$/.test(values.studentId.trim())) {
    errors.studentId = 'Use the format SC-YYYY-NNNN.';
  }

  // Email: Phải đúng định dạng email
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  // Ngành học: Không để trống
  if (!values.program.trim()) {
    errors.program = 'Enter your academic program.';
  }

  // Tóm tắt Bio: Giới hạn tối đa 240 ký tự
  if (values.summary.length > 240) {
    errors.summary = 'Keep the profile summary to 240 characters.';
  }

  return errors;
}

export function ValidatedForm() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<TouchedFields>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);

  const updateField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  // Chỉ hiển thị lỗi khi field đã bị Blur (touched) hoặc sau khi bấm Submit
  const getFieldError = (field: keyof FormValues) => {
    return submitted || touched[field] ? errors[field] : undefined;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (Object.keys(errors).length === 0) {
      console.log('Submit thành công:', values);
      alert('Đăng ký thành công!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise 9: Validated Registration Form</Text>

      {/* Field 1: Full Name */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={[styles.input, getFieldError('fullName') && styles.inputError]}
          value={values.fullName}
          onChangeText={(v) => updateField('fullName', v)}
          onBlur={() => handleBlur('fullName')}
          placeholder="e.g. Pham Thi Hong Dung"
        />
        {getFieldError('fullName') && (
          <Text style={styles.errorText}>{getFieldError('fullName')}</Text>
        )}
      </View>

      {/* Field 2: Student ID */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Student ID *</Text>
        <TextInput
          style={[styles.input, getFieldError('studentId') && styles.inputError]}
          value={values.studentId}
          onChangeText={(v) => updateField('studentId', v.toUpperCase())}
          onBlur={() => handleBlur('studentId')}
          placeholder="SC-YYYY-NNNN"
          autoCapitalize="characters"
        />
        {getFieldError('studentId') && (
          <Text style={styles.errorText}>{getFieldError('studentId')}</Text>
        )}
      </View>

      {/* Field 3: Email */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={[styles.input, getFieldError('email') && styles.inputError]}
          value={values.email}
          onChangeText={(v) => updateField('email', v)}
          onBlur={() => handleBlur('email')}
          placeholder="name@domain.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {getFieldError('email') && (
          <Text style={styles.errorText}>{getFieldError('email')}</Text>
        )}
      </View>

      {/* Field 4: Program */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Academic Program *</Text>
        <TextInput
          style={[styles.input, getFieldError('program') && styles.inputError]}
          value={values.program}
          onChangeText={(v) => updateField('program', v)}
          onBlur={() => handleBlur('program')}
          placeholder="Software Engineering"
        />
        {getFieldError('program') && (
          <Text style={styles.errorText}>{getFieldError('program')}</Text>
        )}
      </View>

      {/* Field 5: Summary */}
      <View style={styles.fieldGroup}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Profile Summary</Text>
          <Text style={[styles.counter, values.summary.length > 240 && styles.counterError]}>
            {values.summary.length}/240
          </Text>
        </View>
        <TextInput
          style={[styles.input, styles.multiline, getFieldError('summary') && styles.inputError]}
          value={values.summary}
          onChangeText={(v) => updateField('summary', v)}
          onBlur={() => handleBlur('summary')}
          placeholder="Write a brief summary..."
          multiline
        />
        {getFieldError('summary') && (
          <Text style={styles.errorText}>{getFieldError('summary')}</Text>
        )}
      </View>

      {/* Submit Button */}
      <Pressable
        style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Submit Registration</Text>
      </Pressable>
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
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  fieldGroup: {
    gap: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  counter: {
    fontSize: 12,
    color: '#666',
  },
  counterError: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  multiline: {
    minHeight: 70,
    paddingTop: 8,
  },
  inputError: {
    borderColor: '#d9534f',
    backgroundColor: '#fff8f8',
  },
  errorText: {
    fontSize: 12,
    color: '#d9534f',
    fontWeight: '500',
  },
  submitBtn: {
    minHeight: 48,
    backgroundColor: '#1a1a1a',
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