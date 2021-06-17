const data = React.useMemo(
  () => [
    {
      idx: 1,
      name: 'Bibhash',
      phone: 8539896774,
      email: 'test@gmail.com',
      hobbies: ['cricket', 'fan'],
    },
    {
      idx: 3,
      name: 'BibhashX',
      phone: 8539896774,
      email: 'test1@gmail.com',
      hobbies: ['football', 'reading'],
    },
    {
      idx: 2,
      name: 'BibhashY',
      phone: 8539896774,
      email: 'test2@gmail.com',
      hobbies: ['volleyball', 'binging'],
    },
  ],
  []
);

const columns = React.useMemo(
  () => [
    {
      Header: 'ID',
      accessor: 'id', // accessor is the "key" in the data
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
      Cell: ({ cell: { value } }) => <Genres values={value} />,
    },
  ],
  []
);

const Genres = ({ values }) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((genre, idx) => {
        return (
          <span
            key={idx}
            className="badge"
            style={{
              background: 'lightgreen',
              margin: '3px',
              paddingRight: '5px',
              paddingLeft: '5px',
              borderRadius: '10px',
            }}
          >
            {genre}
          </span>
        );
      })}
    </>
  );
};
