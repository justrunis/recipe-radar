import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Search, AccountCircle, AddCircle, Explore } from "@mui/icons-material";
import RadarIcon from "@mui/icons-material/Radar";

export default function About({ token }) {
  return (
    <>
      <Header token={token} />
      <Container
        sx={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Card
          sx={{ maxWidth: 600, margin: "auto", marginTop: 4 }}
          className="about-card my-2"
        >
          <CardContent>
            <Typography variant="h4" gutterBottom>
              About Recipe Radar <RadarIcon />
            </Typography>
            <Typography paragraph>
              Recipe Radar is a web application that allows users to search for
              and view recipes. Users can search for recipes based on category,
              difficulty level, and keywords. Additionally, users can create an
              account, log in, and save their favorite recipes. They can also
              contribute by creating and sharing their own recipes, as well as
              exploring recipes created by other users.
            </Typography>
            <Typography variant="h5" gutterBottom>
              Features:
            </Typography>
            <ul style={{ listStyleType: "none" }}>
              <li>
                <Search /> Search functionality based on category, difficulty,
                and keywords
              </li>
              <li>
                <AccountCircle /> User accounts with the ability to save recipes
              </li>
              <li>
                <AddCircle /> Contribute by creating and sharing your own
                recipes
              </li>
              <li>
                <Explore /> Explore a wide variety of recipes created by other
                users
              </li>
            </ul>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
