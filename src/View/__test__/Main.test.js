import Main from "../Main";
import TableView from "../../Component/Table";
import { ChakraProvider } from "@chakra-ui/react";
import { render, fireEvent, screen } from "@testing-library/react";

const Component = () => (
  <ChakraProvider>
    <Main />
  </ChakraProvider>
);


test("It should change input tobe show the value", () => {
  render(<Component />);
  const input = screen.getByPlaceholderText(/Search.../i);
  fireEvent.change(input, { target: { value: "ujang" } });
  expect(input.value).toBe("ujang");
});

test("It should change select value", () => {
  render(<Component />);
  const select = screen.getByTestId(/gender-select/i);
  fireEvent.change(select, { target: { value: "male" } });
  expect(select.value).toBe("male");
});

test("It should reset all search value", () => {
  render(<Component />);
  const button = screen.getByText(/Reset Filter/i);
  fireEvent.change(button);
  const select = screen.getByTestId(/gender-select/i);
  const input = screen.getByPlaceholderText(/Search.../i);

  expect(select.value).toBe("");
  expect(input.value).toBe("");
});
