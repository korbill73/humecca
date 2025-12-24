# HUMECCA Corporate Website

## Overview

HUMECCA is a Korean IT infrastructure company providing IDC (Internet Data Center), cloud services, VPN, security solutions, and enterprise software. This repository contains a multi-page corporate website built as a static HTML/CSS/JavaScript application with Supabase as the backend database for dynamic content management.

The website features:
- Public-facing service pages for cloud hosting, IDC services, security, and enterprise solutions
- An admin dashboard for content management (notices, FAQs, terms, customer logos, inquiries)
- A cost calculator for hosting/cloud service pricing
- KT Cloud partnership integration

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static HTML Pages**: ~50+ individual HTML pages for different services and subpages
- **Centralized Header/Footer**: Components loaded dynamically via `components/loader.js` to maintain consistency across pages
- **CSS Architecture**: Single `styles.css` file (~4000+ lines) with additional specialized stylesheets (`admin_style.css`, `calculator.css`)
- **SPA-like Navigation**: `cloud-router.js` provides client-side routing for cloud service pages without full page reloads

### Page Structure
- `index.html` - Main landing page with mega menu navigation
- `sub_*.html` - Service subpages (cloud, IDC, security, VPN, solutions)
- `admin.html` - Admin dashboard for content management
- `components/header.html` - Shared navigation header loaded dynamically

### Styling Approach
- Dark navy and red color scheme (brand colors)
- Pretendard/Outfit fonts for typography
- Responsive design with mobile breakpoints at 768px
- CSS custom properties for theming consistency

### JavaScript Components
- `components/loader.js` - Dynamic header/footer loading with enhanced dropdown menu handling
- `cloud-router.js` - SPA router for cloud pages with history API
- `calculator.js` + `calculator_data.js` - Interactive pricing calculator
- `admin_logic_v7.js` - Admin dashboard functionality
- `supabase_config.js` - Database connection configuration

### Admin Dashboard
- Tab-based interface for managing: Products, Notices, FAQs, Terms, Customer Logos, Inquiries, Company History
- Quill.js rich text editor for content creation
- Chart.js for analytics visualization
- Dark theme matching the main site aesthetic

## External Dependencies

### Database
- **Supabase**: PostgreSQL-based backend for dynamic content (admin dashboard)
  - Tables: products, product_plans, notices, faqs, terms, customers, inquiries, company_history
  - Real-time capabilities for admin updates
  - Schema defined in `supabase_schema.sql`

- **PostgreSQL (Replit Built-in)**: Calculator pricing data
  - Tables: calculator_products, calculator_addons, calculator_discounts
  - API endpoint: `/api/calculator/data`
  - Uses `pg` package for database connectivity
  - Automatic fallback to static data (`calculator_data.js`) if DB unavailable

### CDN Libraries
- **Font Awesome 6.4.0**: Icons throughout the site
- **Quill.js 1.3.6**: Rich text editor in admin panel
- **Chart.js**: Analytics charts in admin dashboard
- **Supabase JS SDK v2**: Database client

### Third-Party Integrations
- **KT Cloud**: Partner cloud infrastructure services
- **KakaoTalk**: Customer support chat integration (footer link)

### Fonts
- Google Fonts: Inter, Noto Sans KR
- Pretendard (Korean typography)
- Outfit (UI elements)