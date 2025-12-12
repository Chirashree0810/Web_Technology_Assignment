# Web Technology Assignment 🚀

A collection of modern web development projects showcasing HTML5, CSS3, JavaScript, jQuery, PHP, and responsive design principles.


[![HTML5](https://img.shields.io/badge/HTML5-%23E34F26.svg?logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E.svg?logo=javascript&logoColor=black)](#)
[![PHP](https://img.shields.io/badge/PHP-%23777BB4.svg?logo=php&logoColor=white)](#)

## 📋 Table of Contents

- [Projects Overview](#projects-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Details](#project-details)
- [Screenshots](#screenshots)
- [Author](#author)

## 🎯 Projects Overview

This repository contains two complete web applications:

### 1. 📝 Registration Form Application
A modern online registration/application form system with real-time validation and beautiful UI.

**Location:** `/Registration`

**Features:**
- ✨ Beautiful gradient design with modern aesthetics
- ✅ Comprehensive client-side and server-side validation
- 🔄 AJAX submission without page reload
- 📊 Formatted data display on successful submission
- 🔒 Security features (XSS prevention, input sanitization)
- 📱 Fully responsive design

**Tech Stack:** HTML5, CSS3, JavaScript, jQuery, PHP

---

### 2. 💼 Professional Resume Website
A modern, multi-page portfolio website featuring resume and bio-data pages with premium design and animations.

**Location:** `/Resume`

**Features:**
- 🎨 Premium dark theme with glassmorphism effects
- ✨ Smooth animations and transitions
- 📄 Three pages: Home, Resume, and Bio-data
- 🎯 Interactive elements with jQuery
- 📱 Mobile-responsive design
- 🔍 SEO optimized

**Tech Stack:** HTML5, CSS3, JavaScript, jQuery

## ✨ Features

### Registration Form
- **Multi-section Form:**
  - Personal Information (Name, Email, Phone, DOB, Gender, Address)
  - Educational Information (Qualification, Institution, Year, Percentage)
  - Course Selection (Course Type, Batch Timing)
  - Additional Information (Interests, Comments)

- **Validation:**
  - Email format validation
  - Phone number validation (10 digits)
  - Pincode validation (6 digits)
  - Required field checking
  - Real-time feedback with visual indicators

- **Data Processing:**
  - PHP backend with JSON responses
  - Input sanitization and security
  - Optional file logging
  - Success display with formatted sections

### Resume Website
- **Pages:**
  - **Home:** Hero section with animated background
  - **Resume:** Professional timeline, skills, education, certifications
  - **Bio-data:** Personal info, family background, hobbies, interests

- **Interactive Features:**
  - Smooth scroll navigation
  - Animated skill bars
  - Download resume button
  - Copy-to-clipboard for contact info
  - Mobile hamburger menu

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic markup and structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript | Interactivity and DOM manipulation |
| jQuery | AJAX, animations, event handling |
| PHP | Backend processing and validation |
| Git | Version control |

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- PHP 7.4+ (for Registration form)
- Local web server (XAMPP, WAMP, MAMP) or PHP built-in server

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chirashree0810/Web_Technology_Assignment.git
   cd Web_Technology_Assignment
   ```

2. **For Registration Form:**
   ```bash
   cd Registration
   php -S localhost:8000
   # Open http://localhost:8000 in your browser
   ```

3. **For Resume Website:**
   ```bash
   cd Resume
   # Open index.html directly in browser
   # OR use a local server:
   php -S localhost:8001
   # Open http://localhost:8001 in your browser
   ```

## 📂 Project Details

### Registration Form Structure
```
Registration/
├── index.html          # Main registration form
├── styles.css          # Modern CSS with animations
├── script.js           # jQuery validation and AJAX
├── process.php         # PHP backend processing
└── README.md           # Project documentation
```

**How to Use:**
1. Open the form in your browser
2. Fill in all required fields (marked with *)
3. Real-time validation provides immediate feedback
4. Click "Submit Application"
5. View formatted data display on success

### Resume Website Structure
```
Resume/
├── index.html          # Landing page
├── resume.html         # Professional resume
├── bio.html            # Personal bio-data
├── styles.css          # Complete styling system
└── script.js           # Interactive features
```

**Navigation:**
- Home page introduces the portfolio
- Resume page shows professional experience
- Bio-data page displays personal information

## 📸 Screenshots

### Resume Website

![Resume Website Homepage](resume-screenshot.png)

*Premium dark theme with glassmorphism effects*

**Key Highlights:**
- Animated timeline for work experience
- Interactive skill bars
- Responsive across all devices
- Premium visual aesthetics

### Registration Form

![Registration Form](registration-screenshot.png)

*Modern form with gradient background and smooth animations*

**Key Highlights:**
- Clean, professional design
- Intuitive user interface
- Real-time validation feedback
- Success state with formatted data

## 🎨 Design Philosophy

Both projects follow modern web design principles:

- **User Experience:** Intuitive navigation and clear feedback
- **Visual Hierarchy:** Proper use of typography and spacing
- **Responsiveness:** Mobile-first design approach
- **Performance:** Optimized for fast loading and smooth animations
- **Accessibility:** Semantic HTML and ARIA labels
- **Security:** Input validation and sanitization

## 🔒 Security Features

### Registration Form
- Server-side validation
- Input sanitization (trim, stripslashes, htmlspecialchars)
- XSS prevention
- Email format validation
- Pattern matching for phone and pincode
- CSRF protection ready

## 📱 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 🚀 Future Enhancements

### Registration Form
- [ ] Database integration (MySQL/PostgreSQL)
- [ ] Email confirmation system
- [ ] PDF generation of submissions
- [ ] Admin dashboard
- [ ] File upload support
- [ ] Multi-step form wizard
- [ ] CAPTCHA integration

### Resume Website
- [ ] Theme toggle (dark/light mode)
- [ ] Blog section
- [ ] Contact form with backend
- [ ] Project portfolio gallery
- [ ] Testimonials section
- [ ] Analytics integration

## 👨‍💻 Author

**Chirashree**

- GitHub: [@Chirashree0810](https://github.com/Chirashree0810)
- LinkedIn: [chirashree-chamaraj-816515292](https://linkedin.com/in/chirashree-chamaraj-816515292)
- Email: chirashree1008@gmail.com
- Phone: 6364100730
- Address: 2/72 Kadoor Village, Tantrady, Mandarthi 576223

## 🙏 Acknowledgments

- Google Fonts for Inter typography
- jQuery for simplified JavaScript
- Modern CSS techniques and best practices
- Web development community for inspiration

## 📞 Support

If you have any questions or run into issues:

1. Check the individual README files in each project folder
2. Review the code comments for implementation details
3. Open an issue on GitHub
4. Contact via email

## ⭐ Show Your Support

If you found these projects helpful, please consider giving this repository a star!

---

**Made with ❤️ and ☕ by Chirashree**

*Last Updated: December 2025*
