import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { light } from '@mui/material/styles/createPalette';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadCrumb() {
  const breadcrumbs = [
    <Link underline="hover" key="1"  color="#0f5cbf" href="/" onClick={handleClick} sx={{fontWeight:'light', fontSize:'14px'}}>
     Dashboard
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
      sx={{fontWeight:'light',fontSize:'14px'}}
    >
      Resume Builder
    </Link>
  ];

  return (
   
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{fontSize:'14px', fontWeight:'light'}}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
    
  );
}
