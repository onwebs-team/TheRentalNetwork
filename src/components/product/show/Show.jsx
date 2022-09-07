import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Moment from 'react-moment';
import "./Show.css"
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

function Show(props) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [avgReview ,setAvgReview] = useState(0)

  const getProduct = async () => {
    const product = await axios.get(`http://localhost:4000/product/${id}`);
    setProduct(product.data);
    getAvgReview(product.data.owner._id)
  };

  const getAvgReview =async (userId)=>{
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:4000/review/average/" + userId )
    .then(res => setAvgReview(res.data))
    .catch(err => console.log(err))    
}

  useEffect(() => {
    const fetch = async () => {
      await getProduct();
    }
    fetch();
  }, []);

  if (product === undefined) return <p>Not product found.</p>;

  return (
    <Container className='product-detail'>
      <Carousel className="show-images">
        {product.images.map((img, index) => (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img} 
              key={index}
              alt="product_image"
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="product-info">
        <div>
          <div className="show-name"><h1>{product.name}</h1></div>
          <div><Moment interval={1000} fromNow>{product.date}</Moment></div>
        </div>
        <div className="show-price-owner">
          <div><Link className="Nav-Link show-profile-link" to={`/profile/${product.owner._id}`}>{product.owner.name}</Link>({avgReview}<i class="fa-solid fa-star"></i>)</div>
          <h2>{product.price}₪</h2>
        </div>
        <div className="description-div">
          <h4>Desciption</h4>
          <div>{product.description}</div>
        </div>
        {/* <h2>{product.category}</h2> */}
        {/* <h2>{product.date}</h2> */}
        <div className="Button-Div"><Link to={`/product/${product._id}/rent`}><button className="Button">Rent</button></Link></div>
      </div>
    </Container>
  );
}

export default Show;
