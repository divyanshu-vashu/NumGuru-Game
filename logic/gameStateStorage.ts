import AsyncStorage from '@react-native-async-storage/async-storage';
import { NumberMasterGame } from './gameLogic';

const GAME_STATE_KEY = '@NumberMasterGame_SavedState';
const HIGH_SCORE_KEY = '@NumberMasterGame_HighScore'; // New key for high score

// A plain object to hold the data we want to save
type SavedGameState = {
  grid: number[][];
  score: number;
  level: number;
};

// --- Game Progress Functions ---

export const saveGameState = async (game: NumberMasterGame): Promise<void> => {
  try {
    const stateToSave: SavedGameState = { grid: game.grid, score: game.score, level: game.level };
    const jsonValue = JSON.stringify(stateToSave);
    await AsyncStorage.setItem(GAME_STATE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save game state.', e);
  }
};

export const loadGameState = async (): Promise<SavedGameState | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_STATE_KEY);
    return jsonValue != null ? (JSON.parse(jsonValue) as SavedGameState) : null;
  } catch (e) {
    console.error('Failed to load game state.', e);
    return null;
  }
};

export const clearGameState = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(GAME_STATE_KEY);
  } catch (e) {
    console.error('Failed to clear game state.', e);
  }
};

// --- High Score Functions (New) ---

/**
 * Saves a new high score to the device's storage.
 * @param score The new high score to save.
 */
export const saveHighScore = async (score: number): Promise<void> => {
  try {
    await AsyncStorage.setItem(HIGH_SCORE_KEY, String(score));
  } catch (e) {
    console.error('Failed to save high score.', e);
  }
};

/**
 * Loads the high score from storage.
 * @returns The saved high score, or 0 if none exists.
 */
export const loadHighScore = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    if (value !== null) {
      return parseInt(value, 10);
    }
    return 0; // Default to 0 if no high score is saved
  } catch (e) {
    console.error('Failed to load high score.', e);
    return 0;
  }
};