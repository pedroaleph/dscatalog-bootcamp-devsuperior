import { User } from 'core/types/User';
import { Link } from 'react-router-dom';
import './styles.scss'

type Props = {
  user: User;
  onRemove: (categoryId: number) => void;
}

const Card = ({ user, onRemove }: Props) => {
  return (
    <div className="card-base admin-card py-3">
      <div className="row px-4">
        <div className="col-6">
          <h3 className="card-name-admin">
            {user.firstName + " " + user.lastName}
          </h3>
          <h5 className="card-email-admin">
            {user.email}
          </h5>
        </div>
        <div className="col-6 d-flex">
          <Link
            to={`/admin/users/${user.id}`}
            type="button"
            className="btn btn-outline-secondary border-radius-10 mr-4"
          >
            EDITAR
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger border-radius-10"
            onClick={() => onRemove(user.id)}
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;