import React from 'react';
import {
    Dimensions,
    Image,
    Linking,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import type { MarketplaceItem } from '../types';

interface BuyRequestModalProps {
  item: MarketplaceItem;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

export default function BuyRequestModal({ item, onClose }: BuyRequestModalProps) {
  const message = `Hello, I'm interested in purchasing your project "${item.title}" listed on DevNexus.`;

  const handleWhatsApp = () => {
    const phoneNumber = item.whatsappNumber || '1234567890';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  const handleEmail = () => {
    const email = item.contactEmail || 'seller@devnexus.com';
    const subject = `Interested in ${item.title}`;
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    Linking.openURL(url);
  };

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableOpacity 
          style={styles.backdrop} 
          onPress={onClose}
          activeOpacity={1}
        />

        {/* Modal */}
        <View style={styles.modal}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          {/* Mobile Handle */}
          <View style={styles.mobileHandle} />

          <Text style={styles.modalTitle}>Contact Seller</Text>
          <Text style={styles.modalSubtitle}>
            Choose how you'd like to reach out
          </Text>

          {/* Item Preview */}
          <View style={styles.itemPreview}>
            <View style={styles.itemImageContainer}>
              {item.thumbnail ? (
                <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
              ) : (
                <View style={[styles.itemImage, styles.placeholderImage]}>
                  <Text style={styles.placeholderText}>📦</Text>
                </View>
              )}
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.itemSeller}>by {item.seller.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>

          {/* Message Preview */}
          <View style={styles.messagePreview}>
            <Text style={styles.messageLabel}>Message:</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          {/* Contact Options */}
          <View style={styles.contactOptions}>
            <TouchableOpacity onPress={handleWhatsApp} style={styles.whatsappButton}>
              <Text style={styles.whatsappIcon}>💬</Text>
              <Text style={styles.whatsappText}>Contact via WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleEmail} style={styles.emailButton}>
              <Text style={styles.emailIcon}>✉️</Text>
              <Text style={styles.emailText}>Contact via Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modal: {
    width: '100%',
    maxWidth: width > 768 ? 448 : width,
    backgroundColor: '#1e293b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderRadius: width > 768 ? 24 : 0,
    padding: 24,
    paddingTop: 32,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  closeText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '500',
  },
  mobileHandle: {
    width: 32,
    height: 4,
    backgroundColor: '#475569',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
    display: width > 768 ? 'none' : 'flex',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 24,
  },
  itemPreview: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  itemImageContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#334155',
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#334155',
  },
  placeholderText: {
    fontSize: 24,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  itemSeller: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60a5fa',
  },
  messagePreview: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  messageLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  contactOptions: {
    gap: 12,
  },
  whatsappButton: {
    backgroundColor: '#10b981',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  whatsappIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  whatsappText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emailButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  emailIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  emailText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
