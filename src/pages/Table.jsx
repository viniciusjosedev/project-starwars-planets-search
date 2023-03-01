import PropTypes from 'prop-types';
import React from 'react';
import style from '../styles/css/Table.module.css';

export default function Table({ filter }) {
  return (
    <table>
      <thead>
        <tr>
          { filter.length > 0 && Object.keys(filter[0]).map((elemento) => (
            <th key={ elemento }>{elemento}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filter.length > 0 && filter.map((elemento) => (
          <tr key={ elemento.name }>
            {Object.values(elemento).map((e, i) => (
              <td
                data-testid={ i === 0 ? 'planet-name' : null }
                key={ e }
              >
                {e}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  filter: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
}.isRequired;
