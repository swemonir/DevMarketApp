import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useFirebase } from '../hooks/useFirebase';

// Icon component
const SparklesIcon = () => <Text style={{ fontSize: 64, color: '#fff' }}>✨</Text>;

export default function SplashScreen() {
    const router = useRouter();
    const { user, loading } = useFirebase();
    const [fadeAnim] = useState(new Animated.Value(0));
    const [bounceAnim1] = useState(new Animated.Value(0));
    const [bounceAnim2] = useState(new Animated.Value(0));
    const [bounceAnim3] = useState(new Animated.Value(0));

    useEffect(() => {
        // Fade in animation for main content
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Bounce animations for dots with delays
        const startBounceAnimation = (anim: Animated.Value, delay: number) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.delay(delay),
                    Animated.timing(anim, {
                        toValue: -10,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0,
                        duration: 600,
                        useNativeDriver: true,
                    }),
                ])
            );
        };

        startBounceAnimation(bounceAnim1, 0).start();
        startBounceAnimation(bounceAnim2, 100).start();
        startBounceAnimation(bounceAnim3, 200).start();

        // Check authentication and redirect after 2.5 seconds
        const timer = setTimeout(() => {
            if (!loading) {
                if (user) {
                    router.replace('/(tabs)' as any);
                } else {
                    router.replace('/login' as any);
                }
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [user, loading, router, fadeAnim, bounceAnim1, bounceAnim2, bounceAnim3]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
                <View style={styles.glowEffect} />
                <View style={styles.logo}>
                    <SparklesIcon />
                </View>
            </Animated.View>

            <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
                <Text style={styles.title}>DevNexus</Text>
                <Text style={styles.subtitle}>
                    Discover, Showcase & Sell Your Creations
                </Text>
            </Animated.View>

            <Animated.View style={[styles.dotsContainer, { opacity: fadeAnim }]}>
                <Animated.View style={[styles.dot, { transform: [{ translateY: bounceAnim1 }] }]} />
                <Animated.View style={[styles.dot, { transform: [{ translateY: bounceAnim2 }] }]} />
                <Animated.View style={[styles.dot, { transform: [{ translateY: bounceAnim3 }] }]} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logoContainer: {
        position: 'relative',
        marginBottom: 32,
    },
    glowEffect: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderRadius: 100,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 40,
        elevation: 20,
    },
    logo: {
        backgroundColor: '#3b82f6',
        padding: 24,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#94a3b8',
        textAlign: 'center',
        lineHeight: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#3b82f6',
        borderRadius: 4,
    },
});
