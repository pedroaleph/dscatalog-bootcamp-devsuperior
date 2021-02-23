import { Route, Switch } from 'react-router';
import './styles.scss'

const Categories = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/categories" exact>

                </Route>
                <Route path="/admin/categories/create">
                    
                </Route>
                <Route path="/admin/categories/categoryId">
                    
                </Route>
            </Switch>
        </div>
    );
}

export default Categories;