import React, { useMemo } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, remove, selectCart, selectCountAll, selectTotal } from "./redux/slices/cartSlice";
export default function Cart(props) {
  const Total = useSelector(selectTotal);
  const cart = useSelector(selectCart);
  
  const dispatch = useDispatch();
  function TotalPrice(price,q){
    return Number(price * q).toString();
}
const addItemToCart = (p) => {
      
  dispatch(increment(p));
  
  };
  const RemoveItemFromCart = (p) => {
      
    dispatch(decrement(p));
    
    };
    const DeleteItem = (p) => {
      
      dispatch(remove(p));
      
      };
  return (
    <>
    <CardWrapper>
        <CardHeader>
          <CardHeading>Shopping Cart</CardHeading>
        </CardHeader>
        <CardBody>
        <CardFieldset>
        <div className="row">
            <div className="col-md-12">
            <table className="table" >
                <thead>
                    <tr>
                        <th></th>
                        <th  >Name</th>
                        <th  >Image</th>
                        <th >Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody >
                {
                    cart.map((item,key)=>{
                        return(
                            <tr key={key}>    
                           
                            <td> <RemoveCart onClick={()=>DeleteItem(item)}>X</RemoveCart></td>
                            <td>{item.title}</td>
                            
                            <td><img src={
 process.env.REACT_APP_API_URL_UPLOADS + "/" + item.image
 } style={{width:'80px',height:'80px'}}/></td>
                            <td>{item.price} DT</td>
                            <td>
                            <RemoveItem onClick={()=>RemoveItemFromCart(item)} >-</RemoveItem>
                             <span >{item.quantity}</span>
                                    <AddItem onClick={()=>addItemToCart(item)}>+</AddItem>
                                   
                            </td>
                            <td> {TotalPrice(item.price,item.quantity) }</td>
                        </tr>
                        )
                    })
                        
                }
                <tr>
                    <td colSpan="5">Total Carts</td>
                    <td>{Total} DT</td>
                </tr>
                </tbody>
              
            </table>
            </div>
        </div></CardFieldset>
        <CardFieldset>
            <CardButton type="button">Checkout</CardButton>
           
          </CardFieldset>
              
</CardBody>
        
        </CardWrapper>
  
      </>
  );
}

export const CardBody = styled.div`
  padding-right: 32px;
  padding-left: 32px;
`;
export const CardFieldset = styled.fieldset`
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;

  & + & {
    margin-top: 24px;
  }

  &:nth-last-of-type(2) {
    margin-top: 32px;
  }

  &:last-of-type {
    text-align: center;
  }
`;
export const CardWrapper = styled.div`
  overflow: hidden;
  padding: 0 0 32px;
  margin: 48px auto 0;
  width: 900px;
  font-family: Quicksand, arial, sans-serif;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05), 0 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
`;

export const CardHeader = styled.header`
  padding-top: 32px;
  padding-bottom: 32px;
`;

export const CardHeading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;
export const CardButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px 0;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background-color: #e5195f;
  border: 0;
  border-radius: 35px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);

  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;
const AddItem = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "green" : "white"};
  color: ${props => props.primary ? "white" : "green"};
  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid green;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;
const RemoveItem = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "red" : "white"};
  color: ${props => props.primary ? "white" : "red"};
  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid red;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

const RemoveCart = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "red" : "white"};
  color: ${props => props.primary ? "white" : "red"};
  font-size: 1.1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid red;
  border-radius: 10px;
  cursor: pointer;
  
`;