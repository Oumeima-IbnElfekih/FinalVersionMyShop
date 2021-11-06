import React from "react";
import styled from "styled-components";
import products from "./products.json";
import Product from "./components/Product";
import {useApi} from './hooks/useApi';
import { queryApi } from "./utils/queryApi";
export default function Products(props) {
    const [products, err,reload] = useApi("products");
    console.log(products);
    const deleteProduct = async (id) => { 
        console.log(id)
        const [err] = await queryApi("product/" + id, {}, "DELETE"); 
        if (err) { 
        console.log(err); 
        } else await reload(); 
        }; 
    return (
        <>
         <Footer>
        <Button onClick={() => props.history.replace("/add")}>
        Add new product
      </Button>
        </Footer>
        <ProductsWrapper> 
       
        {
            err && <Errors>{err}</Errors>
        }
            {
            products?.map((product, index) => (
                <Product {...props} product={product}
                deleteProduct={deleteProduct}
                    key={index}></Product>
            ))
        } </ProductsWrapper>
        </>
    );
}
const Errors = styled.p `
 color: red; 
`;

const ProductsWrapper = styled.div `
 text-align: center; 
 display: flex; 
`;
const Footer = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.15rem;
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
