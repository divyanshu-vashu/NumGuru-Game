import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CELL_SIZE = Math.floor((width * 0.9) / 9);

const numberColors: { [key: number]: string } = {
  1: '#ff69b4', 2: '#1e90ff', 3: '#ff8c00', 4: '#9370db', 5: '#32cd32',
  6: '#ff1493', 7: '#00ced1', 8: '#4682b4', 9: '#ffa500',
};

type GridCellProps = {
  number: number;
  onPress: () => void;
  isSelected: boolean;
  isInvalid: boolean;
};

export const GridCell: React.FC<GridCellProps> = ({ number, onPress, isSelected, isInvalid }) => {
  const isMatched = number < 0;
  const displayNumber = Math.abs(number);

  if (number === 0) {
    return <TouchableOpacity style={styles.cellEmpty} disabled />;
  }

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isMatched && styles.matchedCell,
        isSelected && styles.selectedCell,
        isInvalid && styles.invalidCell,
      ]}
      onPress={onPress}
      disabled={isMatched}
    >
      <Text style={[styles.numberText, { color: numberColors[displayNumber] || '#fff' }, isMatched && styles.matchedText]}>
        {displayNumber}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    margin: 1,
    borderRadius: 5,
  },
  cellEmpty: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    margin: 1,
    backgroundColor: 'transparent',
  },
  selectedCell: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  matchedCell: {
    backgroundColor: 'transparent',
  },
  invalidCell: {
    borderColor: '#ff4d4d',
    borderWidth: 1.5,
  },
  numberText: {
    fontSize: CELL_SIZE * 0.6,
    fontWeight: 'bold',
  },
  matchedText: {
    opacity: 0.3, 
  },
});