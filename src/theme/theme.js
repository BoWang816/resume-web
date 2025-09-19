import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4aa',
      light: '#4ffcd2',
      dark: '#00a085',
      contrastText: '#0a0e27',
    },
    secondary: {
      main: '#1a1f3a',
      light: '#2d3561',
      dark: '#0f1419',
      contrastText: '#e2e8f0',
    },
    background: {
      default: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      paper: 'rgba(26, 31, 58, 0.8)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    divider: 'rgba(241, 245, 249, 0.08)',
    accent: {
      purple: '#8b5cf6',
      blue: '#3b82f6',
      pink: '#ec4899',
      orange: '#f97316',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      color: '#f1f5f9',
      background: 'linear-gradient(135deg, #00d4aa 0%, #4ffcd2 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#f1f5f9',
      letterSpacing: '-0.01em',
      marginBottom: '1rem',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#f1f5f9',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#f1f5f9',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#00d4aa',
      fontFamily: '"JetBrains Mono", "SF Mono", monospace',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#00d4aa',
      fontFamily: '"JetBrains Mono", "SF Mono", monospace',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      color: '#94a3b8',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#94a3b8',
      fontWeight: 400,
    },
    caption: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#64748b',
      fontFamily: '"JetBrains Mono", "SF Mono", monospace',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          overflowX: 'hidden',
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
          minHeight: '100vh',
        },
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        },
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(26, 31, 58, 0.3)',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(135deg, #00d4aa 0%, #4ffcd2 100%)',
          borderRadius: '4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
          padding: '12px 32px',
          fontSize: '1rem',
          fontWeight: 600,
          fontFamily: '"Inter", sans-serif',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover::before': {
            left: '100%',
          },
        },
        outlined: {
          border: '2px solid #00d4aa',
          color: '#00d4aa',
          background: 'rgba(0, 212, 170, 0.05)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(0, 212, 170, 0.15)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(0, 212, 170, 0.3)',
            borderColor: '#4ffcd2',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00d4aa 0%, #4ffcd2 100%)',
          color: '#0a0e27',
          fontWeight: 700,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 15px 35px rgba(0, 212, 170, 0.4)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 14, 39, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 212, 170, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(26, 31, 58, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(241, 245, 249, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
            borderColor: 'rgba(0, 212, 170, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 212, 170, 0.1)',
          color: '#00d4aa',
          border: '1px solid rgba(0, 212, 170, 0.3)',
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '0.875rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 212, 170, 0.2)',
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0, 212, 170, 0.3)',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: '#94a3b8',
          fontWeight: 500,
          fontSize: '1rem',
          '&.Mui-selected': {
            color: '#00d4aa',
            fontWeight: 600,
          },
          '&:hover': {
            color: '#4ffcd2',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#00d4aa',
          height: '3px',
          borderRadius: '2px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(26, 31, 58, 0.5)',
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.3)',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 212, 170, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d4aa',
              boxShadow: '0 0 0 3px rgba(0, 212, 170, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#94a3b8',
            '&.Mui-focused': {
              color: '#00d4aa',
            },
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

export default theme
