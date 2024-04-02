import { useEffect, useMemo } from 'react';
import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom';

import { ALL_ROUTES, AUTH_ROUTES, MAIN_ROUTES } from '@/constants/routes';
import Layout from '@/layout/Layout';
import About from '@/pages/main/About';
import FAQs from '@/pages/main/FAQs';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Harmony from '@/pages/main/Harmony';

import { authorize, loadAccount } from '@/redux/reducers/auth';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import HttpService from '@/services/HttpService';

const authRoutes: RouteObject[] = [
  {
    path: AUTH_ROUTES.ROOT,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to={AUTH_ROUTES.LOGIN} />,
      },
      {
        path: AUTH_ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: AUTH_ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
];

const mainRoutes: RouteObject[] = [
  {
    path: MAIN_ROUTES.ABOUT,
    element: <About />,
  },
  {
    path: MAIN_ROUTES.FAQS,
    element: <FAQs />,
  },
  {
    path: MAIN_ROUTES.HARMONY,
    element: <Harmony />,
  },
  {
    path: ALL_ROUTES.ROOT,
    element: <Navigate to={MAIN_ROUTES.ABOUT} />,
  },
];

export default function Routes() {
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.auth.isLogin);

  const routes: RouteObject[] = useMemo(
    () => [
      {
        path: ALL_ROUTES.ROOT,
        element: <Layout />,
        children: [
          ...(isLogin ? mainRoutes : authRoutes),
          {
            path: ALL_ROUTES.ROOT,
            element: (
              <Navigate to={isLogin ? MAIN_ROUTES.HARMONY : AUTH_ROUTES.ROOT} />
            ),
          },
        ],
      },
    ],
    [isLogin]
  );

  useEffect(() => {
    if (isLogin) return;
    HttpService.get('/auth').then(response => {
      dispatch(authorize());
      dispatch(loadAccount(response));
      console.log(response);
    });
  }, []);

  return useRoutes(routes);
}
