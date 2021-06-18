import { ReactComponent as SearchIcon } from 'core/assets/images/search-icon.svg'
import Select from 'react-select';
import './styles.scss';

type Props = {
  title: string;
  direction: string;
  handleChangeDirection: (direction: string) => void;
  clearFilters: () => void;
}

const options = [
  { value: 'DESC', label: 'Filtrar por Recentes'},  
  { value: 'ASC', label: 'Filtrar por Antigos'}
]

const Filters = (
  {title, direction, handleChangeDirection, clearFilters }
  : Props) => {
  return (
    <div className="card-base filters-container">
      <div className="input-search">
        <input
          type="text"
          className="form-control"
          placeholder={'Pesquisar ' + title}
        />
        <SearchIcon />
      </div>
      <Select 
        options={options}
        defaultValue={options[0]}
        className="filter-select-container"
        classNamePrefix="filter-select"
        onChange={value => handleChangeDirection(value?.value as string)}
      />
      <button
        className="btn btn-outline-secondary border-radius-10 px-5"
        onClick={() => {
          //clearFilters();
        }}
      >
        LIMPAR FILTRO
      </button>
    </div>
  )
}

export default Filters;