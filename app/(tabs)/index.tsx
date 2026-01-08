import Feather from '@expo/vector-icons/Feather';
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
import AppCard from '../../components/AppCard';
import { useFirebase } from '../../hooks/useFirebase';

// Icon components
const SearchIcon = () => <Text style={{ fontSize: 20, marginRight: 12 }}>🔍</Text>;
const FilterIcon = () => <Text style={{ fontSize: 20, marginRight: 12 }}>🔧</Text>;

const { width } = Dimensions.get('window');

const professions = ['Developer', 'Designer', 'Student', 'Marketer', 'Freelancer'];
const categories = ['AI Tools', 'Productivity', 'Social', 'Entertainment', 'Education'];
const platforms = ['Web Apps', 'Mobile Apps'];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfession, setSelectedProfession] = useState('Developer');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('Web Apps');
  const { apps, loading } = useFirebase();

  const filteredApps = apps.filter(app => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform === 'Web Apps' ? app.platform === 'web' : app.platform === 'mobile';
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(app.category);
    return matchesSearch && matchesPlatform && matchesCategory;
  });

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderAppCard = ({ item }: { item: any }) => (
    <AppCard app={item} />
  );

  const renderLoadingSkeleton = () => (
    <View style={{
      backgroundColor: 'rgba(30, 41, 59, 0.3)',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 16,
    }}>
      <View style={{
        width: '100%',
        height: 120,
        backgroundColor: 'rgba(51, 65, 85, 0.3)',
      }} />
      <View style={{ padding: 16 }}>
        <View style={{
          width: '60%',
          height: 20,
          borderRadius: 4,
          marginBottom: 8,
          backgroundColor: 'rgba(51, 65, 85, 0.3)',
        }} />
        <View style={{
          width: '100%',
          height: 40,
          borderRadius: 4,
          marginBottom: 12,
          backgroundColor: 'rgba(51, 65, 85, 0.3)',
        }} />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{
            width: 80,
            height: 24,
            borderRadius: 6,
            backgroundColor: 'rgba(51, 65, 85, 0.3)',
          }} />
          <View style={{
            width: 60,
            height: 24,
            borderRadius: 6,
            backgroundColor: 'rgba(51, 65, 85, 0.3)',
          }} />
        </View>
      </View>
    </View>
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
        <SearchIcon />
      </View>
      <Text style={{
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
      }}>No apps found</Text>
      <Text style={{
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
      }}>
        Try adjusting your filters or search query
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{
      flex: 1,
    }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#020617',
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Header */}
        <View style={{
          paddingHorizontal: 16,
          paddingTop: 24,
          paddingBottom: 16,
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
          }}>Discover</Text>
        </View>

        {/* Search Bar */}
        <View style={{
          paddingHorizontal: 16,
          zIndex: 99,
          backgroundColor: '#020617',
          borderBottomWidth: 0.2,
          borderBottomColor: 'rgba(51, 65, 85, 0.3)',
        }}>
          <View style={{
            flexDirection: 'row',
            marginBottom: 12,
            alignItems: 'center',
            backgroundColor: '#101829',
            borderRadius: 10,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderColor: 'rgba(51, 65, 85, 0.5)',
          }}>
            <SearchIcon />
            <TextInput
              style={{
                flex: 1,
                color: '#fff',
                fontSize: 16,
              }}
              placeholder="Search apps, tools, websites..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Profession Filter */}
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
            {professions.map(profession => (
              <TouchableOpacity
                key={profession}
                onPress={() => setSelectedProfession(profession)}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                    backgroundColor: 'rgba(30, 41, 59, 0.5)',
                    marginRight: 8,
                  },
                  selectedProfession === profession && {
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
                  selectedProfession === profession && {
                    color: '#fff',
                  }
                ]}>
                  {profession}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Category Chips */}
        <View style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: '#94a3b8',
              textTransform: 'uppercase',
            }}>Categories</Text>
            <Feather name="filter" size={16} color="#94a3b8" />
          </View>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => toggleCategory(category)}
                style={[
                  {
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 12,
                    backgroundColor: 'rgba(30, 41, 59, 0.3)',
                    borderWidth: 1,
                    borderColor: 'rgba(51, 65, 85, 0.3)',
                  },
                  selectedCategories.includes(category) && {
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  }
                ]}
              >
                <Text style={[
                  {
                    color: '#94a3b8',
                    fontSize: 14,
                    fontWeight: '500',
                  },
                  selectedCategories.includes(category) && {
                    color: '#60a5fa',
                  }
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Platform Toggle */}
        <View style={{
          paddingHorizontal: 16,
          marginBottom: 16,
        }}>
          <View style={{
            backgroundColor: '#0d1426',
            borderRadius: 8,
            padding: 4,
            flexDirection: 'row',
          }}>
            {platforms.map(platform => (
              <TouchableOpacity
                key={platform}
                onPress={() => setSelectedPlatform(platform)}
                style={[
                  {
                    flex: 1,
                    paddingVertical: 8,
                    borderRadius: 8,
                    alignItems: 'center',
                  },
                  selectedPlatform === platform && {
                    backgroundColor: '#334155',
                  }
                ]}
              >
                <Text style={[
                  {
                    color: '#94a3b8',
                    fontSize: 14,
                    fontWeight: '500',
                    textAlign: 'center',
                  },
                  selectedPlatform === platform && {
                    color: '#fff',
                  }
                ]}>
                  {platform}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Grid */}
        <View style={{
          paddingHorizontal: 16,
          paddingBottom: 24,
        }}>
          {loading ? (
            <View style={{
              gap: 16,
            }}>
              {[1, 2, 3, 4].map(i => (
                <View key={i}>{renderLoadingSkeleton()}</View>
              ))}
            </View>
          ) : filteredApps.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={filteredApps}
              renderItem={renderAppCard}
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
      </ScrollView>
    </SafeAreaView>
  );
}