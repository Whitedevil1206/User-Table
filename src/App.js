import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from './components/EnhancedTable';
import makeData from './makeData';

const App = () => {
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

  const [data, setData] = React.useState(React.useMemo(() => makeData(20), []));
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
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
    console.log(data);
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
    </div>
  );
};

export default App;
