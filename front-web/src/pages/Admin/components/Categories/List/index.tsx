import Filters from 'core/components/Filters';
import Pagination from 'core/components/Pagination';
import { CategoryResponse } from 'core/types/Product';
import makeRequest, { makePrivateRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardLoader from '../../Loaders/CardLoader';
import Card from '../Card';
import './styles.scss';

const List = () => {
  const [categoriesResponse, setCategoriesResponse] = useState<CategoryResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState('DESC');
  const history = useHistory();

  const getCategories = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 8,
      direction,
      orderBy: 'id'
    };
    setIsLoading(true);
    makeRequest({ url: '/categories', params })
      .then(response => setCategoriesResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, direction]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCreate = () => {
    history.push('/admin/categories/create')
  }

  const onRemove = (categoryId: number) => {
    const confirm = window.confirm('Deseja realmente excluir esta categoria?');

    if (confirm) {
      makePrivateRequest({ url: `/categories/${categoryId}`, method: 'DELETE' })
        .then(() => {
          toast.info('Categoria removida com sucesso!');
          getCategories();
        })
        .catch(() => {
          toast.error('Erro ao remover categoria!');
        })
    }
  }

  const handleChangeDirection = (direction: string) => {
    setActivePage(0);
    setDirection(direction);
  }

  const clearFilters = () => {
    setActivePage(0);
    setDirection('DESC');
  }

  return (
    <div className="admin-categories-list">
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary btn-lg mr-3" onClick={handleCreate}>
          ADICIONAR
        </button>
        <Filters
          title="Categoria"
          direction={direction}
          handleChangeDirection={handleChangeDirection}
          clearFilters={clearFilters}
        />
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          categoriesResponse?.content.map(category => (
            <Card category={category} key={category.id} onRemove={onRemove} />
          ))
        )}
        {categoriesResponse && (
          <Pagination
            totalPages={categoriesResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        )}
      </div>
    </div>
  )
}

export default List;