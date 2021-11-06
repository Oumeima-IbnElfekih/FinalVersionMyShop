import React, { useEffect, useState } from "react";
import styled from "styled-components";
import products from "../products.json";
import { queryApi } from "../utils/queryApi";
import Product from "./Product";
export default function ProductDetails(props) {
  const id = props.match.params.id; /*We used props.match.params.name; 
 This is given by the react-router-dom and will help us get relevant information about our navigation 
 behavior. The router will automatically match the passes prop to the name we assigned in the Route. */
 const [error, setError] = useState({ visible: false, message: "" });
 const [toRender, setToRender] = useState({});

  // const toRender = products.filter((product) => product.title === name)[0];
  useEffect(() => {
    async function fetchData() {
      const [res, err] = await queryApi("product/" + id);
      setError({
        visible: true,
        message: JSON.stringify(err?.errors, null, 2),
      });
      setToRender(res);
    }
    fetchData();
    // eslint-disable-next-line
  }, [id]);
  return (
    <>
      {/* We also have a “history” prop that contains the history of our page navigation */}
     
      <Container>
        {toRender ? (
          <>
         
          <ContentBox>
          
        <Content1><img src={
 process.env.REACT_APP_API_URL_UPLOADS + "/" + toRender.image
 } width="600" height="600" alt={toRender.name}/></Content1>
        <Content2>
        <Footer>
        <Button onClick={() => props.history.replace("/products")}>
        Return to products
      </Button>
        </Footer>
        <H1>{toRender.title}</H1>
        <H3>Description 
        :</H3>
        <Span>{toRender.description}</Span>
        <H3>Price 
        :</H3>
        <Span> {toRender.price} DT </Span>
        <H3>Likes 
        :</H3>
        <Span>{toRender.likes}</Span><br></br>
        <Action>
          
     
        </Action>
       
        </Content2>
        </ContentBox>
        
          </>
          
        ) : (
          <p>Product not found</p>
        )}
      </Container>
    </>
  );
}
const ProductsWrapper = styled.div`
  text-align: center;
  display: flex;
`;
const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-rows: 0.5fr 0.5fr;
  grid-template-areas:
    "content content"
    "footer footer";
  text-align: left;
  grid-gap: 0.25rem;
  transition: all 0.25s ease-in-out;
  @media (max-width: 550px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1.2fr 1fr;
    grid-template-areas:
      "content"
      "footer";
  }
  color: black;
`;
const ContentBox = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.25rem;
  align-items: center;
  grid-area: content;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const Content1 = styled.div`
  background: transparent !important;
  padding: 0.25rem;
  width: 40%;
  height: 100%;
`;
const Content2 = styled.div`
background: transparent !important;
padding: 0.25rem;
width: 60%;
height: 100%;
`;;
const Footer = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.25rem;
  text-align: right !important;

`;
const Action = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.25rem;
  text-align: right !important;

`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;



const H1 = styled.h1`

  font-size: 3.5em;
  font-weight: bold;

`;

const H3 = styled.h3`
  color: palevioletred;
  font-size: 1.25em;
  font-weight: bold;

`;
const Span = styled.span`
  color: grey;
  font-size: 1.25em;

`;
