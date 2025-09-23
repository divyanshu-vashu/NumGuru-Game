import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { NumberMasterGame } from '../logic/gameLogic';
import { GridCell } from '../components/GridCell';
import { saveGameState, loadGameState, clearGameState, saveHighScore, loadHighScore } from '../logic/gameStateStorage';

type Position = { row: number; col: number };

export default function GameScreen() {
  const router = useRouter();
  const game = useMemo(() => new NumberMasterGame(1), []);
  
  const [isLoading, setIsLoading] = useState(true);
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [highScore, setHighScore] = useState<number>(0);
  const [selectedCell, setSelectedCell] = useState<Position | null>(null);
  
  const [invalidPair, setInvalidPair] = useState<Position[] | null>(null);

  const isGameWon = useRef(false);

  useEffect(() => {
    const initializeGame = async () => {
      const savedProgress = await loadGameState();
      const savedHighScore = await loadHighScore();
      setHighScore(savedHighScore);
      if (savedProgress) {
        game.grid = savedProgress.grid;
        game.score = savedProgress.score;
        game.level = savedProgress.level;
      } else {
        game.generateInitialMatrix();
      }
      updateGameState();
      setIsLoading(false);
    };
    initializeGame();
  }, [game]);

  useEffect(() => {
    return () => {
      if (!isGameWon.current) saveGameState(game);
    };
  }, [game]);

  const updateGameState = useCallback(() => {
    const newGrid = game.grid.map(row => [...row]);
    setGrid(newGrid);
    setScore(game.score);
    setLevel(game.level);
    if (game.score > highScore) {
      setHighScore(game.score);
      saveHighScore(game.score);
    }
    if (newGrid.length === 0 || newGrid.flat().every(cell => cell <= 0)) {
        isGameWon.current = true;
        clearGameState();
    }
  }, [game, highScore]);

  const handleCellPress = (row: number, col: number) => {
    if (grid[row][col] <= 0 || isLoading) return;
    
    if (!selectedCell) {
      setSelectedCell({ row, col });
      return;
    }

    if (selectedCell.row === row && selectedCell.col === col) {
      setSelectedCell(null);
      return;
    }

    if (game.attemptToMatch(selectedCell, { row, col })) {
      updateGameState();
    } else {
      setInvalidPair([selectedCell, { row, col }]);
      setTimeout(() => {
        setInvalidPair(null);
      }, 300);
    }
    
    setSelectedCell(null);
  };
  
  const handleAddMore = () => {
    game.addMoreNumbers();
    updateGameState();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#f0c419" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.headerButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.scoreText}>{score}</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>⚙️</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.subHeader}>
            <Text style={styles.levelText}>Stage {level}</Text>
            <Text style={styles.allTimeText}>All-Time {highScore}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.gridContainer}>
            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                {row.map((number, colIndex) => (
                    <GridCell
                    key={`${rowIndex}-${colIndex}`}
                    number={number}
                    onPress={() => handleCellPress(rowIndex, colIndex)}
                    isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                    // Pass the invalid state to the cell
                    isInvalid={invalidPair?.some(p => p.row === rowIndex && p.col === colIndex) ?? false}
                    />
                ))}
                </View>
            ))}
        </ScrollView>
        
        <View style={styles.footer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleAddMore}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                 <Text style={styles.buttonText}>💡</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2c1d5c' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 10, marginBottom: 20 },
  headerButton: { fontSize: 30, color: '#fff' },
  scoreText: { fontSize: 40, fontWeight: 'bold', color: '#f0c419' },
  levelText: { fontSize: 18, color: '#fff' },
  allTimeText: { fontSize: 18, color: '#fff' },
  gridContainer: { alignItems: 'center', padding: '5%' },
  row: { flexDirection: 'row' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 20, borderTopWidth: 1, borderTopColor: '#444' },
  actionButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#8a2be2', justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 40, fontWeight: 'bold' }
});