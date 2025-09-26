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
import { getExperiences, getEducation } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState(0) // 0: work, 1: education
  const [loading, setLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [experiencesData, educationData] = await Promise.all([
          getExperiences(),
          getEducation()
        ])
        setExperiences(experiencesData)
        setEducation(educationData)
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

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue)
    setSelectedTab(0) // 重置到第一个项目
  }

  if (loading) {
    return <LoadingSpinner message={t('experience.loading')} />
  }

  const currentData = selectedCategory === 0 ? experiences : education
  const selectedItem = currentData[selectedTab]

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
            
            {/* 分类选择器 */}
            <Box sx={{ mb: 4 }}>
              <Tabs
                value={selectedCategory}
                onChange={handleCategoryChange}
                centered
                sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'primary.main',
                  },
                }}
              >
                <Tab 
                  label={t('experience.workExperience')} 
                  sx={{ 
                    color: selectedCategory === 0 ? 'primary.main' : 'text.secondary',
                    fontWeight: selectedCategory === 0 ? 600 : 400,
                  }}
                />
                <Tab 
                  label={t('experience.education')} 
                  sx={{ 
                    color: selectedCategory === 1 ? 'primary.main' : 'text.secondary',
                    fontWeight: selectedCategory === 1 ? 600 : 400,
                  }}
                />
              </Tabs>
            </Box>
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
              {currentData.map((item, index) => (
                <Tab
                  key={item.id}
                  label={selectedCategory === 0 ? item.company : item.institution}
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
              {selectedItem && (
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
                      {selectedCategory === 0 ? (
                        // 工作经历显示
                        <>
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
                            {selectedItem.position}{' '}
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
                                href={selectedItem.website}
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
                                {selectedItem.company}
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
                            {selectedItem.duration}
                          </Typography>

                          <List sx={{ p: 0 }}>
                            {selectedItem.responsibilities.map((responsibility, index) => (
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
                        </>
                      ) : (
                        // 教育经历显示
                        <>
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
                            {selectedItem.degree}{' '}
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
                                href={selectedItem.website}
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
                                {selectedItem.institution}
                              </Link>
                            </Box>
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontFamily: '"SF Mono", "Fira Code", monospace',
                              fontSize: { xs: '0.85rem', md: '0.9rem' },
                              mb: { xs: 1, md: 1.5 },
                              fontWeight: 400,
                            }}
                          >
                            {selectedItem.duration} • {selectedItem.location} • GPA: {selectedItem.gpa}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: '0.9rem', md: '1rem' },
                              mb: { xs: 2.5, md: 3.5 },
                              fontWeight: 500,
                            }}
                          >
                            {selectedItem.field}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.primary',
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              mb: 2,
                              fontWeight: 600,
                            }}
                          >
                            {t('experience.achievements')}
                          </Typography>

                          <List sx={{ p: 0, mb: 3 }}>
                            {selectedItem.achievements.map((achievement, index) => (
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
                                    primary={achievement.startsWith('- ') ? achievement : `- ${achievement}`}
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

                          <Typography
                            variant="h6"
                            sx={{
                              color: 'text.primary',
                              fontSize: { xs: '1rem', md: '1.1rem' },
                              mb: 2,
                              fontWeight: 600,
                            }}
                          >
                            {t('experience.relevantCoursework')}
                          </Typography>

                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {selectedItem.relevantCoursework.map((course, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 + 0.3 }}
                              >
                                <Box
                                  sx={{
                                    px: 2,
                                    py: 0.5,
                                    backgroundColor: 'rgba(100, 255, 218, 0.1)',
                                    border: '1px solid rgba(100, 255, 218, 0.3)',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    color: 'primary.main',
                                    fontFamily: '"SF Mono", monospace',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      backgroundColor: 'rgba(100, 255, 218, 0.2)',
                                      transform: 'translateY(-2px)',
                                    },
                                  }}
                                >
                                  {course.startsWith('- ') ? course.substring(2) : course}
                                </Box>
                              </motion.div>
                            ))}
                          </Box>
                        </>
                      )}
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
