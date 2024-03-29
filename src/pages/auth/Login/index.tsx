import { Link, useNavigate } from 'react-router-dom';

import Input from '@/components/forms/Input';
import Button from '@/components/forms/Button';

import { authorize } from '@/redux/reducers/auth';
import { useAppDispatch } from '@/redux/store';
import { AUTH_ROUTES, MAIN_ROUTES } from '@/constants/routes';

import GoogleIcon from '@/assets/svgs/google.svg';
import classes from './index.module.scss';
import { ChangeEvent, useState } from 'react';
import HttpService from '@/services/HttpService';
import { enqueueSnackbar } from 'notistack';
import { setupToken } from '@/utils/token';

interface IAccount {
  email: string;
  password: string;
}

const initialAccount: IAccount = {
  email: '',
  password: '',
};

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [account, setAccount] = useState<IAccount>(initialAccount);

  const onAccountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const onSubmitWithEmail = () => {
    const reqJson = new FormData();
    reqJson.append('username', account.email);
    reqJson.append('password', account.password);
    HttpService.post('/auth/login', reqJson)
      .then(response => {
        const { access_token, refresh_token } = response;
        setupToken(access_token, refresh_token);
        dispatch(authorize());
        navigate(`/${MAIN_ROUTES.HARMONY}`);
        enqueueSnackbar('Login success.', { variant: 'success' });
      })
      .catch(err => {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 401) {
            enqueueSnackbar(data.detail, { variant: 'error' });
          } else {
            enqueueSnackbar(data.detail[0].msg, { variant: 'error' });
          }
        }
      });
  };

  return (
    <div className={classes.root}>
      <h1>Log In</h1>
      <p>Creating attractive with your hands</p>
      <div className={classes.form}>
        <Input
          name="email"
          type="email"
          label="Email"
          required={true}
          value={account.email}
          onChange={onAccountChange}
        />
        <Input
          name="password"
          type="password"
          label="Password"
          isForgot={true}
          forgotUrl=""
          required={true}
          value={account.password}
          onChange={onAccountChange}
        />
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={onSubmitWithEmail}
          >
            Log In
          </Button>
          <Button variant="contained" color="white">
            <img alt="Google Button icon" src={GoogleIcon} />
            Log in with Google
          </Button>
        </div>
      </div>
      <p className={classes.signupLink}>
        Don't you have an account?
        <Link to={`/${AUTH_ROUTES.ROOT}/${AUTH_ROUTES.REGISTER}`}>Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
