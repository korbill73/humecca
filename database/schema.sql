-- Database Schema for HUMECCA Website
-- This file defines the structure for the SQLite database

-- Users Table (for Admin access)
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Inquiries Table (Stores Quote Requests)
CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    service_type TEXT NOT NULL, -- 'cloud', 'hosting', 'colocation', 'vpn', 'security', 'web', 'etc'
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'resolved'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT
);

-- Services Table (Dynamic Service Management)
CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT NOT NULL, -- 'server', 'cloud', 'security', etc.
    name TEXT NOT NULL,
    description TEXT,
    price_monthly INTEGER,
    specs_json TEXT, -- JSON string for specifications
    is_active BOOLEAN DEFAULT 1
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    is_important BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial Seed Data for Services
INSERT INTO services (category, name, description, price_monthly) VALUES 
('hosting', 'Economy', 'Xeon E-2224 / 16GB RAM / 256GB NVMe', 55000),
('hosting', 'Business', 'Xeon Silver 4210 / 64GB RAM / 1TB NVMe', 199000),
('hosting', 'Enterprise', 'AMD EPYC 7302 / 128GB RAM / 2TB NVMe', 399000);
