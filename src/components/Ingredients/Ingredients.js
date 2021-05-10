import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     'https://react-hooks-demo-ef09e-default-rtdb.firebaseio.com/ingredients.json'
  //   )
  //     .then((resp) => resp.json())
  //     .then((respData) => {
  //       const loadedIngredients = [];
  //       for (const key in respData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: respData[key].title,
  //           amount: respData[key].amount,
  //         });
  //       }

  //       setIngredients(loadedIngredients);
  //     });
  // }, []);

  const addIngredientHandler = (newIngredient) => {
    fetch(
      'https://react-hooks-demo-ef09e-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(newIngredient),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((resp) => {
        return resp.json();
      })
      .then((respData) => {
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: respData.name, ...newIngredient },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    fetch(
      `https://react-hooks-demo-ef09e-default-rtdb.firebaseio.com/ingredients/${ingredientId}.json`,
      {
        method: 'DELETE',
      }
    ).then((resp) => {
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
      );
    });
  };

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
  }, []);

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
