import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";
import "./App.css";

const fixed = ({ values }) => {
  return (
    <>
      {values.map((fixed, idx) => {
        return (
          <span key={idx} Badge className="primary" pill>
            {fixed}
          </span>
        );
      })}
    </>
  );
};

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "crashes",

        columns: [
          {
            Header: "ID",
            accessor: "id"
          },
          {
            Header: "createdAt",
            accessor: "createdAt"
          }
        ]
      },
      {
        Header: "crashes",

        columns: [
          {
            Header: "message",
            accessor: "message"
          },
          {
            Header: "trace",
            accessor: "trace"
          },
          {
            Header: "fixed",
            show: true,
            accessor: "fixed",
            Cell: ({ cell: { value } }) => <fixed values={value} />
          },
          {
            Header: "seen",
            accessor: "seen"
          }
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios(
        "https://604752c8b801a40017ccbe94.mockapi.io/crashes"
      );
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
