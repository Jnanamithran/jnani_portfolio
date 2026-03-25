# JN4N1 Portfolio

A modern, responsive personal portfolio website built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, minimalist design with smooth animations and transitions
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: Custom cursor, scroll progress indicator, and animated sections
- **Dark/Light Theme**: Built-in theme switching functionality
- **Project Showcase**: Dedicated section for displaying projects and case studies
- **Blog Section**: Integrated blog with markdown support
- **Contact Form**: Functional contact form with EmailJS integration

## 🛠 Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PostCSS**: For CSS processing
- **ESLint**: For code linting
- **EmailJS**: For contact form functionality

## 📁 Project Structure

```
jn4n1_portfolio/
├── public/                 # Static assets
│   ├── favicon.svg        # Website favicon
│   ├── icons1.svg         # Logo assets
│   ├── icons2.svg         # Icon assets
│   └── profile.jpg        # Profile image
├── src/                   # Source code
│   ├── components/        # Reusable components
│   │   ├── BlogCard.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   └── ScrollProgress.jsx
│   ├── pages/            # Page components
│   │   ├── BlogPost.jsx
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── sections/         # Section components
│   │   ├── About.jsx
│   │   ├── Blogs.jsx
│   │   ├── Contact.jsx
│   │   ├── Hero.jsx
│   │   └── Projects.jsx
│   ├── services/         # API services
│   │   └── contact.js
│   ├── utils/            # Utility functions
│   │   ├── projects.js
│   │   ├── ThemeContext.jsx
│   │   └── useReveal.js
│   ├── blogs/            # Blog content (markdown)
│   │   ├── index.js
│   │   ├── project-sovereign-wedding.md
│   │   ├── project-sovereign-woodcraft.md
│   │   ├── project-viper-autonomous-ndt.md
│   │   └── toothsavvy-dental-clinic.md
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── eslint.config.js      # ESLint configuration
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jn4n1_portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features Overview

### 🌙 Theme Switching
The portfolio includes a built-in dark/light theme toggle that persists user preferences.

### 📱 Responsive Design
Fully responsive design that adapts to all screen sizes, from mobile phones to large desktop monitors.

### 🎯 Interactive Elements
- **Custom Cursor**: Enhanced cursor experience with hover effects
- **Scroll Progress**: Visual indicator showing scroll progress
- **Smooth Animations**: Framer Motion powered animations for smooth transitions

### 📝 Blog System
Markdown-based blog system with automatic parsing and display of blog posts.

### 📧 Contact Form
Functional contact form integrated with EmailJS for reliable message delivery.

### 🏗️ Project Showcase
Dedicated section for displaying projects with case studies and detailed descriptions.

## 🔧 Configuration

### EmailJS Setup
To enable the contact form, you need to configure EmailJS:
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service and template
3. Update the service ID, template ID, and public key in `src/services/contact.js`

### Theme Customization
Customize the theme colors by modifying the CSS custom properties in `src/index.css`.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please contact the project maintainer.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**