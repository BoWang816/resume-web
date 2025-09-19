import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { motion } from 'framer-motion'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import EmailIcon from '@mui/icons-material/Email'
import { getPersonalInfo, getSocialLinks } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
}

const Home = () => {
  const [personalData, setPersonalData] = useState(null)
  const [socialData, setSocialData] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personal, social] = await Promise.all([
          getPersonalInfo(),
          getSocialLinks()
        ])
        setPersonalData(personal)
        setSocialData(social)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner message={t('home.loading')} />
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 8, md: 0 },
        pb: { xs: 4, md: 0 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(0, 212, 170, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: { xs: 'auto', md: '80vh' },
            maxWidth: '1000px',
            px: { xs: 3, sm: 4 },
            position: 'relative',
            zIndex: 1,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'primary.main',
                fontSize: '1.1rem',
                mb: 3,
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              {t('home.greeting')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '4rem', md: '5rem' },
                fontWeight: 700,
                mb: 1,
                lineHeight: 1.1,
              }}
            >
              {t('home.name')}.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 600,
                mb: 3,
                color: 'text.secondary',
                lineHeight: 1.1,
              }}
            >
              {t('home.subtitle')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Typography
              variant="body1"
              sx={{
                maxWidth: '540px',
                fontSize: '1.1rem',
                mb: 4,
                lineHeight: 1.6,
              }}
            >
              {t('home.description')}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              alignItems={{ xs: 'stretch', sm: 'center' }}
              sx={{ mb: 6 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/contact')}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  minWidth: { xs: 'auto', sm: '220px' },
                  borderRadius: '50px',
                  textTransform: 'none',
                }}
              >
                {t('home.getInTouch')}
              </Button>
              
              <Button
                variant="outlined"
                size="large"
                startIcon={<EmailIcon />}
                href={`mailto:${personalData?.email}`}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  minWidth: { xs: 'auto', sm: '220px' },
                  borderRadius: '50px',
                  textTransform: 'none',
                }}
              >
                {t('home.sayHello')}
              </Button>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
              sx={{ mt: 4 }}
            >
              {socialData.map((social, index) => {
                const IconComponent = socialIcons[social.icon]
                return (
                  <motion.div
                    key={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <IconButton
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'text.primary',
                        fontSize: '1.5rem',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          color: 'primary.main',
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      {IconComponent && <IconComponent fontSize="inherit" />}
                    </IconButton>
                  </motion.div>
                )
              })}
            </Stack>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default Home
