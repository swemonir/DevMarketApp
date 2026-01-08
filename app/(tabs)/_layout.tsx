import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather'; // import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import AuthGuard from '../../components/AuthGuard';

export default function TabLayout() {
    return (
        <AuthGuard>
            <Tabs screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#020617',
                    height: 84,
                    paddingTop: 15,
                    borderTopColor: "#162133"
                }
            }}>
                <Tabs.Screen name="index" options={{
                    title: 'Discover',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="timer-settings-outline" size={24} color={color} />
                }} />
                <Tabs.Screen name="marketplace" options={{
                    title: 'Marketplace',
                    tabBarIcon: ({ color }) => <Feather name="shopping-bag" size={24} color={color} />
                }} />
                <Tabs.Screen name="project_submit" options={{
                    title: 'Submit',
                    tabBarIcon: ({ color }) => <AntDesign name="plus-circle" size={24} color={color} />
                }} />
                <Tabs.Screen name="profile" options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />
                }} />
            </Tabs>
        </AuthGuard>
    );
}