# DevInsights Platform

A comprehensive developer analytics and insights platform built with React, Vite, Supabase, and Chart.js. This SaaS-style application provides detailed GitHub repository analytics, team collaboration features, and personalized developer insights.

## Features

### Authentication & User Management
- GitHub OAuth integration for seamless account creation and login
- Automatic user profile creation from GitHub data
- Secure session management with Supabase
- Email confirmation flow for account verification
- Profile management with GitHub username integration

### Dashboard & Analytics
- Repository insights with commits, pull requests, and contributor statistics
- Interactive charts for visualizing repository data
- Language distribution analysis
- Repository activity trends
- Real-time data updates

### Team Collaboration
- Team creation and management
- Repository sharing within teams
- Collaborative insights and analytics
- Team member management

### Achievements System
- Developer achievement tracking
- Milestone-based rewards
- Progress visualization
- Achievement history

### Data Management
- Secure data storage with Supabase
- Row Level Security (RLS) policies
- Data caching for improved performance
- Shareable insights with unique tokens

### User Interface
- Responsive design for all devices
- Modern gradient-based UI
- Intuitive navigation
- Loading states and error handling
- Accessibility considerations

## Technology Stack

### Frontend
- **React 18** - Component-based UI framework
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Chart.js & React-Chartjs-2** - Data visualization

### Backend & Database
- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Database with RLS policies
- **Supabase Auth** - Authentication and authorization

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Babel** - JavaScript transpilation

### APIs
- **GitHub REST API** - Repository data and user information
- **Supabase Client** - Database operations

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── NavBar.jsx      # Navigation component
│   └── ...
├── pages/              # Route components
│   ├── Login.jsx       # Authentication page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── Profile.jsx     # User profile page
│   └── Signup.jsx      # Registration page
├── hooks/              # Custom React hooks
│   └── useAuth.js      # Authentication logic
├── lib/                # Utility libraries
│   ├── supabaseClient.js # Supabase configuration
│   ├── githubApi.js    # GitHub API integration
│   └── ...
├── sql/                # Database schema
│   └── schema.sql      # PostgreSQL schema
└── ...
```

## Database Schema

The application uses the following database tables:

### Users Table
- User authentication and profile data
- GitHub username integration
- Account creation timestamps

### Teams Table
- Team management and collaboration
- Member relationships

### Achievements Table
- Achievement tracking and rewards
- Progress monitoring

### Share Tokens Table
- Secure sharing of insights
- Token-based access control

### Insights Cache Table
- Performance optimization
- Cached repository data

## Local Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager
- GitHub account for OAuth setup

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd devinsights-platform
```

2. Install dependencies:
```bash
npm install
```

3. Environment setup:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

1. Create a new Supabase project at https://supabase.com
2. Run the SQL schema from `src/sql/schema.sql` in the Supabase SQL editor
3. Configure Row Level Security (RLS) policies

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth application
3. Set Authorization callback URL to:
   ```
   https://your-supabase-project.supabase.co/auth/v1/callback
   ```
4. Add Client ID to Supabase Auth settings
5. Add Client Secret to Supabase Auth settings

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run Jest tests

## Testing

The application includes comprehensive testing:

```bash
npm test
```

Tests cover:
- Component rendering
- Authentication flows
- API integration
- Error handling

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. Deploy automatically on push

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables on the server

## API Integration

### GitHub API
- Repository data fetching
- User profile information
- Commit and contributor statistics
- Rate limiting handling (60 requests/hour unauthenticated, 5000 authenticated)

### Supabase Integration
- Real-time data synchronization
- Secure authentication
- Database operations with RLS
- File storage capabilities

## Security Features

- Row Level Security (RLS) on all database tables
- Secure OAuth implementation
- Environment variable protection
- Input validation and sanitization
- HTTPS enforcement in production

## Performance Optimizations

- Data caching for GitHub API responses
- Lazy loading of components
- Optimized bundle size
- Efficient database queries
- CDN-ready asset optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Code Style
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features

## Troubleshooting

### Common Issues

1. **GitHub API Rate Limits**
   - Authenticate users to increase rate limits
   - Implement caching for frequently accessed data

2. **Supabase Connection Issues**
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are configured

3. **OAuth Configuration**
   - Verify callback URLs match exactly
   - Check client ID and secret validity
   - Ensure proper scopes are configured

### Debug Mode

Enable debug logging by setting:
```env
VITE_DEBUG=true
```

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section
- Review the Supabase and GitHub API documentation