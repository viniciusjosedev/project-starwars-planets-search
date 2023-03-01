import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { MdCancel } from 'react-icons/md';
import style from '../styles/css/Home.module.css';
import FetchContext from '../context/FecthContext';
import Table from './Table';
import logoStarWars from '../styles/images/logoStarWars.svg';
import iconSearch from '../styles/images/iconSearch.svg';

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
    <>
      <main className={ style.main }>
        <img src={ logoStarWars } alt="" />
        <section>
          <div className={ style.divFilters }>
            <div className={ style.divOnlyInputText }>
              <Input
                type="text"
                data-testid="name-filter"
                onChange={ ({ target: { value } }) => funcFilter('inputText', value) }
              />
              <img src={ iconSearch } alt="" />
            </div>
            <div className={ style.outerFilters }>
              <Input
                type="select"
                name=""
                className={ style.inputSelect }
                data-testid="column-filter"
                onChange={ ({ target: { value } }) => setState({ ...state, tag: value }) }
                id=""
              >
                {TAGS_IMUTAVEIS.filter((e) => !tags.includes(e)).map((elemento) => (
                  <option key={ elemento } value={ elemento }>{elemento}</option>
                ))}
              </Input>
              <Input
                type="select"
                name=""
                className={ style.inputSelect }
                onChange={ ({ target: { value } }) => {
                  setState({ ...state, operator: value });
                } }
                data-testid="comparison-filter"
                id=""
              >
                <option value="maior que">maior que</option>
                <option value="menor que">menor que</option>
                <option value="igual a">igual a</option>
              </Input>
              <Input
                type="number"
                className={ style.inputNumber }
                data-testid="value-filter"
                value={ state.unit }
                onChange={ ({ target: { value } }) => setState({ ...state, unit: value }) }
              />
              <Button
                type="button"
                className={ style.button }
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
              </Button>
              <Input
                type="select"
                name=""
                className={ style.inputSelect }
                id=""
                data-testid="column-sort"
                onClick={ ({ target: { value } }) => setOrder({ ...order, column: value }) }
              >
                {TAGS_IMUTAVEIS.map((elemento) => (
                  <option key={ elemento } value={ elemento }>{elemento}</option>
                ))}
              </Input>
              <div>
                <FormGroup check>
                  <Label check className={ style.label }>
                    Ascendente
                  </Label>
                  <Input
                    type="radio"
                    className={ style.inputRadio }
                    name="ordem"
                    onClick={ ({ target: { value } }) => setOrder({ ...order, sort: value }) }
                    value="ASC"
                    data-testid="column-sort-input-asc"
                    id="ASC"
                  />
                </FormGroup>
                <FormGroup check>
                  <Label check className={ style.label }>
                    Descendente
                  </Label>
                  <Input
                    type="radio"
                    name="ordem"
                    className={ style.inputRadio }
                    onClick={ ({ target: { value } }) => setOrder({ ...order, sort: value }) }
                    value="DESC"
                    data-testid="column-sort-input-desc"
                    id="DESC"
                  />
                </FormGroup>
              </div>
              <Button
                data-testid="column-sort-button"
                className={ style.button }
                onClick={ () => {
                  funcFilter('ordernar', order);
                  setOrder({ column: 'population', sort: 'ASC' });
                } }
                type="button"
              >
                Ordenar
              </Button>
            </div>
            <div className={ style.filtersAplication }>
              {tags.length > 0 && (
                <Button
                  data-testid="button-remove-filters"
                  type="submit"
                  className={ style.button }
                  onClick={ () => {
                    funcFilter('reset');
                    setTags([]);
                  } }
                >
                  Remover Filtros
                </Button>
              )}
              <div>
                {tags.map((elemento) => (
                  <div
                    data-testid="filter"
                    key={ elemento }
                  >
                    <Button
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
                      {' '}
                      <MdCancel />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Table filter={ filter } />
        </section>
      </main>
      <footer className={ style.footer }>
        <h1 className={ style.firstH1 }>Desenvolvido com React.js</h1>
        <h1>2023 © Vinicius José</h1>
      </footer>
    </>
  );
}

Home.propTypes = {
  filter: PropTypes.any,
}.isRequired;

export default Home;
