import React, { useEffect, useState } from "react";
import styled from "styled-components";
export default function Product(props) {

  const [product, setProduct] = useState(props.product);
  const [updated, setUpdated] = useState(0);
  useEffect(() => {
    console.log(props)
    console.log(
      "I have finished rendering " +
        props.product.title +
        " price: " +
        props.product.price
    );
    return () => {
      console.log("I'm being destroyed");
    };
  });
  const addLike = () => {
    setProduct({
      ...product,
      likes: Number(product.likes) + 1,
    });
    setUpdated((u) => u + 1);
  };
  useEffect(() => {
    console.log(updated);
  }, [updated]);
  return (
    product.likes >= 5 ? (
<ProductFrameBest>
      <ProductImageWrapperBest>
        <ProductImageBest src={
 process.env.REACT_APP_API_URL_UPLOADS + "/" + product.image
 }
></ProductImageBest>
      </ProductImageWrapperBest>
      <ProductInfoWrapperBest>
      <span>Best Product</span>
        <span>
          <a href={"/product/" + product._id}>{product.title}</a>
        </span>
        <span> {product.price} </span>
        <span>Likes : {product.likes} </span>
        <Button onClick={addLike}>Like</Button>
        <Action>
        <ButtonUpdate onClick={() => props.history.replace("/update/" + product._id)}>
        Update
      </ButtonUpdate>
        <ButtonDelete onClick={() => props.deleteProduct(product._id)}>
        Delete
      </ButtonDelete>
      
        </Action>
      </ProductInfoWrapperBest>
    </ProductFrameBest>
    ):(
    <ProductFrame>
      <ProductImageWrapper>
        <ProductImage src={
 process.env.REACT_APP_API_URL_UPLOADS + "/" + product.image
 }></ProductImage>
      </ProductImageWrapper>
      <ProductInfoWrapper>
        <span>
          <a href={"/product/" + product._id}>{product.title}</a>
        </span>
        <span> {product.price} </span>
        <span>Likes : {product.likes} </span>
        <Button onClick={addLike}>Like</Button>
        <Action>
        <ButtonUpdate onClick={() => props.history.replace("/update/" + product._id)}>
        Update
      </ButtonUpdate>
        <ButtonDelete onClick={() => props.deleteProduct(product._id)}>
        Delete
      </ButtonDelete>
      
        </Action>
       
      </ProductInfoWrapper>
    </ProductFrame>
    )
    
  );
}

const ProductFrame = styled.div`
  border-radius: 25px;
  min-height: 200px;
  min-width: 200px;
  background-color: rgb(110, 110, 110, 0.7);
  margin: 10px;
  display: flex;
  flex-direction: column;
 
`;
const ProductImageWrapper = styled.div`
  margin: 5px;
  max-width: 200px;
`;
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
const ProductInfoWrapper = styled.div`
  margin-top: auto;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  & > span {
    text-align: center;
  }
`;
const ProductFrameBest = styled.div`
  border-radius: 25px;
  min-height: 200px;
  min-width: 200px;
  background-color: #DB7093;
  margin: 10px;
  display: flex;
  flex-direction: column;
  animation:  clignote 2s linear infinite;
  @keyframes clignote {  
  50% { opacity: 0.5; }
}
`;
const ProductImageWrapperBest = styled.div`
  margin: 5px;
  max-width: 200px;
`;
const ProductImageBest = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;
const ProductInfoWrapperBest = styled.div`
  color:white;
  margin-top: auto;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  & > span {
    text-align: center;
  }
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Action = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.25rem;
  text-align: right !important;

`;
const ButtonDelete = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "red" : "white"};
  color: ${props => props.primary ? "white" : "red"};
  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid red;
  border-radius: 3px;
`;
const ButtonUpdate = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "blue" : "white"};
  color: ${props => props.primary ? "white" : "blue"};

  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;