import Link from 'next/link';
import Button, { ButtonProps } from '@mui/material/Button';
interface CustomButtonProps extends ButtonProps {
  href: string;
}

const LinkButton = ({ href, children, ...rest }: CustomButtonProps) => {
  return (
    // <Link href={href} passHref style={{ textDecoration: 'none' }}>
    <Button
      {...(rest as any)}
      component="a"
      sx={[
        {
          textDecoration: 'none',
          color: 'inherit',
        },
        rest.sx,
      ]}
      href={href}
      LinkComponent={Link}
    >
      {children}
    </Button>
    // </Link>
  );
};

export default LinkButton;
