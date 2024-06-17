import { Container, Paper, Typography } from "@mui/material";

export default function Resume () {
    return (
        <div style={{
            // border: '1px solid green', 
            display: 'flex',
            width:'1000px', 
            justifyContent: 'center', 
            alignItems: 'center',
            marginLeft:'100px',
            backgroundColor: "#f3f7f7",
            // height: '100%' // Ensure it takes full height
        }}>
            <Container sx={{
               
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                // height: '100%' // Ensure it takes full height
            }}>
                <Paper elevation={3} sx={{bgcolor:'white', height:'99vh', width:'600px', display:'flex', justifyContent:'center', alignItems:'center'}}>

                <Typography>Resume Contents</Typography>
                </Paper>
            </Container>
        </div>
    )
}
