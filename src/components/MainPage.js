import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import Table1 from "./Table1";

export default function MainPage() {
  const [detail, setDetail] = useState([]);
  let url =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

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

  return (
    <>
      {console.log(detail)}

      <Table1 detail={detail} setDetail={setDetail} />
    </>
  );
}
