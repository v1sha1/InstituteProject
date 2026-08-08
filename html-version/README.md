# Shree Sai Computer Education - HTML/CSS/JS Version

This is the plain HTML/CSS/JavaScript version of the Shree Sai Computer Education website. This version is easier to understand and modify if you're familiar with traditional web development.

## Project Structure

```
html-version/
├── index.html          # Home page
├── about.html          # About Us page
├── courses.html        # Courses page
├── contact.html        # Contact Us page
├── login.html          # Student Login page
├── register.html       # Student Registration page
├── css/
│   └── styles.css      # All CSS styles
├── js/
│   └── script.js       # JavaScript functionality
└── assests/            # Images and assets
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with gradients and shadows
- **Navigation**: Sticky navigation with mobile hamburger menu
- **Forms**: Login and registration forms with validation
- **Contact Form**: Working contact form
- **Google Maps Integration**: Location map with directions
- **Director's Photo**: Director's image on About page

## How to Use

### 1. Open the Website

Simply open `index.html` in your web browser:

```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

Or double-click `index.html` in your file explorer.

### 2. Using with Backend API

The JavaScript in `script.js` is configured to work with the existing backend API running on `http://localhost:5000`.

**Make sure the backend server is running:**

```bash
cd server
node server.js
```

### 3. Customization

#### Change Colors

Edit `css/styles.css` and modify the color variables:

```css
/* Main blue gradient */
background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);

/* Accent color (orange/yellow) */
background: #f59e0b;
```

#### Change Content

Edit the HTML files directly:
- `index.html` - Home page content
- `about.html` - About page content
- `courses.html` - Course information
- `contact.html` - Contact information and map

#### Change Images

Images are located in the `assests/` folder. Update image paths in HTML files:

```html
<img src="assests/your-image.png" alt="Description">
```

## Pages

### Home Page (`index.html`)
- Hero section with call-to-action buttons
- Features section highlighting institute benefits
- Popular courses preview
- Statistics section
- Footer with contact information

### About Page (`about.html`)
- Institute history
- Mission and vision
- Director's message with photo
- Faculty information
- Infrastructure details
- Achievements

### Courses Page (`courses.html`)
- Detailed course information for:
  - DCA (Diploma in Computer Applications)
  - PGDCA (Post Graduate Diploma in Computer Applications)
  - BCA (Bachelor of Computer Applications)
- Course duration, fees, eligibility
- Syllabus and career opportunities

### Contact Page (`contact.html`)
- Contact information
- Contact form
- Google Maps integration
- Working hours

### Login Page (`login.html`)
- Email/Mobile login toggle
- Password visibility toggle
- Remember me option
- Forgot password link

### Register Page (`register.html`)
- Personal information
- Contact details
- Course selection
- Password creation
- Terms and conditions

## Backend Integration

The HTML version connects to the existing Node.js/Express backend:

### API Endpoints Used

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/contact` - Contact form submission

### Admin Credentials

- **Email:** admin@shreesai.com
- **Password:** admin123

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

## Customization Tips

### Add New Pages

1. Create a new HTML file (e.g., `gallery.html`)
2. Copy the navigation and footer from existing pages
3. Add your content
4. Link to it from the navigation menu
5. Add styles to `css/styles.css` if needed

### Modify Navigation

Edit the navigation menu in each HTML file:

```html
<ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="your-page.html">Your Page</a></li>
    <!-- Add more links here -->
</ul>
```

### Add JavaScript Functionality

Edit `js/script.js` and add your functions:

```javascript
// Your custom function
function yourFunction() {
    // Your code here
}

// Call it when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    yourFunction();
});
```

## Troubleshooting

### Images Not Showing

- Make sure image paths are correct
- Check that images exist in the `assests/` folder
- Use relative paths: `assests/image.png`

### Forms Not Submitting

- Ensure backend server is running on port 5000
- Check browser console for errors
- Verify API endpoints are correct in `script.js`

### Mobile Menu Not Working

- Check that `script.js` is loaded
- Verify hamburger menu click event is working
- Check CSS for mobile menu styles

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify backend server is running
3. Ensure all files are in the correct locations

## License

This project is for Shree Sai Computer Education.
