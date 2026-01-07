import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

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
    <TouchableOpacity style={styles.card} onPress={onBuyRequest}>
      <Image 
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150x150/64748b/ffffff?text=Product' }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.sellerInfo}>
            <Text style={styles.sellerName}>{item.seller.name}</Text>
            <View style={styles.rating}>
              <Text style={styles.ratingText}>⭐ {item.seller.rating}</Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  verifiedBadge: {
    backgroundColor: '#10b981',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 2,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 11,
    color: '#fbbf24',
  },
  priceContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60a5fa',
  },
});
