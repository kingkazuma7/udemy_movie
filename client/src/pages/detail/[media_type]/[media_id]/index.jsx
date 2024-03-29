import axios from '@/lib/axios'
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react'

const Detail = ({ detail }) => {
  console.log(detail);
  return (
    <>
      <Box
        sx={{
          height: {xs: "auto", md: "70vh"},
          bgcolor: 'aliceblue',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: 'no-repeat',
            '&::before': {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0, .5)',
            }
          }}
        />
        <Container sx={{ zIndex: 1 }}>
          <Grid sx={{color: "white"}} container alignItems={"center"}>
            <Grid item md={4} sx={{display: "flex", justifyContent: "center"}}>
              <img width={"70%"} src={`https://image.tmdb.org/t/p/original${detail.poster_path}`} alt="" />
            </Grid>
            <Grid item md={8} sx={{bgcolor: 'orange'}}>
              <Typography variant='h4' paragraph>{detail.title}</Typography>
              <Typography paragraph>{detail.overview}</Typography>
              <Typography variant='h6'>公開日:{detail.release_date}</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

// SSR
export async function getServerSideProps(context) {
  const { media_type, media_id} = context.params
  try {
    const jpResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`);
    
    const combineData = {...jpResponse.data}
    if(!jpResponse.data.overview) {
      const enResponse = await axios.get(`https://api.themoviedb.org/3/${media_type}/${media_id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
      combineData.overview = enResponse.data.overview
    }
    
    const fetchData = jpResponse.data;
    return {
      props:{ detail: fetchData }
    }
  } catch (error) {
    return { notFound: true }
  }
}

export default Detail