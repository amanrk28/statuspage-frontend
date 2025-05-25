# StatusPage Frontend

A modern, real-time status page application built with React, TypeScript, and Vite. This application provides both public status pages for end-users and a protected dashboard for service management and incident tracking.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        StatusPage Frontend                      │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Public Status │  │   Dashboard     │  │   Admin Panel   │  │
│  │   Pages         │  │   (Protected)   │  │   (Protected)   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   React Query   │  │   React Router  │  │   Auth0         │  │
│  │   Data Layer    │  │   Navigation    │  │   Authentication│  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Axios HTTP    │  │   WebSocket     │  │   shadcn/ui     │  │
│  │   Client        │  │   Real-time     │  │   Components    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                         Backend API                             │
│                    (RESTful + WebSocket)                        │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Features

### Public Features
- **Public Status Pages**: Organization-specific status pages accessible via `/status/{orgSlug}`
- **Real-time Updates**: Live status updates via WebSocket connections
- **Service Status Display**: Visual indicators for service health (Operational, Degraded, Partial Outage, Major Outage, Maintenance)
- **Incident Timeline**: Historical incident information and updates

### Protected Dashboard Features
- **Service Management**: Create, update, and monitor services
- **Incident Management**: Create and manage incidents with status updates
- **Real-time Monitoring**: Live dashboard with WebSocket updates
- **Authentication**: Secure access via Auth0 integration

## 🛠️ Technology Stack

### Core Framework
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 6.3.5**: Fast build tool and development server

### State Management & Data Fetching
- **TanStack React Query 5.76.1**: Server state management with caching
- **Axios 1.9.0**: HTTP client for API communication
- **React Query Devtools**: Development debugging tools

### UI/UX Libraries
- **Tailwind CSS 4.1.7**: Utility-first CSS framework
- **shadcn/ui**: High-quality, accessible UI components built on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications
- **next-themes**: Theme management (dark/light mode)

### Routing & Navigation
- **React Router DOM 7.6.0**: Client-side routing

### Authentication
- **Auth0 React 2.3.0**: Authentication and authorization

### Development Tools
- **ESLint**: Code linting and quality
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Vite Plugin React**: React integration for Vite

## 📁 Project Structure

```
src/
├── api/                    # API integration layer
│   ├── index.ts           # Axios configuration
│   ├── services.ts        # Service-related API calls
│   ├── incidents.ts       # Incident-related API calls
│   ├── organization.ts    # Organization API calls
│   └── public-status.ts   # Public status API calls
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── shared/           # Shared/common components
│   ├── services/         # Service-specific components
│   ├── incidents/        # Incident-specific components
│   ├── public-status/    # Public status page components
│   └── home/             # Home page components
├── hooks/                # Custom React hooks
│   ├── useWebsocket.ts   # WebSocket connection hook
│   └── useApiSetup.ts    # API authentication setup
├── pages/                # Page components
│   ├── HomePage.tsx      # Landing/home page
│   ├── PublicStatusPage.tsx # Public status display
│   ├── DashboardLayout.tsx  # Protected dashboard layout
│   ├── ServicesPage.tsx     # Service management
│   └── IncidentsPage.tsx    # Incident management
├── providers/            # React context providers
│   └── auth-provider.tsx # Auth0 authentication provider
├── queries/              # React Query hooks and configurations
├── routes/               # Route definitions and protection
│   ├── index.tsx         # Main router configuration
│   ├── protected-route.tsx # Route protection wrapper
│   ├── service-routes.tsx  # Service-related routes
│   └── incident-routes.tsx # Incident-related routes
├── types/                # TypeScript type definitions
│   ├── services.ts       # Service-related types
│   ├── incidents.ts      # Incident-related types
│   ├── organizations.ts  # Organization types
│   └── public-status.ts  # Public status types
├── utils/                # Utility functions
├── lib/                  # Library configurations
└── core/                 # Core application logic
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

### Build Configuration

The project uses Vite with the following key configurations:

- **Path Aliases**: `@` maps to `src/` directory
- **React Plugin**: Hot module replacement and fast refresh
- **Tailwind CSS**: Integrated via Vite plugin
- **TypeScript**: Strict type checking enabled

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd statuspage-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Development server: `http://localhost:5173`
   - Public status page: `http://localhost:5173/status/{orgSlug}`
   - Protected dashboard: `http://localhost:5173/services` (requires authentication)

## 🔐 Authentication Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Access   │───▶│   Auth0 Login   │───▶│   JWT Token     │
│   Protected     │    │   Redirect      │    │   Storage       │
│   Route         │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Dashboard     │◀───│   API Requests  │◀───│   Token         │
│   Access        │    │   with Auth     │    │   Validation    │
│                 │    │   Headers       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔄 Real-time Features

The application implements real-time updates using WebSockets:

### WebSocket Connection Flow
1. **Connection Establishment**: WebSocket connects to `/ws/{orgId}` endpoint
2. **Message Handling**: Receives JSON messages for status updates
3. **Auto Reconnection**: Handles connection drops and reconnects
4. **Data Synchronization**: Triggers React Query cache invalidation

### Real-time Updates
- Service status changes
- New incident creation
- Incident status updates
- Service health metrics

## 📊 Data Flow Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Action   │───▶│   React Query   │───▶│   API Call      │
│   (Component)   │    │   Mutation      │    │   (Axios)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Update     │◀───│   Cache Update  │◀───│   API Response  │
│   (Re-render)   │    │   (React Query) │    │   (Success/Error│
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   WebSocket     │
                       │   Notification  │
                       │   (Real-time)   │
                       └─────────────────┘
```

## 🎨 UI Components

The application uses shadcn/ui components built on Radix UI primitives:

### Component Categories
- **Layout**: Dialog, Dropdown Menu, Tabs, Tooltip
- **Forms**: Label, Input components via React Hook Form
- **Feedback**: Toast notifications (Sonner), Loading states
- **Navigation**: Avatar, routing components
- **Display**: Cards, badges, status indicators

### Styling Strategy
- **Tailwind CSS**: Utility-first styling approach
- **CSS Variables**: Theme customization and dark mode support
- **Responsive Design**: Mobile-first responsive layouts
- **Accessibility**: WCAG compliant components via Radix UI

## 🧪 Development Scripts

```bash
# Development server with hot reload
npm run dev

# Type checking and production build
npm run build

# Code linting
npm run lint

# Preview production build
npm run preview
```

## 🔍 API Integration

### HTTP Client Configuration
- **Base URL**: Configurable via environment variables
- **Request Interceptors**: Automatic authentication header injection
- **Response Interceptors**: Error handling and token refresh
- **Content Type**: JSON API communication

### API Endpoints Structure
- **GET** `/api/public-status/{orgSlug}` - Public status page data
- **GET** `/api/services` - Service list (protected)
- **POST** `/api/services` - Create service (protected)
- **GET** `/api/incidents` - Incident list (protected)
- **POST** `/api/incidents` - Create incident (protected)

## 🚀 Deployment

### Build Process
```bash
# Install dependencies
npm ci

# Build for production
npm run build

# Output directory: dist/
```

### Environment Setup
1. Configure environment variables for production
2. Set up Auth0 domain and client ID
3. Configure API URL for backend services
4. Deploy static files to CDN/hosting service

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Ensure all components are accessible
- Write tests for critical functionality
- Follow the established project structure


Built with ❤️ using React, TypeScript, and modern web technologies.
