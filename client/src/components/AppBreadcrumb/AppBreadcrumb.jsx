import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import { Link, Container, Box } from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useStyles from "./styles";

const breadcrumbNameMap = {
  "/category/smartphones": "Smartphones",
  "/category/tablets": "Tablets",
  "/category/smartwatches": "Smartwatches",
  "/category/accessories": "Accessories",
  "/category": "Category",
  "/products": "Products",
  "/login": "Login",
  "/signup": "Signup",
  "/drafts": "Drafts",
};

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const AppBreadcrumb = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((x) => x);
  if (!pathNames.length) {
    return <> </>;
  }

  const listOfLinks = pathNames.map((value, index) => {
    const last = index === pathNames.length - 1;
    const to = `/${pathNames.slice(0, index + 1).join("/")}`;

    return last ? (
      <Typography color='inherit' key={to}>
        {breadcrumbNameMap[to]}
      </Typography>
    ) : (
      <LinkRouter color='inherit' to={to} key={to}>
        {breadcrumbNameMap[to]}
      </LinkRouter>
    );
  });

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant='h6'>{capitalizeFirst(pathNames[pathNames.length - 1])}</Typography>
        <Box my={2}>
          <Box mr={2} style={{ display: "inline-block" }}>
            <Typography variant='body2' style={{ display: "inline-block" }}>
              You are here:
            </Typography>
          </Box>
          <Breadcrumbs aria-label='breadcrumb' color='white' style={{ display: "inline-block" }}>
            <LinkRouter color='inherit' to='/'>
              Home
            </LinkRouter>
            {listOfLinks}
          </Breadcrumbs>
        </Box>
      </Container>
    </div>
  );
};

export default AppBreadcrumb;
