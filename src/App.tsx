import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
const Main = React.lazy(() => import("./View/Main"));

export const App = () => (
  <ChakraProvider>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Main />
    </React.Suspense>
  </ChakraProvider>
);
