import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Table1 from "./Table1";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Pagination from "./Pagination";

export default function MainPage() {
  const [detail, setDetail] = useState([]);
  const [searchvalue, setSearchvalue] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsPerPage] = useState(10);

  const url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  const Searchfilter = async (searchvalue, detail) => {
    console.log(searchvalue);
    let val = [...detail];
    let newval = await val.filter((s) => {
      return (
        s.name.includes(searchvalue) ||
        s.email.includes(searchvalue) ||
        s.role.includes(searchvalue)
      );
    });
    console.log(newval);
    setSearchresult(newval);
  };

  const performApi = async () => {
    try {
      let res = await axios.get(url);
      setDetail(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    performApi();
  }, []);
  useEffect(() => {
    if (searchvalue == "") {
      performApi();
    } else {
      Searchfilter(searchvalue, detail);
    }
  }, [searchvalue]);

  // Get current rows
  const indexOfLastDetail = currentPage * detailsPerPage;
  const indexOfFirstPost = indexOfLastDetail - detailsPerPage;
  const currentDetail = detail.slice(indexOfFirstPost, indexOfLastDetail);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          onChange={(event) => {
            setSearchvalue(event.target.value);
          }}
        />
      </Box>
      {searchvalue == "" ? (
        <Table1
          detail={detail.slice(indexOfFirstPost, indexOfLastDetail)}
          setDetail={setDetail}
        />
      ) : (
        <Table1
          detail={searchresult.slice(indexOfFirstPost, indexOfLastDetail)}
          setDetail={setSearchresult}
        />
      )}
      {searchvalue == "" ? (
        <Pagination
          detailsPerPage={detailsPerPage}
          totalDetails={detail.length}
          paginate={paginate}
        />
      ) : (
        <Pagination
          detailsPerPage={detailsPerPage}
          totalDetails={searchresult.length}
          paginate={paginate}
        />
      )}
    </>
  );
}
