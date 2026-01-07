export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  verified: boolean;
  imageUrl?: string;
  thumbnail?: string;
  whatsappNumber?: string;
  contactEmail?: string;
  seller: {
    name: string;
    rating: number;
  };
}
