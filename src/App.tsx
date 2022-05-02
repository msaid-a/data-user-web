import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import Main from "./View/Main/Index";
export const App = () => (
  <ChakraProvider>
    <Main />
  </ChakraProvider>
);
