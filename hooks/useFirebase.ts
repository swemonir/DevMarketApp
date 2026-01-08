import { useEffect, useState } from 'react';
import type { MarketplaceItem } from '../types';

interface App {
  id: string;
  title: string;
  description: string;
  category: string;
  platform: 'web' | 'mobile';
  imageUrl?: string;
  url?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
}

interface UserProject {
  id: string;
  title: string;
  description: string;
  status: 'Draft' | 'Pending' | 'Approved' | 'Marketplace';
  thumbnail?: string | null;
  category: string;
  platformType: 'web' | 'mobile';
  submittedAt: string;
}

export const useFirebase = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userProjects, setUserProjects] = useState<UserProject[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual Firebase calls
  const mockUser: User = {
    id: '1',
    name: 'John Developer',
    email: 'john@example.com',
    verified: true,
  };

  const mockApps: App[] = [
    {
      id: '1',
      title: 'AI Assistant',
      description: 'Advanced AI-powered assistant for productivity',
      category: 'AI Tools',
      platform: 'web',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1725985758331-e1b46919d8cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '2',
      title: 'Task Manager',
      description: 'Organize your tasks efficiently',
      category: 'Productivity',
      platform: 'mobile',
      imageUrl: 'https://images.unsplash.com/photo-1579869847557-1f67382cc158?q=80&w=1334&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '3',
      title: 'Social Hub',
      description: 'Connect with friends and family',
      category: 'Social',
      platform: 'web',
      imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: '4',
      title: 'Learning Platform',
      description: 'Interactive educational content',
      category: 'Education',
      platform: 'mobile',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  const mockMarketplaceItems: MarketplaceItem[] = [
    {
      id: '1',
      title: 'Premium Dashboard Template',
      description: 'Beautiful admin dashboard template with charts and analytics',
      price: 49,
      category: 'Templates',
      verified: true,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300&h=300',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
      whatsappNumber: '1234567890',
      contactEmail: 'devstudio@example.com',
      seller: {
        name: 'DevStudio',
        rating: 4.8,
      },
    },
    {
      id: '2',
      title: 'Mobile App Source Code',
      description: 'Complete React Native app with authentication and real-time features',
      price: 299,
      category: 'Source Code',
      verified: true,
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=300&h=300',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
      whatsappNumber: '9876543210',
      contactEmail: 'codemaster@example.com',
      seller: {
        name: 'CodeMaster',
        rating: 4.9,
      },
    },
    {
      id: '3',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      price: 199,
      category: 'Web Apps',
      verified: false,
      thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=300&h=300',
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200',
      whatsappNumber: '5555555555',
      contactEmail: 'webdev@example.com',
      seller: {
        name: 'WebDev Pro',
        rating: 4.5,
      },
    },
    {
      id: '4',
      title: 'UI Component Library',
      description: '50+ premium React components with TypeScript support',
      price: 89,
      category: 'Mobile Apps',
      verified: true,
      thumbnail: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      imageUrl: 'https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      whatsappNumber: '1111111111',
      contactEmail: 'uiexpert@example.com',
      seller: {
        name: 'UI Expert',
        rating: 4.7,
      },
    },
  ];

  const mockUserProjects: UserProject[] = [
    {
      id: '1',
      title: 'AI Task Manager',
      description: 'Smart task management with AI-powered prioritization and automation',
      status: 'Approved',
      thumbnail: 'https://via.placeholder.com/150x150/10b981/ffffff?text=TaskAI',
      category: 'Productivity',
      platformType: 'web',
      submittedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Social Media Dashboard',
      description: 'Comprehensive dashboard for managing multiple social media accounts',
      status: 'Pending',
      thumbnail: 'https://via.placeholder.com/150x150/3b82f6/ffffff?text=Social',
      category: 'Social',
      platformType: 'web',
      submittedAt: '2024-01-18',
    },
    {
      id: '3',
      title: 'Mobile Game Engine',
      description: 'Lightweight game engine for 2D mobile games with physics simulation',
      status: 'Marketplace',
      thumbnail: 'https://via.placeholder.com/150x150/f59e0b/ffffff?text=Game',
      category: 'Developer Tools',
      platformType: 'mobile',
      submittedAt: '2024-01-10',
    },
    {
      id: '4',
      title: 'E-commerce Template',
      description: 'Modern e-commerce template with payment integration and inventory management',
      status: 'Draft',
      thumbnail: 'https://via.placeholder.com/150x150/8b5cf6/ffffff?text=Ecom',
      category: 'Templates',
      platformType: 'web',
      submittedAt: '2024-01-20',
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setApps(mockApps);
      setMarketplaceItems(mockMarketplaceItems);
      setUser(mockUser);
      setUserProjects(mockUserProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const logout = () => {
    setUser(null);
    setUserProjects([]);
  };

  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setApps(mockApps);
      setMarketplaceItems(mockMarketplaceItems);
      setUser(mockUser);
      setUserProjects(mockUserProjects);
      setLoading(false);
    }, 1000);
  };

  return { apps, marketplaceItems, user, userProjects, logout, loading, refresh };
};
