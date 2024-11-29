import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [birthyear, setBirthyear] = useState('');

  const result = useQuery(ALL_AUTHORS);

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>
  }
  
  const authors = result.data.allAuthors;

  const submit = (event) => {
    event.preventDefault();

    updateAuthor({ variables: { name, setBornTo: Number(birthyear) } });

    setName('');
    setBirthyear('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set bithyear</h3>
      <form onSubmit={submit}>
        <div>
          <select 
            value={name ? name : authors[0]}
            onChange={({ target }) => setName(target.value)}
          >
            {authors.map(a => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born <input value={birthyear} onChange={({ target }) => setBirthyear(target.value)} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
