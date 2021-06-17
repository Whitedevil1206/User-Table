import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import EnhancedTable from './components/EnhancedTable';
import { useAlert } from 'react-alert';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const App = () => {
  const getTableData = async () => {
    const response = await fetch(
      'https://table345.herokuapp.com/api/tableData'
    );
    const dataRec = response.status;
    if (dataRec === 404) {
      alert.error('Could not fetch data');
      alert.error('Check your connection');
    } else if (dataRec === 200) {
      alert.success('Data fetched');
    }
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    alert.show('Please wait while we fetch your data');
    getTableData();
  }, []);

  const alert = useAlert();
  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'idx', // accessor is the "key" in the data
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Phone No.',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Hobbies',
        accessor: 'hobbies',
      },
    ],
    []
  );

  const [data, setData] = React.useState(React.useMemo(() => [], []));
  const [skipPageReset, setSkipPageReset] = React.useState(false);
  const count = React.useRef(0);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    count.current++;
    setSkipPageReset(true);
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );

    if (count.current === 1) {
      alert.show('To save changes click Update');
    }
  };

  const handleUpdate = async () => {
    alert.show('Saving data');
    const response = await fetch(
      'https://table345.herokuapp.com/api/tableData',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const dataRec = response.status;
    if (dataRec === 201) {
      alert.success('Data saved');
    }
  };

  return (
    <div>
      <CssBaseline />
      <EnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
      <div className="updateBtn">
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={() => handleUpdate()}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default App;
