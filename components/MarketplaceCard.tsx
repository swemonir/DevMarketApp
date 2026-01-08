import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// ১. এখানে LinearGradient ইমপোর্ট করা হয়েছে
import { LinearGradient } from 'expo-linear-gradient';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  verified: boolean;
  imageUrl?: string;
  seller: {
    name: string;
    rating: number;
  };
}

interface MarketplaceCardProps {
  item: MarketplaceItem;
  onBuyRequest: () => void;
}

export default function MarketplaceCard({ item, onBuyRequest }: MarketplaceCardProps) {
  return (
    <TouchableOpacity
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
        <Text style={{ fontSize: 12, fontWeight: '600', color: '#fff' }}>
          {item.category}
        </Text>
      </View>
      
      {item.verified && (
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
      )}

      <Image
        source={{
          uri: item.imageUrl || 'https://images.unsplash.com/photo-1647518238676-ded3f09004fe?q=80&w=1170&auto=format&fit=crop'
        }}
        style={{
          width: '100%',
          height: 183,
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
          {item.title}
        </Text>
        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end', // এটি নিচে অ্যালাইন করবে
          }}
        >
          <View style={{ gap: 8, flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View
                style={{
                  backgroundColor: '#253144',
                  paddingHorizontal: 9,
                  paddingVertical: 8,
                  borderRadius: 20, // circle করার জন্য 20 যথেষ্ট
                }}
              >
                <FontAwesome6 name="user" size={14} color="#94a3b8" />
              </View>
              <Text style={{ color: '#94a3b8' }}>{item.seller.name}</Text>
            </View>
            
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: '#FFF',
                }}
              >
                ${item.price}
              </Text>
              <Text style={{ fontSize: 12, color: '#94a3b8' }}>{item.category}</Text>
            </View>
          </View>

          {/* ২. বড় হাতের অক্ষরে LinearGradient ব্যবহার করা হয়েছে */}
          <TouchableOpacity
            onPress={onBuyRequest}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3b82f6', '#4f46e5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 24,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#3b82f6',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 10,
                elevation: 5,
              }}
            >
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 16,
                  fontWeight: '600'
                }}
              >
                Buy
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}