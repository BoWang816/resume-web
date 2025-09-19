import React from 'react'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        pt: 8,
        position: 'relative',
      }}
    >
      {/* Animated loading rings */}
      <Box sx={{ position: 'relative', width: 80, height: 80, mb: 3 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: '3px solid transparent',
              borderTop: `3px solid ${i === 0 ? '#00d4aa' : i === 1 ? '#4ffcd2' : '#8b5cf6'}`,
              borderRadius: '50%',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5 - i * 0.2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        
        {/* Center dot */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #00d4aa 0%, #4ffcd2 100%)',
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </Box>

      {/* Loading text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: '1.1rem',
            fontWeight: 500,
            letterSpacing: '0.5px',
          }}
        >
          {message}
        </Typography>
      </motion.div>

      {/* Floating dots */}
      <Box sx={{ position: 'absolute', width: '100%', height: '100%' }}>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              top: `${20 + i * 15}%`,
              left: `${15 + i * 20}%`,
              width: '6px',
              height: '6px',
              background: '#00d4aa',
              borderRadius: '50%',
              opacity: 0.3,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

export default LoadingSpinner
