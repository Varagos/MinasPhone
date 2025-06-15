import React from 'react';
import Box from '@mui/material/Box';

const StoreMap: React.FC = () => {
  return (
    <Box sx={{ width: '100%', height: '400px', position: 'relative' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.595389817462!2d23.7223541!3d37.963232399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd3b88b7469f%3A0xd8587d83a0a65c0f!2sMINAS%20PHONE!5e0!3m2!1sel!2sgr!4v1749377870658!5m2!1sel!2sgr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MinasPhone Store Location"
        aria-label="MinasPhone Store Location Map"
      />
    </Box>
  );
};

export default StoreMap;
