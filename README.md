# ✨ Personal Resume Website

A stunning, modern personal resume website built with React, Material-UI, and Vite. Features a beautiful dark theme with gradient accents and smooth animations.

## 🚀 Features

- **🎨 Beautiful Design**: Modern glassmorphism design with gradient backgrounds
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🌟 Smooth Animations**: Framer Motion animations and micro-interactions
- **🎯 Interactive Elements**: Hover effects, floating particles, and animated backgrounds
- **⚡ Lightning Fast**: Built with Vite for optimal performance
- **🔍 SEO Optimized**: Complete meta tags and Open Graph support
- **🎭 Custom Theme**: Beautiful color palette with gradient text effects
- **📊 Mock API**: Realistic data simulation with loading states
- **🌍 Internationalization**: Complete Chinese/English language support with elegant switcher
- **💾 Language Persistence**: User language preference automatically saved

## 🛠️ Tech Stack

- **Frontend**: React 18, Material-UI 5
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Styling**: Material-UI Theme System
- **Icons**: Material-UI Icons
- **Internationalization**: React i18next, i18next
- **Language Detection**: Browser language detection

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:3000`

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx      # Navigation component
│   └── Footer.jsx      # Footer component
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About page
│   ├── Experience.jsx  # Work experience
│   ├── Projects.jsx    # Projects showcase
│   └── Contact.jsx     # Contact form
├── services/           # API services
│   ├── api.js         # API service functions
│   └── mockData.js    # Mock data
├── theme/             # Material-UI theme
│   └── theme.js       # Theme configuration
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## 🎨 Customization

### Theme Colors
Edit `src/theme/theme.js` to customize the color scheme:

```javascript
primary: {
  main: '#64ffda',  // Teal accent color
},
background: {
  default: '#0a192f',  // Dark navy background
  paper: '#112240',    // Lighter navy for cards
},
```

### Content
Update the mock data in `src/services/mockData.js` to customize:
- Personal information
- About section content
- Work experience
- Projects
- Contact information

### Styling
The project uses Material-UI's theme system. You can customize:
- Typography scales
- Spacing
- Breakpoints
- Component styles

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: > 900px

## 🌟 Key Features

### Navigation
- Fixed header with smooth scrolling
- Mobile-friendly hamburger menu
- Active page highlighting

### Animations
- Smooth page transitions
- Staggered content animations
- Hover effects on interactive elements

### Contact Form
- Form validation
- Loading states
- Success/error feedback
- Mock form submission

## 🚀 Deployment

This project can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Import your project for seamless deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Contact

Bo Wangle - bo.wangle@example.com

Project Link: [https://github.com/yourusername/resume](https://github.com/yourusername/resume)
