import React from "react";
import { Box, Container, Typography, Card, CardContent, Divider } from "@mui/material";

function About() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            bgcolor: "black",
            color: "white",
            border: "1px solid white",
            borderRadius: 4,
            boxShadow: "0px 0px 15px rgba(255,255,255,0.2)",
          }}
        >
          <CardContent>
            <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
              About This Website
            </Typography>

            <Divider sx={{ bgcolor: "white", mb: 3 }} />

            <Typography variant="body1" paragraph>
              This project is built using the <strong>TheMoviesDB API</strong> to showcase 
              detailed information about movies — including cast, ratings, genres, and more.
            </Typography>

            <Typography variant="body1" paragraph>
              As part of this project, I also implemented a <strong>ticket booking feature</strong>.  
              Please note that this feature is <u>for demonstration purposes only</u> and does not 
              provide real ticket booking. It is included to highlight my ability to design and 
              implement such functionality in a real-world application.
            </Typography>

            <Typography variant="body1" paragraph>
              The design follows a <strong>black and white theme</strong> to keep the interface 
              clean and cinematic, ensuring the focus remains on the movies themselves.
            </Typography>

            <Typography variant="h6" mt={4} align="center" fontStyle="italic">
              🎬 A showcase project built with React & MUI — explore movies like never before!
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default About;
