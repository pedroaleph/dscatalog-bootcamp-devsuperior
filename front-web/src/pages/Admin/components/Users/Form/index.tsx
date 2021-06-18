import { useParams } from 'react-router-dom';
import BaseForm from '../../BaseForm';
import './styles.scss';

type ParamsType = {
  userId: string;
}

const Form = () => {
  const { userId } = useParams<ParamsType>();

  const isEditing = userId !== 'create';
  const formTitle = isEditing ? 'Editar Usuário' : 'Cadastrar um Usuário';

  return (
    <form>
      <BaseForm title={formTitle}  path='/admin/users'>
      </BaseForm>
    </form>
  )
}

export default Form;