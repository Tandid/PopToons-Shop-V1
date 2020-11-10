import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
      marginTop: theme.spacing(3),
    },
  }));

  const mainFeaturedPost = {
    title: 'Title of a longer featured blog post',
    description:
      "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://www.bemoregeek.co.uk/content/images/carousels/bmg-web-banners5-9927.jpg',
    imgText: 'main image description',
    linkText: 'Continue reading…',
  };
  
  const featuredPosts = [
    {
      title: 'Featured post',
      date: 'Nov 12',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://cdn10.bigcommerce.com/s-6r10lz/product_images/uploaded_images/pop-dbz-banner.jpg?t=1488346408',
      imageText: 'Image Text',
    },
    {
      title: 'Post title',
      date: 'Nov 11',
      description:
        'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'https://www.tierragamer.com/wp-content/uploads/2020/09/Dragon-Ball-Z-Nuevos-Funko-Pop-01.jpg',
      imageText: 'Image Text',
    },
  ];

const HomePage = () => {

    const classes = useStyles();

        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
              <main>
                <MainFeaturedPost post={mainFeaturedPost} />
                <Grid container spacing={4}>
                  {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                  ))}
                </Grid>
                <Grid container spacing={5} className={classes.mainGrid}>
                  {/* <Main title="From the firehose" posts={posts} /> */}
                  
                </Grid>
              </main>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!" />
          </React.Fragment>
        )
    
}

export default HomePage