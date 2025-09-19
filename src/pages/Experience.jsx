import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { getExperiences } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperiences()
        setExperiences(data)
      } catch (error) {
        console.error('Error fetching experience data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  if (loading) {
    return <LoadingSpinner message={t('experience.loading')} />
  }

  const selectedExperience = experiences[selectedTab]

  return (
    <Box sx={{ minHeight: '100vh', pt: { xs: 10, md: 12 }, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                mb: { xs: 4, md: 6 },
                fontSize: { xs: '1.8rem', md: '2.5rem' },
                fontWeight: 700,
                color: 'text.primary',
                '&::after': {
                  content: '""',
                  display: 'block',
                  height: '2px',
                  width: { xs: '80px', md: '250px' },
                  backgroundColor: 'primary.main',
                  ml: { xs: 2, md: 3 },
                  opacity: 0.7,
                },
              }}
            >
              {t('experience.title')}
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 3, md: 6 },
            mt: { xs: 2, md: 4 },
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs
              orientation={isMobile ? 'horizontal' : 'vertical'}
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons={isMobile ? 'auto' : false}
              value={selectedTab}
              onChange={handleTabChange}
              sx={{
                minWidth: { xs: 'auto', md: '240px' },
                maxWidth: { xs: '100%', md: '240px' },
                '& .MuiTabs-flexContainer': {
                  borderLeft: isMobile ? 'none' : '3px solid',
                  borderBottom: isMobile ? '3px solid' : 'none',
                  borderColor: 'divider',
                },
                '& .MuiTab-root': {
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  px: { xs: 2, md: 3 },
                  py: { xs: 1.5, md: 2 },
                  minHeight: 'auto',
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  fontWeight: 500,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  borderLeft: isMobile ? 'none' : '3px solid transparent',
                  borderBottom: isMobile ? '3px solid transparent' : 'none',
                  transition: 'all 0.3s ease',
                  '&.Mui-selected': {
                    borderLeftColor: isMobile ? 'transparent' : 'primary.main',
                    borderBottomColor: isMobile ? 'primary.main' : 'transparent',
                    backgroundColor: 'rgba(100, 255, 218, 0.08)',
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(100, 255, 218, 0.05)',
                    color: 'primary.main',
                  },
                },
                '& .MuiTabs-indicator': {
                  display: 'none',
                },
              }}
            >
              {experiences.map((exp, index) => (
                <Tab
                  key={exp.id}
                  label={exp.company}
                  sx={{
                    justifyContent: 'flex-start',
                  }}
                />
              ))}
            </Tabs>
          </motion.div>

          <Box sx={{ 
            flex: 1, 
            minHeight: { xs: '350px', md: '450px' },
            pl: { xs: 0, md: 2 }
          }}>
            <AnimatePresence mode="wait">
              {selectedExperience && (
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    sx={{
                      backgroundColor: 'transparent',
                      boxShadow: 'none',
                      border: 'none',
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2, md: 3 }, pt: 0 }}>
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: '1.3rem', md: '1.6rem' },
                          fontWeight: 600,
                          mb: { xs: 1, md: 1.5 },
                          color: 'text.primary',
                          lineHeight: 1.3,
                        }}
                      >
                        {selectedExperience.position}{' '}
                        <Box
                          component="span"
                          sx={{
                            color: 'primary.main',
                            fontSize: { xs: '1.3rem', md: '1.6rem' },
                            display: { xs: 'block', sm: 'inline' },
                            mt: { xs: 0.5, sm: 0 },
                          }}
                        >
                          @{' '}
                          <Link
                            href={selectedExperience.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'primary.main',
                              textDecoration: 'none',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                textDecoration: 'underline',
                                opacity: 0.8,
                              },
                            }}
                          >
                            {selectedExperience.company}
                          </Link>
                        </Box>
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          fontFamily: '"SF Mono", "Fira Code", monospace',
                          fontSize: { xs: '0.85rem', md: '0.9rem' },
                          mb: { xs: 2.5, md: 3.5 },
                          fontWeight: 400,
                        }}
                      >
                        {selectedExperience.duration}
                      </Typography>

                      <List sx={{ p: 0 }}>
                        {selectedExperience.responsibilities.map((responsibility, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                          >
                            <ListItem sx={{ 
                              px: 0, 
                              py: { xs: 0.8, md: 1 }, 
                              alignItems: 'flex-start',
                              '&:hover': {
                                '& .MuiListItemIcon-root': {
                                  transform: 'translateX(4px)',
                                },
                              },
                            }}>
                              <ListItemIcon sx={{ 
                                minWidth: { xs: '24px', md: '28px' }, 
                                mt: 0.5,
                                transition: 'transform 0.3s ease',
                              }}>
                                <ArrowRightIcon
                                  sx={{
                                    color: 'primary.main',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemText
                                primary={responsibility}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    color: 'text.secondary',
                                    fontSize: { xs: '0.95rem', md: '1rem' },
                                    lineHeight: { xs: 1.5, md: 1.6 },
                                    fontWeight: 400,
                                  },
                                }}
                              />
                            </ListItem>
                          </motion.div>
                        ))}
                      </List>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Experience
