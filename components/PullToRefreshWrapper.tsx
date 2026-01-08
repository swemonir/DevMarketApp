import React from 'react';
import { RefreshControl, ScrollView, ScrollViewProps } from 'react-native';

interface PullToRefreshWrapperProps extends ScrollViewProps {
  children: React.ReactNode;
  onRefresh: () => void | Promise<void>;
  refreshing: boolean;
  backgroundColor?: string;
  indicatorColor?: string;
}

export default function PullToRefreshWrapper({
  children,
  onRefresh,
  refreshing,
  backgroundColor = '#020617',
  indicatorColor = '#3b82f6',
  style,
  ...props
}: PullToRefreshWrapperProps) {
  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={indicatorColor}
          colors={[indicatorColor]}
          progressBackgroundColor={backgroundColor}
        />
      }
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
