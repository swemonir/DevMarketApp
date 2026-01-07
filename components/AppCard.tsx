import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface App {
  id: string;
  title: string;
  description: string;
  category: string;
  platform: 'web' | 'mobile';
  imageUrl?: string;
  url?: string;
}

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to app details or open URL
    console.log('App pressed:', app.title);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: app.imageUrl || 'https://via.placeholder.com/150x150/64748b/ffffff?text=App' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{app.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {app.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.category}>
            <Text style={styles.categoryText}>{app.category}</Text>
          </View>
          <View style={[styles.platform, app.platform === 'web' ? styles.webPlatform : styles.mobilePlatform]}>
            <Text style={styles.platformText}>{app.platform === 'web' ? 'Web' : 'Mobile'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#1e293b',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  categoryText: {
    fontSize: 12,
    color: '#60a5fa',
    fontWeight: '500',
  },
  platform: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  webPlatform: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  mobilePlatform: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  platformText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
