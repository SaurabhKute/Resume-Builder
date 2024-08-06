import * as React from 'react';
import { Breadcrumbs, Link, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';


export default function BreadCrumb() {

const navigate = useNavigate();

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  navigate('/');
}

  const breadcrumbs = [
    <Link underline="hover" key="1" color="#0f5cbf" onClick={handleClick} sx={{ fontWeight: 'light', fontSize: '14px', cursor:'pointer' }}>
      Dashboard
    </Link>,
    <Link
      underline="hover"
      color="inherit"
      sx={{ fontWeight: 'light', fontSize: '14px' }}
    >
      Resume Builder
    </Link>
  ];

  return (

    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{ fontSize: '14px', fontWeight: 'light' }}
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>

  );
}
