import { useParams } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';

type ParamsType = {
  categoryId: string;
}

const Form = () => {
  const { categoryId } = useParams<ParamsType>();

  const isEditing = categoryId !== 'create';
  const formTitle = isEditing ? 'Editar Categoria' : 'Cadastrar uma Categoria';

  return (
    <form>
      <BaseForm title={formTitle}  path='/admin/categories'>
      </BaseForm>
    </form>
  )
}

export default Form;