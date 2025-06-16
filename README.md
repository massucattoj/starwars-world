🚀 **[View Live Demo](https://starwars-world-two.vercel.app/)**

# Star Wars World

A modern, interactive web application that brings the Star Wars universe to your fingertips. Explore the epic saga through movies and discover the legendary characters that shaped this galaxy far, far away.

## 🔮 Future Enhancements

If more time or increase the complexity a better approach will be add a React Query to that project, or replace the idea for a Redux and RTL Query libraries approach.

- [ ] Planets and starships exploration
- [ ] Advanced search and filtering
- [ ] Character relationship mapping
- [ ] Movie timeline visualization
- [ ] Favorites system
- [ ] Dark/Light theme toggle

## ✨ Features

- **🎬 Movies Explorer**: Browse through all Star Wars films with detailed information including opening crawls, directors, and release dates
- **👥 Characters Database**: Discover heroes, villains, and legends from the Star Wars universe
- **🖼️ Movie Posters**: Dynamic poster fetching from OMDB API for enhanced visual experience
- **🎨 Star Wars UI**: Authentic black and gold theme inspired by the Star Wars aesthetic
- **📱 Responsive Design**: Optimized for all devices with modern UI/UX
- **⚡ Performance**: Built with Next.js 15 and React 19 for lightning-fast performance
- **🧪 Fully Tested**: Comprehensive test suite with Vitest

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS with custom Star Wars theme
- **State Management**: Zustand for efficient global state
- **HTTP Client**: Axios for API requests
- **Icons**: Lucide React
- **Testing**: Vitest, React Testing Library
- **Code Quality**: ESLint, Prettier
- **Package Manager**: PNPM

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/starwars-world.git
cd starwars-world
```

2. **Install dependencies**

```bash
pnpm install
# or
npm install
```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SWAPI_BASE_URL=https://www.swapi.tech/api
NEXT_PUBLIC_OMDB_BASE_URL=https://www.omdbapi.com/
NEXT_PUBLIC_OMDB_API_KEY=your_omdb_api_key_here
```

4. **Run the development server**

```bash
pnpm dev
# or
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests once
pnpm test:run

# Run tests with coverage
pnpm test:coverage
```

## 🌐 API Integration

- **SWAPI (Star Wars API)**: Primary data source for movies and characters
- **OMDB API**: Enhanced movie data including posters and additional metadata

## 🚀 Deployment

This application is deployed on [Vercel](https://vercel.com/), taking advantage of their seamless integration with Next.js for optimal performance and automatic deployments from the main branch.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Star Wars API (SWAPI) for providing the data
- OMDB API for movie posters and metadata
- The Star Wars universe and its creators
- The open source community

---

_May the Force be with you!_ ⭐️
