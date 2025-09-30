# Task Manager App

A modern, intuitive task management application built with React Native and Expo. This cross-platform mobile app allows users to efficiently create, manage, and track their daily tasks with a clean, user-friendly interface.

## 📱 Features

### Core Functionality
- **Add Tasks**: Create new tasks with detailed descriptions
- **Mark Complete**: Toggle task completion status with visual feedback
- **Delete Tasks**: Remove tasks
- **Task List**: View all tasks in an organized, filterable list

### Advanced Features
- **Real-time Statistics**: Track total, completed, and pending tasks with completion percentage
- **Smart Filtering**: Filter tasks by All, Pending, or Completed status
- **Multiline Input**: Support for long task descriptions with automatic text wrapping
- **Keyboard Shortcuts**: Press Enter to quickly add tasks
- **Responsive Design**: Optimized for various screen sizes and orientations

## 🛠 Technology Stack

### Core Technologies
- **React Native** - Cross-platform mobile development framework
- **Expo** - Development platform and build tools
- **TypeScript** - Type-safe JavaScript for better development experience
- **React Hooks** - Modern state management with useReducer and useCallback

### Third-Party Libraries
- **@expo/vector-icons** - Comprehensive icon library for consistent UI elements
  - Purpose: Provides scalable vector icons for buttons, task items, and interface elements
  - Usage: Icons for add task, delete task, checkmark, and other UI components

## 🚀 Getting Started

### Prerequisites
Before running this application, ensure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (install globally with `npm install -g @expo/cli`)
- **Expo Go app** on your mobile device (for testing on physical devices)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Task-Management-app-ReactNative
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running the Application

#### Option 1: Web Browser (Recommended for Development)
```bash
npm run web
```
- Opens the app in your default web browser
- Accessible at `http://localhost:8082` (or similar port)
- Best for development and testing

#### Option 2: Mobile Device
1. Install **Expo Go** from:
   - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
2. Run `npm start` and scan the QR code with Expo Go

#### Option 3: Simulators/Emulators
```bash
# iOS Simulator (requires macOS)
npm run ios

# Android Emulator
npm run android
```

## 📖 How to Use

### Adding Tasks
1. **Type your task** in the input field at the top
2. **Press Enter** or click the "Add Task" button
3. **Long descriptions** will automatically wrap to new lines
4. **Maximum length**: 200 characters per task

### Managing Tasks
- **Complete a task**: Tap anywhere on the task item
- **Delete a task**: Tap the trash icon on the right
- **Filter tasks**: Use the filter buttons (All, Pending, Completed)
- **View statistics**: Check the stats panel for your progress

### Special Instructions
- **Enter Key**: Press Enter to quickly add tasks without clicking the button
- **Multiline Support**: Type long descriptions - they will wrap automatically
- **Shift + Enter**: In multiline mode, creates a new line instead of submitting
- **Pull to Refresh**: Pull down on the task list to refresh

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AddTaskForm.tsx # Task creation form
│   ├── Button.tsx      # Custom button component with variants
│   ├── Input.tsx       # Multiline input component with validation
│   ├── TaskItem.tsx    # Individual task display component
│   └── TaskList.tsx    # Task list with filtering and statistics
├── screens/            # Application screens
│   └── TaskManagerScreen.tsx # Main application screen
├── types/              # TypeScript type definitions
│   └── index.ts        # Interfaces and type definitions
├── utils/              # Utility functions
│   └── taskUtils.ts    # Task management logic and reducer
└── constants/          # Application constants
    └── colors.ts       # Design system (colors, typography, spacing)
```

## 🎨 Design System

The application follows a modern design system with:

- **Color Palette**: Professional blue (#007AFF) primary color with neutral grays
- **Typography**: Consistent font sizes and weights for optimal readability
- **Spacing**: 8px grid system for consistent layout
- **Shadows**: Subtle elevation effects for depth and hierarchy
- **Border Radius**: Rounded corners for modern, friendly appearance

## 🔧 Development

### Available Scripts
```bash
npm start          # Start Expo development server
npm run web        # Run on web browser
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run build:android # Build Android APK
npm run build:ios     # Build iOS IPA
npm run lint       # Run ESLint
npm run type-check # Run TypeScript type checking
```

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Component Architecture**: Reusable, composable components
- **State Management**: Reducer pattern for predictable state updates
- **Performance**: Optimized rendering with React hooks

## 📱 Platform Support

- **iOS**: Full native support with iOS design patterns
- **Android**: Material Design compliance
- **Web**: Responsive web application
- **Expo Go**: Development and testing platform

## 🚀 Deployment

### Building for Production

1. **Configure app.json** with your app details (name, bundle ID, etc.)
2. **Build for iOS**:
   ```bash
   expo build:ios
   ```
3. **Build for Android**:
   ```bash
   expo build:android
   ```

### App Store Deployment
- Follow Expo's deployment documentation
- Configure app signing certificates
- Submit to Apple App Store and Google Play Store

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

This project was developed as a technical assessment demonstrating:
- React Native development expertise
- TypeScript proficiency
- Modern UI/UX design principles
- Clean code architecture
- Component reusability
- State management best practices

## 🔮 Future Enhancements

Potential features for future development:
- Task categories and tags
- Due dates and reminders
- Task search functionality
- Data persistence with AsyncStorage
- Cloud synchronization
- Dark mode theme
- Task sharing capabilities
- Advanced filtering options
- Task templates
- Productivity analytics
- Offline support

---

**Note**: This is a demonstration project built for a technical assessment. It showcases modern React Native development practices, clean architecture, and professional UI/UX design.