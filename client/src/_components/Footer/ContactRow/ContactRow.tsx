import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const ContactRow = ({ icon, header, details }: any) => {
  return (
    <Box py={1}>
      <Box>
        {icon}
        <Box pl={2} style={{ display: 'inline-block' }}>
          <Typography>{header}</Typography>
        </Box>
      </Box>
      <Box borderLeft={1} pl={4}>
        {details}
      </Box>
    </Box>
  );
};

export default ContactRow;
