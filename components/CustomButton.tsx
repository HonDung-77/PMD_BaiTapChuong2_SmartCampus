import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
}

export function CustomButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,

        isDisabled
          ? isPrimary
            ? styles.primaryDisabled
            : styles.secondaryDisabled
          : pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : "#1a1a1a"} />
      ) : (
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
            isDisabled && styles.disabledText,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

interface IconButtonProps {
  icon: string;
  onPress: () => void;
  accessibilityLabel: string;
  disabled?: boolean;
}

export function IconButton({
  icon,
  onPress,
  accessibilityLabel,
  disabled = false,
}: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.iconButton,
        disabled ? styles.iconDisabled : pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.iconText, disabled && styles.disabledText]}>
        {icon}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  primaryButton: {
    backgroundColor: "#1a1a1a",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#1a1a1a",
  },
  pressed: {
    opacity: 0.6,
  },
  primaryDisabled: {
    backgroundColor: "#e0e0e0",
  },
  secondaryDisabled: {
    borderColor: "#cccccc",
    backgroundColor: "#f9f9f9",
  },
  disabledText: {
    color: "#a1a1a1",
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  iconDisabled: {
    backgroundColor: "#e8e8e8",
    opacity: 0.5,
  },
  iconText: {
    fontSize: 20,
  },
});