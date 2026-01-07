import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFirebase } from '../../hooks/useFirebase';

// Icon components
const UserIcon = () => <Text style={{ fontSize: 24 }}>👤</Text>;
const MailIcon = () => <Text style={{ fontSize: 16 }}>✉️</Text>;
const EditIcon = () => <Text style={{ fontSize: 20 }}>✏️</Text>;
const LogOutIcon = () => <Text style={{ fontSize: 20 }}>🚪</Text>;
const CheckCircleIcon = () => <Text style={{ fontSize: 16 }}>✅</Text>;
const ClockIcon = () => <Text style={{ fontSize: 16 }}>⏰</Text>;
const FileTextIcon = () => <Text style={{ fontSize: 16 }}>📄</Text>;
const DollarSignIcon = () => <Text style={{ fontSize: 16 }}>💰</Text>;

const tabs = ['Draft', 'Pending', 'Approved', 'Marketplace'];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Approved');
  const { user, logout, userProjects } = useFirebase();

  const filteredProjects = userProjects.filter(
    project => project.status.toLowerCase() === activeTab.toLowerCase()
  );

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return <FileTextIcon />;
      case 'pending':
        return <ClockIcon />;
      case 'approved':
        return <CheckCircleIcon />;
      case 'marketplace':
        return <DollarSignIcon />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return {
          backgroundColor: 'rgba(100, 116, 139, 0.2)',
          color: '#94a3b8',
          borderColor: 'rgba(100, 116, 139, 0.3)',
        };
      case 'pending':
        return {
          backgroundColor: 'rgba(251, 146, 60, 0.2)',
          color: '#fb923c',
          borderColor: 'rgba(251, 146, 60, 0.3)',
        };
      case 'approved':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          color: '#10b981',
          borderColor: 'rgba(16, 185, 129, 0.3)',
        };
      case 'marketplace':
        return {
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          color: '#3b82f6',
          borderColor: 'rgba(59, 130, 246, 0.3)',
        };
      default:
        return {
          backgroundColor: 'rgba(100, 116, 139, 0.2)',
          color: '#94a3b8',
          borderColor: 'rgba(100, 116, 139, 0.3)',
        };
    }
  };

  const renderProjectItem = ({ item }: { item: any }) => {
    const statusColors = getStatusColor(item.status);
    
    return (
      <View style={styles.projectCard}>
        <View style={styles.projectHeader}>
          <View style={styles.projectImageContainer}>
            {item.thumbnail ? (
              <Image source={{ uri: item.thumbnail }} style={styles.projectImage} />
            ) : (
              <View style={styles.projectImagePlaceholder}>
                <FileTextIcon />
              </View>
            )}
          </View>
          
          <View style={styles.projectContent}>
            <Text style={styles.projectTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.projectDescription} numberOfLines={2}>
              {item.description}
            </Text>
            
            <View style={styles.projectFooter}>
              <View style={[styles.statusBadge, statusColors]}>
                {getStatusIcon(item.status)}
                <Text style={[styles.statusText, { color: statusColors.color }]}>
                  {item.status}
                </Text>
              </View>
              
              {item.status === 'Draft' && (
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyStateIcon}>
        <FileTextIcon />
      </View>
      <Text style={styles.emptyStateTitle}>
        No {activeTab} Projects
      </Text>
      <Text style={styles.emptyStateDescription}>
        Your {activeTab.toLowerCase()} projects will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          
          {/* User Card */}
          <View style={styles.userCard}>
            <View style={styles.userCardHeader}>
              <View style={styles.avatar}>
                <UserIcon />
              </View>
              
              <View style={styles.userInfo}>
                <View style={styles.userNameRow}>
                  <Text style={styles.userName} numberOfLines={1}>
                    {user?.name}
                  </Text>
                  {user?.verified && (
                    <CheckCircleIcon />
                  )}
                </View>
                
                <View style={styles.userEmailRow}>
                  <MailIcon />
                  <Text style={styles.userEmail} numberOfLines={1}>
                    {user?.email}
                  </Text>
                </View>
                
                {/* Stats */}
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {userProjects.length}
                    </Text>
                    <Text style={styles.statLabel}>Projects</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {userProjects.filter(p => p.status === 'Approved').length}
                    </Text>
                    <Text style={styles.statLabel}>Approved</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>
                      {userProjects.filter(p => p.status === 'Marketplace').length}
                    </Text>
                    <Text style={styles.statLabel}>Listed</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContent}
          >
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[
                  styles.tab,
                  activeTab === tab && styles.tabActive
                ]}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive
                ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Projects List */}
        <View style={styles.projectsContainer}>
          {filteredProjects.length === 0 ? (
            renderEmptyState()
          ) : (
            <FlatList
              data={filteredProjects}
              renderItem={renderProjectItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.projectsList}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.editProfileButton}>
            <EditIcon />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Logout', onPress: logout, style: 'destructive' }
                ]
              );
            }}
            style={styles.logoutButton}
          >
            <LogOutIcon />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.3)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  userCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  userCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 64,
    height: 64,
    backgroundColor: 'linear-gradient(135deg, #3b82f6, #6366f1)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  userEmailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userEmail: {
    fontSize: 14,
    color: '#94a3b8',
    flex: 1,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    marginRight: 24,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  tabsContainer: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.3)',
  },
  tabsContent: {
    paddingRight: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#fff',
  },
  projectsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  projectsList: {
    gap: 16,
  },
  projectCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  projectImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: '100%',
  },
  projectImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  projectContent: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  projectDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
    lineHeight: 18,
  },
  projectFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3b82f6',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  logoutText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
