import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { FaArrowsAltV } from "react-icons/fa";

interface iProps {
  columns: any[];
  data: any[];
  page?: number;
  onChangePage?: (page: number) => void;
  onSort?: (sort: string, order?: string) => void;
}

const TableView: React.FC<iProps> = ({
  columns,
  data,
  page,
  onChangePage,
  onSort,
}) => {
  const [order, setOrder] = React.useState("");

  function getString<ObjectType>(object: ObjectType, path: any) {
    const keys = path.split(".");
    let result: any = object;
    for (const key of keys) {
      result = result[key];
    }
    return result;
  }

  const changePage = (page: number) => {
    if (onChangePage) {
      onChangePage(page);
    }
  };

  const handleSort = (sort: string, order?: string) => {
    const orderValue =
      order === "" ? "ascend" : order === "ascend" ? "descend" : "";
    setOrder(orderValue);
    if (onSort) {
      onSort(sort, orderValue);
    }
  };

  return (
    <div>
      <TableContainer mt={20}>
        <Table variant="simple">
          <Thead>
            <Tr>
              {columns.map((val) => (
                <Th>
                  <Flex>
                    <span>{val.header}</span>
                    {val.isSort && (
                      <FaArrowsAltV
                        style={{
                          marginTop: 3,
                          marginLeft: 10,
                          cursor: "pointer",
                        }}
                        onClick={() => handleSort(val.dataIndex, order)}
                      />
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data?.map((val: any) => (
                <Tr>
                  {columns.map((col) => (
                    <Td>{getString(val, col.dataIndex)}</Td>
                  ))}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent={"flex-end"}>
        {data?.map((val: any, index: number) => (
          <Button
            mx={1}
            mt={5}
            colorScheme={page === index + 1 ? "blue" : "teal"}
            onClick={() => changePage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </Flex>
    </div>
  );
};

export default TableView;
