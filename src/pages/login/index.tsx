import React, { useEffect, useState } from 'react';

import deepEqual from 'deep-equal';

import { useLazyQuery } from '@apollo/client';

import UserQueries from '@/api/graphql/UserQueries';

import Button from '@/components/ui/Button';
import FormRow from '@/components/ui/FormRow';
import TextInput from '@/components/ui/TextInput';

import {
  Query, QueryUserLoginArgs,
} from '@/definitions/graphql';
import { IUserAuthState } from '@/definitions/user';

import useAuth from '@/lib/hooks/useAuth';

import User from '@/models/User';

interface ILoginFormState {
  email: string;
  password: string;
}

function LoginPage() {
  useAuth({
    allowedStates: [IUserAuthState.GUEST],
  });

  const [formState, setFormState] = useState<ILoginFormState>({
    email: '',
    password: '',
  });

  const [login, { loading, data }] = useLazyQuery<Pick<Query, 'userLogin'>, QueryUserLoginArgs>(UserQueries.userLogin.query);

  useEffect(() => {
    if (data?.userLogin) {
      User.login(data?.userLogin).then();
    }
  }, [data]);

  const onLoginPress = async () => {
    login({
      variables: UserQueries.userLogin.variables({
        email: formState.email,
        password: formState.password,
      }),
    });
  };

  const onChange = (field: keyof ILoginFormState) => (text: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  return (
    <div>
      <FormRow label="E-Mail">
        <TextInput onValueChange={onChange('email')} />
      </FormRow>
      <FormRow label="Пароль">
        <TextInput onValueChange={onChange('password')} />
      </FormRow>
      <FormRow>
        <Button isLoading={loading} onPress={onLoginPress}>
          Войти
        </Button>
      </FormRow>
    </div>
  );
}

export default React.memo(LoginPage, deepEqual);
