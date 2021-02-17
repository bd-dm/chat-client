import React, { useEffect, useState } from 'react';

import UserQueries from '@api/UserQueries';

import Button from '@components/ui/Button';
import FormRow from '@components/ui/FormRow';
import TextInput from '@components/ui/TextInput';

import {
  Query,
  QueryLoginArgs,
} from '@definitions/graphql';
import { IUserAuthState } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';

import User from '@models/User';

import { useLazyQuery } from '@apollo/client';

interface ILoginFormState {
  email: string;
  password: string;
}

export default function SignupPage() {
  useAuth({
    allowedStates: [IUserAuthState.GUEST],
  });

  const [formState, setFormState] = useState<ILoginFormState>({
    email: '',
    password: '',
  });

  const [login, { loading, data }] = useLazyQuery<Pick<Query, 'login'>, QueryLoginArgs>(UserQueries.login);

  useEffect(() => {
    if (data?.login) {
      User.login(data?.login).then();
    }
  }, [data]);

  const onLoginPress = async () => {
    login({
      variables: {
        data: {
          email: formState.email,
          password: formState.password,
        },
      },
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
        <TextInput name="email" onValueChange={onChange('email')} />
      </FormRow>
      <FormRow label="Пароль">
        <TextInput name="password" onValueChange={onChange('password')} />
      </FormRow>
      <FormRow>
        <Button isLoading={loading} onPress={onLoginPress}>
          Войти
        </Button>
      </FormRow>
    </div>
  );
}
