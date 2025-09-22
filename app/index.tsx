import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Link, useRouter, useFocusEffect } from 'expo-router';
import { loadGameState, clearGameState, loadHighScore } from '../logic/gameStateStorage';

// This component remains the same, but we will use it differently for "New Game"
const MenuButton = ({ title, onPress, style, textStyle }: { title: string, onPress: () => void, style?: object, textStyle?: object }) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
);

export default function HomeScreen() {
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const router = useRouter(); // Get the router instance

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const savedState = await loadGameState();
        setHasSavedGame(savedState !== null);
        const savedHighScore = await loadHighScore();
        setHighScore(savedHighScore);
      };
      fetchData();
    }, [])
  );

  // --- THIS IS THE FIX ---
  // We now have two distinct actions.

  /**
   * Clears any saved game progress and then navigates to the game screen.
   */
  const handleNewGame = async () => {
    await clearGameState();
    router.push('/game');
  };

  /**
   * Navigates directly to the game screen to load the existing progress.
   */
  const handleContinue = () => {
    router.push('/game');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All-Time Best Score</Text>
        <Text style={styles.score}>🏆 {highScore}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* The "Continue" button now uses programmatic navigation */}
        {hasSavedGame && (
          <MenuButton
            title="Continue"
            onPress={handleContinue}
            style={styles.continueButton}
          />
        )}
        {/* The "New Game" button also uses programmatic navigation */}
        <MenuButton
          title="New Game"
          onPress={handleNewGame}
          style={styles.newGameButton}
          textStyle={styles.newGameButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0d3b', justifyContent: 'center', alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: 60 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  score: { fontSize: 48, color: '#f0c419', fontWeight: 'bold', marginTop: 10 },
  buttonContainer: { width: '80%' },
  button: { paddingVertical: 18, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  continueButton: { backgroundColor: '#32cd32' },
  newGameButton: { backgroundColor: '#ff8c00' },
  newGameButtonText: { color: '#fff' },
});