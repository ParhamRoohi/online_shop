import Image from "next/image";
import { getAllProducts } from "./api/data";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import ProductList from "./UI/home/ProductList";
// import ChangeCartNumber from ".r";

export default async function Home() {
  // const products: Product[] = await getAllProducts();

  return (
    <>
      {/* <ChangeCartNumber /> */}

      <ProductList />
    </>
    // <div className="bg-black flex flex-wrap justify-center items-center gap-4 h-fit">
    //   {products.map((item) => (
    //     <Card sx={{ maxWidth: 345 }} key={item.id}>
    //       <CardActionArea>
    //         <CardMedia component="img" image={item.image} alt={item.title} />
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             {item.title}
    //           </Typography>
    //           <Typography variant="body2" sx={{ color: "text.secondary" }}>
    //             {item.description}
    //           </Typography>
    //         </CardContent>
    //       </CardActionArea>
    //       <CardActions>
    //         <Button size="small" color="primary">
    //           Share
    //         </Button>
    //       </CardActions>
    //     </Card>
    //   ))}
    // </div>
  );
}
