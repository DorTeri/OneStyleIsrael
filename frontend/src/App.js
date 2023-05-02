// import logo from './logo.svg';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './assets/styles/styles.scss'
import { AppHeader } from './cmps/AppHeader';
import { HomePage } from './views/HomePage';
import { ProductsPage } from './views/ProductsPage';
import { ProductDetails } from './views/ProductDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from './store/actions/user.actions';
import { Cart } from './views/Cart';
import { Admin } from './views/Admin';
import { ProductEdit } from './views/ProductEdit';
import { CtgPage } from './views/CtgPage';
import { AppFooter } from './cmps/AppFooter';
import { loadBrands } from './store/actions/products.actions';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signup('Dor'))
    dispatch(loadBrands())
  }, [])

  return (
    <Router>
      <section className="main-app main-layout">
        <AppHeader />
        <section className='main-content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:brand" element={<ProductsPage />} />
            <Route path="/:brand/:ctg" element={<CtgPage />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/edit/:id?" element={<ProductEdit />} />
          </Routes>
        </section>
        <AppFooter />
      </section>
    </Router>
  );
}

export default App;
