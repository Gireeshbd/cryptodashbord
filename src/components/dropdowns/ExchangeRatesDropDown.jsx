import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setCurrency } from "../../features/currencyDropDownSlice";
import { useGetAllCurrenciesQuery } from "../../features/api/CurrencyApiSlice";

const Container = styled.div`
  height: 10vh;
  width: 25%;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  overflow: scroll;
  font-weight: 700;
  background-color: #e6ecff;
  margin: 1%;
  border: none;
  border-radius: 10px;
  padding: 5px;
`;

const Option = styled.option`
  text-transform: uppercase;
  font-weight: 400;
`;

const ExchangeDropDown = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setCurrency(e.target.value));
  };

  const { data: currencyList, isFetching } = useGetAllCurrenciesQuery();

  return (
    <Container>
      <Select onChange={handleChange}>
        <Option disabled selected hidden>
          Vs_Currency
        </Option>
        {currencyList &&
          currencyList.map((currencyName) => (
            <Option value={currencyName} key={currencyName}>
              {currencyName}
            </Option>
          ))}
      </Select>
    </Container>
  );
};

export default ExchangeDropDown;
