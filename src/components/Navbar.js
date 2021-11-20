import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectCountAll } from "../redux/slices/cartSlice";
import img from "./cart.png"
export default function Header() {
  const CartNumber = useSelector(selectCountAll);
  return (
    <HeaderFrame>
      <ul id="nav">
        <li>
          <a href="/">Welcome</a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
         
          <a href="/cart" > <Img sizes={10} src={img}/> Panier {CartNumber}  </a>

        </li>
      </ul>
    </HeaderFrame>
  );
}
const Img = styled.img`
height: 20px;
width:  20px;
`;
const HeaderFrame = styled.div`
  min-height: 50px;
  min-width: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  & > ul {
    list-style: none;
    display: flex;
    & > li:not(:nth-child(1)) {
      margin-left: 10px;
    }
  }
`;
