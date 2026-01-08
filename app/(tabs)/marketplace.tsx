import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BuyRequestModal from '../../components/BuyRequestModal';
import MarketplaceCard from '../../components/MarketplaceCard';
import PullToRefreshWrapper from '../../components/PullToRefreshWrapper';
import { useFirebase } from '../../hooks/useFirebase';
import type { MarketplaceItem } from '../../types';

const { width } = Dimensions.get('window');

const categories = ['All', 'Web Apps', 'Mobile Apps', 'Source Code', 'Templates'];

export default function MarketplaceScreen() {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  const { marketplaceItems, loading, refresh } = useFirebase();

  const filteredItems = marketplaceItems.filter(item => {
    const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesVerified = !verifiedOnly || item.verified;
    return matchesPrice && matchesCategory && matchesVerified;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const renderMarketplaceCard = ({ item }: { item: MarketplaceItem }) => (
    <MarketplaceCard
      item={item}
      onBuyRequest={() => setSelectedItem(item)}
    />
  );

  const renderLoadingSkeleton = () => (
    <View style={{
      backgroundColor: 'rgba(30, 41, 59, 0.3)',
      borderRadius: 16,
      height: 320,
      marginBottom: 16,
    }} />
  );

  const renderEmptyState = () => (
    <View style={{
      alignItems: 'center',
      paddingVertical: 48,
    }}>
      <View style={{
        width: 64,
        height: 64,
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
      }}>
        <Octicons name="filter" size={32} color="#94a3b8" />
      </View>
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
      }}>No items found</Text>
      <Text style={{
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
      }}>Try adjusting your filters</Text>
    </View>
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#020617',
    }}>
      <PullToRefreshWrapper
        style={{
          flex: 1,
        }}
        onRefresh={refresh}
        refreshing={loading}
        stickyHeaderIndices={[1]}
      >
        {/* Header */}
        <View style={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(51, 65, 85, 0.3)',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#fff',
            }}>Marketplace</Text>
            <TouchableOpacity
              onPress={() => setShowFilters(!showFilters)}
              style={{
                padding: 8,
                borderRadius: 12,
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
              }}
            >
              <Octicons name="sliders" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Category Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{
              marginBottom: 8,
            }}
            contentContainerStyle={{
              paddingRight: 16,
            }}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleCategory(category)}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    marginRight: 8,
                  },
                  selectedCategory === category && {
                    backgroundColor: '#3b82f6',
                  }
                ]}
              >
                <Text style={[
                  {
                    color: '#94a3b8',
                    fontSize: 14,
                    fontWeight: '500',
                  },
                  selectedCategory === category && {
                    color: '#fff',
                  }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filters Panel */}
        {showFilters && (
          <View style={{
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(51, 65, 85, 0.3)',
          }}>
            <View style={{
              marginBottom: 16,
            }}>
              {/* Price Range */}
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#94a3b8',
                marginBottom: 8,
              }}>
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: '#334155',
                  borderRadius: 8,
                }}
                keyboardType="numeric"
                value={priceRange[1].toString()}
                onChangeText={(text) => {
                  const value = parseInt(text) || 0;
                  setPriceRange([priceRange[0], value]);
                }}
              />
            </View>

            {/* Verified Only Toggle */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#94a3b8',
              }}>
                Verified Only
              </Text>
              <TouchableOpacity
                onPress={() => setVerifiedOnly(!verifiedOnly)}
                style={{
                  width: 48,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: verifiedOnly ? '#3b82f6' : '#334155',
                  justifyContent: 'center',
                }}
              >
                <View style={{
                  width: 16,
                  height: 16,
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  transform: [{ translateX: verifiedOnly ? 24 : 0 }],
                }} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Stats Bar */}
        <View style={{
          backgroundColor: '#080d1f',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <Text style={{
              fontSize: 14,
              color: '#94a3b8',
            }}>
              {filteredItems.length} items found
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Feather name="dollar-sign" size={16} color="#94a3b8" />
              <Text style={{
                fontSize: 14,
                color: '#94a3b8',
                marginLeft: 4,
              }}>
                ${Math.min(...filteredItems.map(i => i.price))} - $
                {Math.max(...filteredItems.map(i => i.price))}
              </Text>
            </View>
          </View>
        </View>

        {/* Marketplace Grid */}
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}>
          {loading ? (
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              {[1, 2, 3, 4].map(i => (
                <View key={i} style={{ width: width > 768 ? '48%' : '100%' }}>
                  {renderLoadingSkeleton()}
                </View>
              ))}
            </View>
          ) : filteredItems.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={filteredItems}
              renderItem={renderMarketplaceCard}
              keyExtractor={item => item.id}
              numColumns={width > 768 ? 2 : 1}
              contentContainerStyle={{
                gap: 16,
              }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </View>
      </PullToRefreshWrapper>

      {/* Buy Request Modal */}
      {selectedItem && (
        <BuyRequestModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </SafeAreaView>
  );
}