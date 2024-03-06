import {render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils";
import Body from "../Body";
import MOCK_DATA from "../mocks/mockResListData.json";
import { BrowserRouter } from "react-router-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("Should render Body Component with Search", async() => {
  await act(async () => {
    render(
    <BrowserRouter>
     <Body />
    </BrowserRouter>
    );
  });
});