import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Stack,
  CircularProgress,
  Button,
} from '@mui/material'
import { motion } from 'framer-motion'
import GitHubIcon from '@mui/icons-material/GitHub'
import LaunchIcon from '@mui/icons-material/Launch'
import { getProjects } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { useTranslation } from 'react-i18next'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <LoadingSpinner message={t('projects.loading')} />
  }

  const displayedProjects = showAll ? projects : projects.slice(0, 4)

  return (
    <Box sx={{ minHeight: '100vh', pt: 12, pb: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                mb: 6,
                fontSize: { xs: '1.8rem', md: '2rem' },
                fontWeight: 700,
                '&::after': {
                  content: '""',
                  display: 'block',
                  height: '1px',
                  width: { xs: '100px', md: '300px' },
                  backgroundColor: 'text.secondary',
                  ml: 3,
                },
              }}
            >
              {t('projects.title')}
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {displayedProjects.map((project, index) => (
            <Grid item xs={12} md={6} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'background.paper',
                    borderRadius: '5px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 20px 40px -15px rgba(2, 12, 27, 0.7)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://picsum.photos/800/600?random=${project.id}`}
                      alt={project.title}
                      sx={{
                        transition: 'all 0.3s ease',
                        filter: 'grayscale(100%) contrast(1)',
                        '&:hover': {
                          filter: 'grayscale(0%) contrast(1)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(100, 255, 218, 0.1)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontSize: '0.9rem',
                          fontFamily: '"SF Mono", monospace',
                          mb: 1,
                        }}
                      >
                        {project.featured ? t('projects.featuredProject') : t('projects.project')}
                      </Typography>
                      
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 600,
                          mb: 2,
                          color: 'text.primary',
                        }}
                      >
                        {project.title}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        mb: 3,
                        flexGrow: 1,
                      }}
                    >
                      {project.description}
                    </Typography>

                    <Stack spacing={2}>
                      <Box>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {project.technologies.map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              size="small"
                              variant="outlined"
                              sx={{
                                color: 'text.secondary',
                                borderColor: 'text.secondary',
                                fontSize: '0.75rem',
                                fontFamily: '"SF Mono", monospace',
                                '&:hover': {
                                  color: 'primary.main',
                                  borderColor: 'primary.main',
                                },
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {project.github && (
                          <IconButton
                            component="a"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'text.primary',
                              '&:hover': {
                                color: 'primary.main',
                                transform: 'translateY(-2px)',
                              },
                            }}
                          >
                            <GitHubIcon />
                          </IconButton>
                        )}
                        
                        {project.external && (
                          <IconButton
                            component="a"
                            href={project.external}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: 'text.primary',
                              '&:hover': {
                                color: 'primary.main',
                                transform: 'translateY(-2px)',
                              },
                            }}
                          >
                            <LaunchIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {projects.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setShowAll(!showAll)}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  fontFamily: '"SF Mono", monospace',
                }}
              >
                {showAll ? t('projects.showLess') : t('projects.showMore')}
              </Button>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  )
}

export default Projects
