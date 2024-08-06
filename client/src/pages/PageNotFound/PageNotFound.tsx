import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import illustration from '../../assets/svg/illustration.svg';


export default function NotFoundView() {
const navigate = useNavigate();

  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      {/* <Logo /> */}
    </Box>
  );

const handleGoBack = () =>{
    navigate('/dashboard')
}

  return (
    <>
      {renderHeader}

      <Container>
        <Box
          sx={{
            py: 8,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '80vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>

          <Box
            component="img"
            src={illustration}
            sx={{
              mx: 'auto',
              height: 180,
              my: { xs: 5, sm: 7 },
            }}
          />

          <Button size="large" variant="contained" onClick={handleGoBack}>
            Go to Home
          </Button>

        </Box>
      </Container>
    </>
  );
}
