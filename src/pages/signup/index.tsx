import React, { useState } from 'react';

import deepEqual from 'deep-equal';

import UserQueries from '@api/graphql/UserQueries';

import Button from '@components/ui/Button';
import FormRow from '@components/ui/FormRow';
import TextInput from '@components/ui/TextInput';

import { Mutation, MutationUserSignupArgs } from '@definitions/graphql';
import { IUserAuthState } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';

import User from '@models/User';

import { useMutation } from '@apollo/client';

interface ISignupFormState {
  email: string;
  password: string;
}

function SignupPage() {
  useAuth({
    allowedStates: [IUserAuthState.GUEST],
  });

  const [formState, setFormState] = useState<ISignupFormState>({
    email: '',
    password: '',
  });

  const [signup, { loading }] = useMutation<Pick<Mutation, 'userSignup'>, MutationUserSignupArgs>(UserQueries.userSignup.query);

  const onSignupPress = async () => {
    try {
      const data = await signup({
        variables: UserQueries.userSignup.variables({
          email: formState.email,
          password: formState.password,
        }),
      });

      if (data.data) {
        await User.login(data.data?.userSignup);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onChange = (field: keyof ISignupFormState) => (text: string) => {
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
        <Button isLoading={loading} onPress={onSignupPress}>
          Зарегистрироваться
        </Button>
      </FormRow>
    </div>
  );
}

export default React.memo(SignupPage, deepEqual);
