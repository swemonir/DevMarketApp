import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

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
    console.log('App pressed:', app.title);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: '#0d1426',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
        borderWidth: 0.5,
        borderColor: '#2f3b4e',
        position: "relative"
      }}
    >
      <View
        style={{
          backgroundColor: "#212735",
          paddingHorizontal: 12,
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 100,
          paddingVertical: 4,
          borderRadius: 6,
          flexDirection: "row",
          gap: 4
        }}
      >
        <MaterialCommunityIcons name="web" size={16} color="#60a5fa" />
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>
          {app.platform === 'web' ? 'Web' : 'Mobile'}
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 99,
          backgroundColor: "#3677e0",
          padding: 3,
          borderRadius: 6
        }}
      >
        <Feather name="check-circle" size={16} color="white" />
      </View>

      <Image
        source={{
          uri:
            app.imageUrl ||
            'https://images.unsplash.com/photo-1647518238676-ded3f09004fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={{
          width: '100%',
          height: 183,
          // backgroundColor: '#1e293b',
        }}
      />

      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#fff',
            marginBottom: 8,
          }}
        >
          {app.title}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            color: '#94a3b8',
            marginBottom: 12,
            lineHeight: 20,
          }}
        >
          {app.description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#253144',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#263144',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#94a3b8',
                fontWeight: '500',
              }}
            >
              {app.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
