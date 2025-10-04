# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project# Number Master - A Logic Puzzle Game

![Game Screenshot](./assets/images/icon.png)

![Screenshot_20251004-202940_NumGuru.png](https://github.com/user-attachments/assets/646fa2a9-7f9c-4d3b-97cd-d711ef02a3b8)

![Screenshot_20251004-202935_NumGuru.png](https://github.com/user-attachments/assets/4e4dfefb-d684-450a-998e-ff62bb757a6a)

Number Master is an engaging puzzle game where players match number pairs to clear the grid. The game challenges your pattern recognition and strategic thinking as you progress through increasingly difficult levels.

## 🎮 Demo

[Watch Gameplay Video](https://drive.google.com/file/d/19EFbPsO1DSrnB47LDQVAXfvY3CDTCBVa/view?usp=sharing)

## ✨ Features

- **Progressive Difficulty**: Start with simple grids and advance through increasingly challenging levels
- **Smart Matching System**: Match equal numbers or pairs that sum to 10
- **Multiple Path Finding**: Match numbers horizontally, vertically, diagonally, or with wrap-around
- **Dynamic Grid**: Rows automatically collapse when cleared
- **Score Tracking**: Compete for the highest score
- **Progress Saving**: Your game progress is automatically saved
- **Responsive Design**: Works on both mobile and tablet devices

## 🎯 Game Rules

1. **Objective**: Clear the grid by matching all number pairs
2. **Valid Matches**:
   - Two identical numbers (e.g., 7 and 7)
   - Two numbers that sum to 10 (e.g., 3 and 7)
3. **Path Rules**:
   - Numbers must have a clear path (no obstacles between them)
   - Paths can be horizontal, vertical, or diagonal
   - Wrap-around matching is supported
4. **Level Progression**:
   - Each level starts with more numbers
   - Clear all numbers to advance
   - Use the + button to add more numbers when stuck

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ (LTS version recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd numbermaster
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npx expo start
   ```


## 📱 Building for Production

### Android
```bash
eas build --platform android
```

iOS (requires macOS):
```bash
eas build --platform ios
```

## 🛠️ Technical Stack

- React Native (Expo)
- TypeScript
- Expo Router
- AsyncStorage for local data persistence
- React Native Reanimated for smooth animations

## 📝 Known Limitations

- Currently optimized for mobile devices (not fully responsive for tablets)
- Offline play only (no cloud sync or multiplayer)
- Limited to single-player mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.




