import Filters from 'core/components/Filters';
import Pagination from 'core/components/Pagination';
import { UserResponse } from 'core/types/User';
import { makePrivateRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import CardLoader from '../../Loaders/CardLoader';
import Card from '../Card';
import './styles.scss';

const List = () => {
  const [usersResponse, setUsersResponse] = useState<UserResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [direction, setDirection] = useState('DESC');
  const history = useHistory();

  const getUsers = useCallback(() => {
    const params = {
      page: activePage,
      linesPerPage: 6,
      direction,
      orderBy: 'id'
    };
    setIsLoading(true);
    makePrivateRequest({ url: '/users', params })
      .then(response => setUsersResponse(response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }, [activePage, direction]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleCreate = () => {
    history.push('/admin/users/create')
  }

  const onRemove = (userId: number) => {
    const confirm = window.confirm('Deseja realmente excluir este usuário?');

    if (confirm) {
      makePrivateRequest({ url: `/users/${userId}`, method: 'DELETE' })
        .then(() => {
          toast.info('Usuário removido com sucesso!');
          getUsers();
        })
        .catch(() => {
          toast.error('Erro ao remover usuário!');
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
    <div className="admin-users-list">
      <div className="admin-list-filters">
        <button className="btn btn-primary btn-lg" onClick={handleCreate}>
          ADICIONAR
        </button>
        <Filters
          title="Nome"
          direction={direction}
          handleChangeDirection={handleChangeDirection}
          clearFilters={clearFilters}
        />
      </div>
      <div className="admin-list-container">
        {isLoading ? <CardLoader /> : (
          usersResponse?.content.map(user => (
            <Card user={user} key={user.id} onRemove={onRemove} />
          ))
        )}
        {usersResponse && (
          <Pagination
            totalPages={usersResponse.totalPages}
            activePage={activePage}
            onChange={page => setActivePage(page)}
          />
        )}
      </div>
    </div>
  )
}

export default List;