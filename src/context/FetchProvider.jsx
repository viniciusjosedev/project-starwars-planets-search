import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FetchContext from './FecthContext';

function FetchProvider(props) {
  const { children } = props;

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);

  const fetchApi = async () => {
    const requisicao = await (await fetch('https://swapi.dev/api/planets')).json();
    const results = requisicao.results.map((elemento) => {
      delete elemento.residents;
      return elemento;
    });
    setData(results);
    setFilter(results);
  };

  useEffect(() => {
    async function init() {
      await fetchApi();
    }
    init();
  }, []);

  const funcOperation = (filtro, value) => {
    const { tag, operator, unit } = value;
    if (operator === 'menor que') {
      return filtro.filter((elemento) => parseInt(elemento[tag], 10)
        < parseInt(unit, 10));
    } if (operator === 'maior que') {
      return filtro.filter((elemento) => parseInt(elemento[tag], 10)
        > parseInt(unit, 10));
    }
    return filtro.filter((elemento) => parseInt(elemento[tag], 10)
      === parseInt(unit, 10));
  };

  const funcFilter = (type, value) => {
    let filtro = data;
    if (type === 'inputText') {
      filtro = filtro.filter((elemento) => elemento.name.toLowerCase()
        .includes(value.toLowerCase()));
      setFilter(filtro);
    }
    if (type === 'completFilter') {
      filtro = filter;
      setFilter(funcOperation(filtro, value));
    }
    if (type === 'reverter') {
      let retorno = data;
      value.forEach((elemento) => {
        retorno = funcOperation(retorno, elemento);
      });
      setFilter(retorno);
    } if (type === 'reset') setFilter(data);
    if (type === 'ordernar') {
      filtro = filter;
      const { column, sort } = value;

      if (sort === 'ASC') {
        const separeteUnknow = filtro
          .filter((elemento) => elemento[column] !== 'unknown');
        separeteUnknow.sort((a, b) => parseInt(a[column], 10)
          - parseInt(b[column], 10));
        const onlyUnknow = filtro
          .filter((elemento) => elemento[column] === 'unknown');
        setFilter([...separeteUnknow, ...onlyUnknow]);
      } else {
        const separeteUnknow = filtro
          .filter((elemento) => elemento[column] !== 'unknown');
        separeteUnknow.sort((a, b) => parseInt(b[column], 10) - parseInt(a[column], 10));
        const onlyUnknow = filtro
          .filter((elemento) => elemento[column] === 'unknown');
        setFilter([...separeteUnknow, ...onlyUnknow]);
      }
    }
  };

  return (
    <FetchContext.Provider value={ { funcFilter, filter, ...props } }>
      {children}
    </FetchContext.Provider>
  );
}

FetchProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default FetchProvider;
