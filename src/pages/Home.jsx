import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import style from '../styles/css/Home.module.css';
import FetchContext from '../context/FecthContext';
import Table from './Table';

function Home() {
  const TAGS_IMUTAVEIS = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const { filter, funcFilter } = useContext(FetchContext);

  const [tags, setTags] = useState([]);

  // console.log(filter);
  const [state, setState] = useState(
    { tag: 'population', operator: 'maior que', unit: 0 },
  );

  const [history, setHistory] = useState([]);

  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });
  return (
    <main className={ style.main }>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target: { value } }) => funcFilter('inputText', value) }
      />
      <select
        name=""
        data-testid="column-filter"
        onChange={ ({ target: { value } }) => setState({ ...state, tag: value }) }
        id=""
      >
        {TAGS_IMUTAVEIS.filter((e) => !tags.includes(e)).map((elemento) => (
          <option key={ elemento } value={ elemento }>{elemento}</option>
        ))}
      </select>
      <select
        name=""
        onChange={ ({ target: { value } }) => setState({ ...state, operator: value }) }
        data-testid="comparison-filter"
        id=""
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ state.unit }
        onChange={ ({ target: { value } }) => setState({ ...state, unit: value }) }
      />
      <button
        type="button"
        onClick={ () => {
          funcFilter('completFilter', state);
          setTags([...tags, state.tag]);
          setState({ ...state,
            tag: TAGS_IMUTAVEIS
              .filter((e) => !state.tag.includes(e))[0] });
          setHistory([...history, state]);
        } }
        data-testid="button-filter"
      >
        Filtrar
      </button>
      <select
        name=""
        id=""
        data-testid="column-sort"
        onClick={ ({ target: { value } }) => setOrder({ ...order, column: value }) }
      >
        {TAGS_IMUTAVEIS.map((elemento) => (
          <option key={ elemento } value={ elemento }>{elemento}</option>
        ))}
      </select>
      <label htmlFor="ASC">
        Crescente
        <input
          type="radio"
          name="ordem"
          onClick={ ({ target: { value } }) => setOrder({ ...order, sort: value }) }
          value="ASC"
          data-testid="column-sort-input-asc"
          id="ASC"
        />
      </label>
      <label htmlFor="DESC">
        Decrescente
        <input
          type="radio"
          name="ordem"
          onClick={ ({ target: { value } }) => setOrder({ ...order, sort: value }) }
          value="DESC"
          data-testid="column-sort-input-desc"
          id="DESC"
        />
      </label>
      <button
        data-testid="column-sort-button"
        onClick={ () => {
          funcFilter('ordernar', order);
          setOrder({ column: 'population', sort: 'ASC' });
        } }
        type="button"
      >
        Ordenar
      </button>
      {tags.map((elemento) => (
        <div
          data-testid="filter"
          key={ elemento }
        >
          <button
            type="button"
            onClick={ () => {
              funcFilter(
                'reverter',
                history.filter((e) => !e.tag.includes(elemento)),
              );
              setTags(tags.filter((e) => e !== elemento));
              setHistory(history.filter((e) => e.tag !== elemento));
            } }
          >
            {elemento}
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        type="submit"
        onClick={ () => funcFilter('reset') }
      >
        Remover Filtros
      </button>
      <Table filter={ filter } />
    </main>
  );
}

Home.propTypes = {
  filter: PropTypes.any,
}.isRequired;

export default Home;
