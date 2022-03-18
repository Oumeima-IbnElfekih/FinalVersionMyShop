import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
import products from "./products.json";
import Product from "./components/Product";
import { useApi } from "./hooks/useApi";
import { queryApi } from "./utils/queryApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts, selectProducts } from "../src/redux/slices/productsSlice";
export default function Products(props) {
  const [products, err] = useSelector(selectProducts);
  const [search, setSearch] = React.useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    }, [dispatch]);
  console.log('products',products);
  const filteredProducts = useMemo(
    () => {
      if(!search) return products;
      return products?.filter((product) => {
           console.log("Filter function is running ...");
           return product.title.toLowerCase().includes(search.toLowerCase());
         })
        },
    [search,products]
  );
  console.log('filtered',filteredProducts)
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  const deleProduct = async (id) => {
    const [res,err] = await queryApi("product/" + id, {}, "DELETE");
    if (err) {
      console.log("err",err);
    } else 
    {dispatch(deleteProduct(id))} 
  
  };
  return (
    <>
      <Footer>
        <Button onClick={() => props.history.replace("/add")}>
          Add new product
        </Button>
      </Footer>
      <Search>
        {/* Search with button form */}
        {/* <FormGroup>
          <FormField
            type="text"
            name="title"
            placeholder="title"
            value={text}
            onChange={handleText}
          ></FormField>
        </FormGroup> */}
        {/* <FormButton onClick={handleSearch}>Search</FormButton> */}
        {/* Search with useMemo form */}

        <FormGroup>
          <FormField
            type="text"
            name="title"
            placeholder="title"
            value={search}
            onChange={handleSearch}
          ></FormField>
        </FormGroup>
      </Search>

      <ProductsWrapper>
       
        {filteredProducts?.map((product, index) => (
          console.log('affichage',product),
          <Product
            {...props}
            product={product}
            deleteProduct={deleProduct}
            key={index}
          ></Product>
        ))}{" "}
      </ProductsWrapper>
    </>
  );
}
const Errors = styled.p`
  color: red;
`;

const ProductsWrapper = styled.div`
  text-align: center;
  display: flex;
`;
const Footer = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.15rem;
  text-align: right !important;
`;
const Search = styled.footer`
  background: transparent;
  grid-area: footer;
  padding: 0.15rem;
  text-align: center !important;
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const FormGroup = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;
const FormField = styled.input`
  color: black;
  padding: 15px;
  outline: 0;
  border-width: 0 0 2px;
  border-color: #ebebeb;
  ::placeholder {
    text-transform: uppercase;
    font-family: "Kiona";
    font-size: large;
    letter-spacing: 0.1rem;
  }
`;
const FormButton = styled.button`
  background: #7b1bf7;
  text-transform: uppercase;
  color: white;
  border-radius: 25px;
  padding: 15px;
  border: 0;
  font-size: large;
  margin: 10px 0;
  font: 200 larger Kiona;
`;