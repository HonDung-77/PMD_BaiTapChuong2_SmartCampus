import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

const defaultCourseThumb: ImageSourcePropType = require("../assets/course-placeholder.png");
type ImageStatus = "loading" | "loaded" | "error";

interface CourseThumbnailProps {
  uri?: string | null;
  alt: string;
  isDecorative?: boolean;
}

function CourseThumbnail({ uri, alt, isDecorative = false }: CourseThumbnailProps) {
  const [status, setStatus] = useState<ImageStatus>(uri ? "loading" : "error");

  return (
    // ✅ BẮT BUỘC: Khung thumbWrap luôn bọc ngoài để giữ tỷ lệ 16/9 chuẩn
    <View style={styles.thumbWrap}>
      {!uri || status === "error" ? (
        <FallbackThumb />
      ) : (
        <>
          {status === "loading" && (
            <View style={styles.skeleton} pointerEvents="none">
              <ActivityIndicator />
            </View>
          )}
          <Image
            source={{ uri }}
            style={[styles.image, status !== "loaded" && styles.hidden]}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            accessible={!isDecorative}
            accessibilityRole={isDecorative ? undefined : "image"}
            accessibilityLabel={isDecorative ? undefined : alt}
            importantForAccessibility={isDecorative ? "no" : "auto"}
          />
        </>
      )}
    </View>
  );
}

function FallbackThumb() {
  return (
    <Image
      source={defaultCourseThumb}
      style={[styles.image, styles.fallback]}
      resizeMode="contain"
      accessible={false}
      importantForAccessibility="no"
    />
  );
}

interface CourseCardProps {
  title: string;
  instructor: string;
  credits: number;
  thumbnailUrl?: string | null;
  onViewDetail: () => void;
  onEnroll: () => void;
}

export default function CourseCard({
  title,
  instructor,
  credits,
  thumbnailUrl,
  onViewDetail,
  onEnroll,
}: CourseCardProps) {
  return (
    <View style={styles.card}>
      <CourseThumbnail
        uri={thumbnailUrl}
        alt={`Ảnh minh họa khóa học ${title}`}
      />

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.meta}>
          {instructor} · {credits} tín chỉ
        </Text>

        <View style={styles.actions}>
          <Pressable
            onPress={onViewDetail}
            style={({ pressed }) => [styles.buttonSecondary, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <Text>Xem chi tiết</Text>
          </Pressable>
          <Pressable
            onPress={onEnroll}
            style={({ pressed }) => [styles.buttonPrimary, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <Text style={styles.buttonPrimaryText}>Đăng ký</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%", // Giãn hết chiều rộng container
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e5e5",
  },
  thumbWrap: {
    width: "100%",
    aspectRatio: 16 / 9, // Giữ tỷ lệ khung hình cố định 16:9
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  hidden: {
    opacity: 0,
  },
  skeleton: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaeaea",
  },
  fallback: {
    padding: 16,
    opacity: 0.7,
  },
  body: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  meta: {
    fontSize: 13,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  buttonSecondary: {
    flex: 1,
    minHeight: 44, // Đạt chuẩn độ rộng vùng bấm (Touch target)
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimary: {
    flex: 1,
    minHeight: 44,
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.7, // Hiệu ứng chạm tay
  },
});