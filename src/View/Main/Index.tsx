import React, { useEffect, useState } from "react";
import api from "../../api";
import {
  Box,
  Text,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import TableView from "../../Component/Table";
import moment from "moment";

const Main = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState<string | undefined>("");
  const [searchValue, setSearchValue] = useState("");

  const getData = async (
    pageValue: number,
    sizeValue: number,
    searchValue: string,
    genderValue: string,
    sortValue: string,
    orderValue: string | undefined
  ) => {
    try {
      const data = await api.userApi.getUserData(
        pageValue,
        sizeValue,
        searchValue,
        genderValue,
        sortValue,
        orderValue
      );

      data.results.map((val: any) => {
        val.fullName = `${val.name.title}  ${val.name.first}  ${val.name.last}`;
        val.registered.date = moment(val.registered.date).format('DD-MM-YYYY HH:mm')
      });
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(page, size, search, gender, sort, order);
  }, []);

  const columns = React.useMemo(
    () => [
      {
        header: "Username",
        dataIndex: "login.username",
      },
      {
        header: "Name",
        dataIndex: "fullName",
        isSort: true,
      },
      {
        header: "Email",
        dataIndex: "email",
        isSort: true,
      },
      {
        header: "Gender",
        dataIndex: "gender",
        isSort: true,
      },
      {
        header: "Register Date",
        dataIndex: "registered.date",
        isSort: true,
      },
    ],
    []
  );

  const handleChangePage = (value: number) => {
    setPage(value);
    getData(value, size, search, gender, sort, order);
  };

  const handleSearchName = (e: any) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
      getData(page, size, e.target.value, gender, sort, order);
    }
  };

  const handleChangeGender = (e: any) => {
    setGender(e.target.value);
    getData(page, size, search, e.target.value, sort, order);
  };

  const handleSort = (sort: string, orderValue?: string) => {
    const sortValue = sort.includes("fullName")
      ? "name"
      : sort.includes("registered")
      ? "registered"
      : sort;
    setSort(sortValue);
    setOrder(order);
    getData(page, size, search, gender, sortValue, orderValue);
  };

  const handleResetFilter = () => {
    setOrder("");
    setSort("");
    setSearch("");
    setGender("");
    setSearchValue("");
    getData(page, size, "", "", "", "");
  };

  return (
    <Box px={20} py={10}>
      <Text fontSize="3xl" fontWeight={"bold"}>
        Example With Search and Filter
      </Text>
      <HStack spacing="24px" mt={8}>
        <Box w="250px" h="10">
          <Text>Search</Text>
          <InputGroup size="md" width={"250px"}>
            <Input
              pr="4.5rem"
              placeholder="Search..."
              onKeyPress={(e) => handleSearchName(e)}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm">
                <FaSearch />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box w="250px" h="10">
          <Text>Gender</Text>
          <Select value={gender} onChange={handleChangeGender} data-testid="gender-select">
            <option data-testid="select-option" value="">all</option>
            <option data-testid="select-option" value="male">Male</option>
            <option data-testid="select-option" value="female">Female</option>
          </Select>
        </Box>
        <Box w="180px" h="10">
          <Button mt={6} onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </Box>
      </HStack>
      <TableView
        columns={columns}
        data={data?.results}
        page={page}
        onChangePage={(value) => handleChangePage(value)}
        onSort={(sort, order) => handleSort(sort, order)}
      />
    </Box>
  );
};

export default Main;
