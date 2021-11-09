import React, { useMemo } from "react";
import styled from "styled-components";
import products from "./products.json";
import Product from "./components/Product";
import { useApi } from "./hooks/useApi";
import { queryApi } from "./utils/queryApi";
export default function Products(props) {
  const [products, err, reload] = useApi("products");
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");
  //Exemple 1
  // const filteredProducts = products?.filter((product) => {
  //   return search ? product.title.toLowerCase().includes(search.toLowerCase()):products;
  // });

  //Exemple Use Memor
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
  // const handleText = (event) => {
  //   setSearch(event.target.value);
  // };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  const deleteProduct = async (id) => {
    console.log(id);
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
        {err && <Errors>{err}</Errors>}
        {filteredProducts?.map((product, index) => (
          <Product
            {...props}
            product={product}
            deleteProduct={deleteProduct}
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
