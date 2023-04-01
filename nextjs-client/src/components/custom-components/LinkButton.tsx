import Link from 'next/link';
import { Button, ButtonProps } from '@mui/material';
interface CustomButtonProps extends ButtonProps {
  href: string;
}

const LinkButton = ({ href, children, ...rest }: CustomButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button
        {...(rest as any)}
        component="a"
        sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { backgroundColor: 'primary.main' }, ...rest?.sx }}
      >
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
