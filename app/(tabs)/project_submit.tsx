import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Icon components
const CheckIcon = () => <Text style={{ fontSize: 20 }}>✓</Text>;
const ChevronLeftIcon = () => <Text style={{ fontSize: 20 }}>←</Text>;
const ChevronRightIcon = () => <Text style={{ fontSize: 20 }}>→</Text>;
const UploadIcon = () => <Text style={{ fontSize: 20 }}>📤</Text>;

const { width, height } = Dimensions.get('window');

const steps = ['Basic Info', 'Platform', 'Media', 'Marketplace', 'Review'];
const categories = ['AI Tools', 'Productivity', 'Social', 'Entertainment', 'Education', 'Developer Tools'];

interface FormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  platformType: 'web' | 'mobile';
  websiteUrl: string;
  appStoreLink: string;
  playStoreLink: string;
  thumbnail: string | null;
  screenshots: string[];
  forSale: boolean;
  price: string;
  contactEmail: string;
  whatsappNumber: string;
}

export default function SubmitScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    tags: '',
    platformType: 'web',
    websiteUrl: '',
    appStoreLink: '',
    playStoreLink: '',
    thumbnail: null,
    screenshots: [],
    forSale: false,
    price: '',
    contactEmail: '',
    whatsappNumber: ''
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Project submitted for review!', [
      {
        text: 'OK',
        onPress: () => {
          // Reset form
          setFormData({
            title: '',
            description: '',
            category: '',
            tags: '',
            platformType: 'web',
            websiteUrl: '',
            appStoreLink: '',
            playStoreLink: '',
            thumbnail: null,
            screenshots: [],
            forSale: false,
            price: '',
            contactEmail: '',
            whatsappNumber: ''
          });
          setCurrentStep(0);
        }
      }
    ]);
  };

  const handleThumbnailUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setFormData({
          ...formData,
          thumbnail: result.assets[0].uri
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleScreenshotUpload = async (index: number) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const newScreenshots = [...formData.screenshots];
        newScreenshots[index] = result.assets[0].uri;
        setFormData({
          ...formData,
          screenshots: newScreenshots
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        {steps.map((step, index) => (
          <View key={step} style={styles.progressStep}>
            <View style={[
              styles.progressCircle,
              index <= currentStep && styles.progressCircleActive
            ]}>
              <Text style={[
                styles.progressCircleText,
                index <= currentStep && styles.progressCircleTextActive
              ]}>
                {index < currentStep ? '✓' : index + 1}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View style={[
                styles.progressLine,
                index < currentStep && styles.progressLineActive
              ]} />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.progressText}>
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Project Title *</Text>
        <TextInput
          style={styles.input}
          value={formData.title}
          onChangeText={(value) => updateFormData('title', value)}
          placeholder="Enter project title"
          placeholderTextColor="#64748b"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Short Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.description}
          onChangeText={(value) => updateFormData('description', value)}
          placeholder="Describe your project in 2-3 sentences"
          placeholderTextColor="#64748b"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Category *</Text>
        <ScrollView style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.pickerOption,
                formData.category === cat && styles.pickerOptionSelected
              ]}
              onPress={() => updateFormData('category', cat)}
            >
              <Text style={[
                styles.pickerOptionText,
                formData.category === cat && styles.pickerOptionTextSelected
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Tags (comma-separated)</Text>
        <TextInput
          style={styles.input}
          value={formData.tags}
          onChangeText={(value) => updateFormData('tags', value)}
          placeholder="react, typescript, tailwind"
          placeholderTextColor="#64748b"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Platform Type *</Text>
        <View style={styles.platformButtons}>
          <TouchableOpacity
            style={[
              styles.platformButton,
              formData.platformType === 'web' && styles.platformButtonActive
            ]}
            onPress={() => updateFormData('platformType', 'web')}
          >
            <Text style={[
              styles.platformButtonText,
              formData.platformType === 'web' && styles.platformButtonTextActive
            ]}>
              Web App
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.platformButton,
              formData.platformType === 'mobile' && styles.platformButtonActive
            ]}
            onPress={() => updateFormData('platformType', 'mobile')}
          >
            <Text style={[
              styles.platformButtonText,
              formData.platformType === 'mobile' && styles.platformButtonTextActive
            ]}>
              Mobile App
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {formData.platformType === 'web' && (
        <View style={styles.formGroup}>
          <Text style={styles.label}>Website URL *</Text>
          <TextInput
            style={styles.input}
            value={formData.websiteUrl}
            onChangeText={(value) => updateFormData('websiteUrl', value)}
            placeholder="https://example.com"
            placeholderTextColor="#64748b"
            keyboardType="url"
          />
        </View>
      )}

      {formData.platformType === 'mobile' && (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.label}>App Store Link</Text>
            <TextInput
              style={styles.input}
              value={formData.appStoreLink}
              onChangeText={(value) => updateFormData('appStoreLink', value)}
              placeholder="https://apps.apple.com/..."
              placeholderTextColor="#64748b"
              keyboardType="url"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Play Store Link</Text>
            <TextInput
              style={styles.input}
              value={formData.playStoreLink}
              onChangeText={(value) => updateFormData('playStoreLink', value)}
              placeholder="https://play.google.com/..."
              placeholderTextColor="#64748b"
              keyboardType="url"
            />
          </View>
        </>
      )}
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.formContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Thumbnail Image *</Text>
        <TouchableOpacity style={styles.uploadArea} onPress={handleThumbnailUpload}>
          {formData.thumbnail ? (
            <View style={styles.uploadSuccess}>
              <Image source={{ uri: formData.thumbnail }} style={styles.thumbnailImage} />
              <CheckIcon />
              <Text style={styles.uploadSuccessText}>{formData.thumbnail.split('/').pop()}</Text>
              <Text style={styles.uploadSubtext}>Click to change</Text>
            </View>
          ) : (
            <View style={styles.uploadPlaceholder}>
              <UploadIcon />
              <Text style={styles.uploadText}>Upload Thumbnail</Text>
              <Text style={styles.uploadSubtext}>PNG, JPG up to 5MB</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Screenshots (Optional)</Text>
        <Text style={styles.uploadHelper}>Add up to 5 screenshots</Text>
        <View style={styles.screenshotsGrid}>
          {[0, 1, 2, 3].map(index => (
            <TouchableOpacity
              key={index}
              style={styles.screenshotItem}
              onPress={() => handleScreenshotUpload(index)}
            >
              {formData.screenshots[index] ? (
                <Image source={{ uri: formData.screenshots[index] }} style={styles.screenshotImage} />
              ) : (
                <View style={styles.screenshotPlaceholder}>
                  <UploadIcon />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.formContainer}>
      <View style={styles.marketplaceCard}>
        <View style={styles.marketplaceHeader}>
          <View>
            <Text style={styles.marketplaceTitle}>List for Sale</Text>
            <Text style={styles.marketplaceDescription}>
              Make your project available in the marketplace
            </Text>
          </View>
          <Switch
            value={formData.forSale}
            onValueChange={(value) => updateFormData('forSale', value)}
            trackColor={{ false: '#334155', true: '#3b82f6' }}
            thumbColor={formData.forSale ? '#fff' : '#94a3b8'}
          />
        </View>
      </View>

      {formData.forSale && (
        <View style={styles.saleForm}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Price (USD) *</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.pricePrefix}>$</Text>
              <TextInput
                style={[styles.input, styles.priceInput]}
                value={formData.price}
                onChangeText={(value) => updateFormData('price', value)}
                placeholder="0"
                placeholderTextColor="#64748b"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Contact Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.contactEmail}
              onChangeText={(value) => updateFormData('contactEmail', value)}
              placeholder="your@email.com"
              placeholderTextColor="#64748b"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>WhatsApp Number</Text>
            <TextInput
              style={styles.input}
              value={formData.whatsappNumber}
              onChangeText={(value) => updateFormData('whatsappNumber', value)}
              placeholder="+1234567890"
              placeholderTextColor="#64748b"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      )}
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.formContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Project Summary</Text>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Title</Text>
          <Text style={styles.summaryValue}>{formData.title || 'Not set'}</Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Description</Text>
          <Text style={styles.summaryValue}>{formData.description || 'Not set'}</Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Category</Text>
          <Text style={styles.summaryValue}>{formData.category || 'Not set'}</Text>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.summaryLabel}>Platform</Text>
          <Text style={styles.summaryValue}>{formData.platformType}</Text>
        </View>

        {formData.forSale && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryLabel}>Price</Text>
            <Text style={styles.summaryPrice}>${formData.price}</Text>
          </View>
        )}
      </View>

      <View style={styles.readyCard}>
        <View style={styles.readyContent}>
          <View style={styles.readyIcon}>
            <CheckIcon />
          </View>
          <View>
            <Text style={styles.readyTitle}>Ready to Submit</Text>
            <Text style={styles.readyDescription}>
              Your project will be reviewed by our team. You'll receive
              a notification once it's approved.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderStep1();
      case 1: return renderStep2();
      case 2: return renderStep3();
      case 3: return renderStep4();
      case 4: return renderStep5();
      default: return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Submit Project</Text>
          {renderProgressBar()}
        </View>

        {/* Form Content */}
        <View style={styles.content}>
          <View style={styles.contentInner}>
            {renderCurrentStep()}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.navigation}>
        <View style={styles.navigationInner}>
          <TouchableOpacity
            onPress={handleBack}
            disabled={currentStep === 0}
            style={[
              styles.navButton,
              styles.backButton,
              currentStep === 0 && styles.navButtonDisabled
            ]}
          >
            <ChevronLeftIcon />
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>

          {currentStep < steps.length - 1 ? (
            <TouchableOpacity onPress={handleNext} style={[styles.navButton, styles.nextButton]}>
              <Text style={styles.navButtonText}>Next</Text>
              <ChevronRightIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSubmit} style={[styles.navButton, styles.submitButton]}>
              <CheckIcon />
              <Text style={styles.navButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.3)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleActive: {
    backgroundColor: '#3b82f6',
  },
  progressCircleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  progressCircleTextActive: {
    color: '#fff',
  },
  progressLine: {
    flex: 1,
    height: 4,
    marginHorizontal: 8,
    borderRadius: 2,
    backgroundColor: '#334155',
  },
  progressLineActive: {
    backgroundColor: '#3b82f6',
  },
  progressText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  contentInner: {
    maxWidth: 672,
    alignSelf: 'center',
    width: '100%',
  },
  formContainer: {
    gap: 16,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  input: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    maxHeight: 150,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.3)',
  },
  pickerOptionSelected: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  pickerOptionText: {
    color: '#fff',
    fontSize: 16,
  },
  pickerOptionTextSelected: {
    color: '#3b82f6',
  },
  platformButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  platformButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    alignItems: 'center',
  },
  platformButtonActive: {
    borderColor: '#3b82f6',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  platformButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  platformButtonTextActive: {
    color: '#3b82f6',
  },
  uploadArea: {
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderWidth: 2,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
  },
  uploadSuccess: {
    alignItems: 'center',
    gap: 8,
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  uploadSuccessText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadPlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadSubtext: {
    color: '#94a3b8',
    fontSize: 14,
  },
  uploadHelper: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 12,
  },
  screenshotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  screenshotItem: {
    width: (width - 48) / 2 - 6,
    aspectRatio: 16 / 9,
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderWidth: 2,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    borderStyle: 'dashed',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  screenshotImage: {
    width: '100%',
    height: '100%',
  },
  screenshotPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketplaceCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
  },
  marketplaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  marketplaceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  marketplaceDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  saleForm: {
    gap: 16,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pricePrefix: {
    position: 'absolute',
    left: 16,
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
    zIndex: 1,
  },
  priceInput: {
    paddingLeft: 32,
  },
  summaryCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
    gap: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  summarySection: {
    gap: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#94a3b8',
  },
  summaryValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  summaryPrice: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  readyCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 16,
    padding: 24,
  },
  readyContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  readyIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  readyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  readyDescription: {
    fontSize: 14,
    color: '#94a3b8',
    lineHeight: 20,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.3)',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  navigationInner: {
    maxWidth: 672,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButton: {
    backgroundColor: '#334155',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  nextButton: {
    backgroundColor: '#3b82f6',
  },
  submitButton: {
    backgroundColor: '#10b981',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
