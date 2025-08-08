# 🎨 Salim Content Generator

A modern content generation platform powered by Claude AI, built with Next.js and TypeScript. Generate philosophical quotes, create videos, backgrounds, and music with AI assistance.

## ✨ Features

- **💬 Quote Generation** - Create philosophical quotes with Claude AI in various styles
- **🎥 Video Generation** - Generate video content with AI assistance
- **🖼️ Background Generation** - Create beautiful backgrounds for content
- **🎵 Music Generation** - AI-powered music creation
- **🎯 Multiple AI Providers** - Support for Claude, OpenAI, and other AI services
- **🌙 Dark/Light Mode** - Beautiful theme switching
- **📱 Responsive Design** - Works on all devices

## 🚀 Technology Stack

### 🎯 Core Framework
- **⚡ Next.js 15** - The React framework with App Router
- **📘 TypeScript** - Type-safe development
- **🎨 Tailwind CSS** - Utility-first CSS framework

### 🧩 UI Components
- **🧩 shadcn/ui** - High-quality, accessible components
- **🎯 Lucide React** - Beautiful icon library
- **🌈 Framer Motion** - Smooth animations

### 🤖 AI Integration
- **🧠 Claude/Anthropic API** - Advanced language model for content generation
- **🔗 Multiple AI Providers** - Support for various AI services
- **🔄 Real-time Processing** - Socket.IO for live updates

### 🗄️ Backend & Database
- **🗄️ Prisma** - Type-safe database ORM
- **🔌 Socket.IO** - Real-time communication
- **⚡ Custom API Routes** - Optimized API endpoints

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (on port 9090)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:9090](http://localhost:9090) to see the application.

## 🔧 Configuration

### API Keys Setup

1. **Claude API Key**: Get your key from [Anthropic Console](https://console.anthropic.com/settings/keys)
2. **Other Providers**: Configure additional AI providers as needed

### Environment Setup

The application supports various AI providers. Configure your API keys in the AI Providers tab within the application.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── generate-quote/     # Quote generation endpoint
│   │   ├── generate-video/     # Video generation endpoint
│   │   ├── generate-background/ # Background generation endpoint
│   │   ├── generate-music/     # Music generation endpoint
│   │   └── validate-api-key/   # API key validation
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── tabs/            # Main application tabs
│   │   ├── idea-quote-tab.tsx    # Quote generation interface
│   │   ├── video-generation-tab.tsx # Video generation interface
│   │   ├── ai-providers-tab.tsx     # AI provider configuration
│   │   └── social-media-tab.tsx     # Social media features
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── db.ts           # Database configuration
│   ├── socket.ts       # Socket.IO setup
│   └── utils.ts        # Utility functions
└── hooks/              # Custom React hooks
```

## 🎯 Key Features

### Quote Generation
- Multiple philosophical styles (Spinoza, Camus, etc.)
- Different prompt styles (analytical, creative, balanced)
- Quote types (philosophical, life psychology, mixed)
- Real-time generation with Claude AI

### Video Generation
- AI-powered video creation
- Multiple provider support
- Custom prompts and styles

### Background Generation
- Beautiful background creation
- Various artistic styles
- High-quality output

### Music Generation
- AI-composed music
- Different genres and moods
- Custom duration and style

## 🔐 API Key Management

The application supports multiple AI providers:

- **Claude/Anthropic** - Primary quote generation
- **OpenAI** - Additional content generation
- **Google Gemini** - Alternative AI provider
- **Other Providers** - Extensible architecture

## 🌍 Deployment

The application is configured for deployment on various platforms:

- **Vercel** - Optimal for Next.js applications
- **Netlify** - Alternative deployment option
- **Docker** - Container deployment ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.

---

Built with ❤️ using Claude AI assistance and modern web technologies 🚀