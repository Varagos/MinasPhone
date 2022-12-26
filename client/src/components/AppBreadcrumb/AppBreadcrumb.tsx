import React from 'react';
import { Link, Box, Breadcrumbs, Container, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import useStyles from './styles';
import { useAppSelector } from '../../redux/store';

const breadcrumbNameMap: any = {
  '/category/smartphones': 'Κινητά Τηλέφωνα',
  '/category/tablets': 'Tablets',
  '/category/smartwatches': 'Smartwatches',
  '/category/accessories': 'Αξεσουάρ',
  '/category': 'Τεχνολογία',
  '/products': 'Όλα τα Προιόντα',
  '/drafts': 'Drafts',
};

const isSpecialLastPathName = (lastPathName: string) => {
  const isUuId = lastPathName.length === 36;
  return (
    isUuId ||
    lastPathName.startsWith('prod_') ||
    lastPathName === 'auth' ||
    lastPathName === 'cart' ||
    lastPathName === 'checkout'
  );
};

const LinkRouter = (props: any) => <Link {...props} component={RouterLink} />;

// TODO Handle Products AppBreadcrumb differently by showing their categories
// or make the url keep the category when u click on a product

const AppBreadcrumb = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathNames = location.pathname.split('/').filter((x) => x !== '');
  const currentProductName = useAppSelector((state) => state.product.data?.name);

  if (!pathNames.length) {
    return <> </>;
  }

  const getNameForIdPathNames = (lastPathName: string) => {
    const isUuId = lastPathName.length === 36;
    if (lastPathName.startsWith('prod_') || isUuId) {
      return currentProductName;
    }
    if (lastPathName === 'auth') {
      return 'Σύνδεση';
    }

    if (lastPathName === 'cart') {
      return 'Καλάθι';
    }
    if (lastPathName === 'checkout') {
      return 'Ολοκλήρωση Παραγγελίας';
    }
    return lastPathName;
  };

  const listOfLinks = pathNames.map((value, index) => {
    const isLastPathName = index === pathNames.length - 1;
    const to = `/${pathNames.slice(0, index + 1).join('/')}`;
    // console.log('last', last);
    // console.log('to', to);

    // We don't want a link for the last breadcrumb
    return isLastPathName ? (
      <Typography color="inherit" key={to}>
        {isSpecialLastPathName(value) ? getNameForIdPathNames(value) : breadcrumbNameMap[to]}
      </Typography>
    ) : (
      <LinkRouter color="inherit" to={to} key={to}>
        {breadcrumbNameMap[to]}
      </LinkRouter>
    );
  });

  function capitalizeFirst(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const lastPathName = pathNames[pathNames.length - 1];
  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h6">
          {isSpecialLastPathName(lastPathName) ? getNameForIdPathNames(lastPathName) : capitalizeFirst(lastPathName)}
        </Typography>
        <Box my={2}>
          {lastPathName !== 'checkout' && (
            <Breadcrumbs aria-label="breadcrumb" color="white" style={{ display: 'inline-block' }}>
              <LinkRouter color="inherit" to="/">
                Αρχική
              </LinkRouter>
              {listOfLinks}
            </Breadcrumbs>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AppBreadcrumb;
