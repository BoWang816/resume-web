import React from 'react'
import { Box, Typography, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ fontSize: '0.9rem' }}
        >
          {t('footer.designedBy')}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
