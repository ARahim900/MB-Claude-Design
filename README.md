# Muscat Bay Operations Management Suite

A comprehensive React dashboard for monitoring and managing utilities and services at Muscat Bay. This application provides real-time insights into electricity consumption, water analysis, STP plant operations, and contractor tracking.

![Muscat Bay OMS Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-06B6D4) ![Recharts](https://img.shields.io/badge/Recharts-2.8.0-8884d8)

## 🚀 Features

### 📊 Electricity System Module
- **Dashboard**: Real-time KPI cards, consumption trends, and interactive charts
- **Performance**: Monthly consumption analysis by category
- **Analytics**: Zone-based consumption breakdown and advanced analytics
- **Unit Details**: Individual unit monitoring with detailed monthly breakdowns

### 💧 Water Analysis (Planned)
- Water quality monitoring
- Usage analytics
- Leak detection alerts

### 🏭 STP Plant (Planned)
- Sewage treatment monitoring
- Performance metrics
- Maintenance scheduling

### 👷 Contractor Tracker (Planned)
- Work order management
- Performance tracking
- Resource allocation

## 🎯 Key Highlights

- **Real Data Integration**: Includes actual electricity consumption data from November 2024 to April 2025
- **Interactive Filtering**: Filter by month, category, and unit type
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **AI Analysis Framework**: Ready for AI-powered consumption analysis integration
- **Modern UI/UX**: Clean, professional interface with smooth animations

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0
- **Charts**: Recharts 2.8.0
- **Icons**: Lucide React 0.263.1
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ARahim900/MB-Claude-Design.git
   cd MB-Claude-Design
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized build in the `build` folder, ready for deployment.

## 📁 Project Structure

```
src/
├── App.js              # Main application component
├── index.js            # Application entry point
├── index.css           # Global styles and Tailwind imports
public/
├── index.html          # HTML template
package.json            # Dependencies and scripts
tailwind.config.js      # Tailwind CSS configuration
postcss.config.js       # PostCSS configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: #4E4456 (Purple-gray)
- **Primary Light**: #7E708A
- **Primary Dark**: #3B3241
- **Chart Colors**: Custom palette for data visualization

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900

## 📊 Data Structure

The application processes electricity consumption data with the following structure:
- **56 Units**: Various facility types (pumping stations, apartments, etc.)
- **6 Months**: November 2024 - April 2025
- **Categories**: 15+ unit categories for detailed analysis
- **Real Metrics**: Actual consumption data in kWh with OMR cost calculations

## 🔧 Configuration

### AI Analysis Integration
To enable AI-powered consumption analysis:
1. Add your Gemini API key in the `handleAiAnalysis` function
2. Uncomment the API integration code
3. The system will provide intelligent insights on consumption patterns

### Custom Styling
Modify `tailwind.config.js` to customize:
- Color schemes
- Font families
- Animation timings
- Responsive breakpoints

## 🚀 Deployment

This application can be deployed to:
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the build folder or connect via Git
- **AWS S3**: Upload the build folder to an S3 bucket with static hosting
- **GitHub Pages**: Use the build folder for GitHub Pages deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Real-time data integration via APIs
- [ ] Advanced AI analytics and predictions
- [ ] Mobile app companion
- [ ] Multi-language support
- [ ] Advanced reporting and export features
- [ ] User role management and permissions
- [ ] Integration with IoT sensors
- [ ] Automated alert system

## 📞 Support

For support, questions, or feature requests, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for Muscat Bay Operations Management**

*Last updated: May 2025*