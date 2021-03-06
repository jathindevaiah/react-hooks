import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [filter, setFilter] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filter === inputRef.current.value) {
        const query =
          filter.length === 0 ? '' : `?orderBy="title"&equalTo="${filter}"`;
        fetch(
          'https://react-hooks-demo-ef09e-default-rtdb.firebaseio.com/ingredients.json' +
            query
        )
          .then((resp) => resp.json())
          .then((respData) => {
            const loadedIngredients = [];
            for (const key in respData) {
              loadedIngredients.push({
                id: key,
                title: respData[key].title,
                amount: respData[key].amount,
              });
            }

            onLoadIngredients(loadedIngredients);
          });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, onLoadIngredients, inputRef]);

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input
            ref={inputRef}
            type='text'
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
