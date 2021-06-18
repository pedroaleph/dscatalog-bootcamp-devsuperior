import { Route, Switch } from 'react-router';
import Form from './Form';
import List from './List';
import './styles.scss'

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <List />
                </Route>
                <Route path="/admin/users/:userId">
                    <Form />
                </Route>
            </Switch>
        </div>
    );
}

export default Users;