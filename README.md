# Medical Device Protocol Platform

A modern web application for managing medical device protocols between manufacturers and healthcare facilities.

## Features

### Hospital Staff Dashboard
- **Sidebar Navigation**: Home, Devices, Updates, Tasks, Compliance
- **Search & Notifications**: Top search bar and notification icon with unread indicators
- **Dashboard Cards**: Urgent updates, pending reviews, and completed tasks
- **Device Search**: Search functionality with "Scan Device" button
- **Recent Devices**: Quick access to recently used devices
- **Update Cards**: Protocol updates with urgency levels, deadlines, and "Review Update" buttons
- **Acknowledgement Modal**: Confirm protocol updates with checkboxes

### Manufacturer Dashboard
- **Sidebar Navigation**: Overview, Devices, Protocols, Hospitals, Analytics
- **Summary Cards**: Hospitals reached, acknowledgement rate, active updates, open questions
- **Protocol Updates Table**: Track protocol updates with completion percentages
- **Upload Protocol Form**: Device selection, file upload, urgency, summary, deadline, acknowledgement requirements
- **Publish Update Modal**: Send updates to target hospitals

### Device Detail Page
- **Device Information**: Image, model number, serial number, protocol version, status
- **Tabbed Interface**: Overview, Cleaning, Sterilization, Maintenance, Safety Notices, Documents
- **Recent Activity**: Timeline of device events
- **Document Downloads**: Access to manuals and protocols

### What Changed Page
- **Protocol Comparison**: Side-by-side view of old vs new instructions
- **Change Types**: Added, modified, and removed content with visual indicators
- **Change Reasons**: Context for each protocol change

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Vite** - Build tool

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build
```

### Preview

```bash
# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── NotificationIcon.tsx
│   ├── SearchBar.tsx
│   └── Sidebar.tsx
├── pages/              # Page components
│   ├── Landing.tsx
│   ├── HospitalDashboard.tsx
│   ├── ManufacturerDashboard.tsx
│   ├── DeviceDetail.tsx
│   └── WhatChanged.tsx
├── App.tsx             # Main app with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Navigation

- **Landing Page** (`/`) - Choose between Hospital or Manufacturer dashboard
- **Hospital Dashboard** (`/hospital`) - Hospital staff interface
- **Manufacturer Dashboard** (`/manufacturer`) - Manufacturer interface
- **Device Detail** (`/device/:id`) - Specific device information
- **What Changed** (`/what-changed/:id`) - Protocol comparison view

## Design Principles

- **Clean & Modern**: Professional healthcare-focused design
- **Responsive**: Works on desktop and tablet devices
- **Accessible**: Clear visual hierarchy and readable typography
- **Reusable Components**: Modular component architecture
- **Type Safe**: Full TypeScript implementation

## Future Enhancements

- Backend API integration
- User authentication
- Real-time notifications
- Advanced analytics
- Mobile app version
- Multi-language support
- Audit logging
- Integration with hospital systems
