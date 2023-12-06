import React from 'react';
import { styled } from '@mui/material/styles';

const CustomShapeDividerBottom = styled('div')({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  overflow: 'hidden',
  lineHeight: 0,
  transform: 'rotate(180deg)',
});

// Styled component for the SVG
const ShapeSVG = styled('svg')({
  position: 'relative',
  display: 'block',
  width: 'calc(258% + 1.3px)', // Adjust as necessary
  height: '150px', // Adjust as necessary
});

// Styled component for the path inside the SVG
const ShapeFill = styled('path')({
  fill: '#FFFFFF',
});

const ShapeDivider = () => {
  return (
    <CustomShapeDividerBottom>
      <ShapeSVG
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <ShapeFill d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
      </ShapeSVG>
    </CustomShapeDividerBottom>
  );
};

export default ShapeDivider;
