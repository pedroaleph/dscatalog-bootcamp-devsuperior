import { Route, Switch } from 'react-router';
import './styles.scss'

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>

                </Route>
                <Route path="/admin/users/create">
                    
                </Route>
                <Route path="/admin/users/:userId">
                    
                </Route>
            </Switch>
        </div>
    );
}

export default Users;