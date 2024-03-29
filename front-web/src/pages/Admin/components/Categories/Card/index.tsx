import { Category } from 'core/types/Product';
import { Link } from 'react-router-dom';
import './styles.scss'

type Props = {
  category: Category;
  onRemove: (categoryId: number) => void;
}

const Card = ({ category, onRemove }: Props) => {
  return (
    <div className="card-base admin-card py-3">
      <div className="admin-card-row">
        <div className="">
          <h3 className="card-name-admin">
            {category.name}
          </h3>
        </div>
        <div className="admin-card-buttons">
          <Link
            to={`/admin/categories/${category.id}`}
            type="button"
            className="btn btn-outline-secondary border-radius-10"
          >
            EDITAR
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger border-radius-10"
            onClick={() => onRemove(category.id)}
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;