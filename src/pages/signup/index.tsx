import React, { useState } from 'react';

import UserQueries from '@api/UserQueries';

import Button from '@components/ui/Button';
import FormRow from '@components/ui/FormRow';
import TextInput from '@components/ui/TextInput';

import { Mutation, MutationSignupArgs } from '@definitions/graphql';
import { IUserAuthState } from '@definitions/user';

import useAuth from '@lib/hooks/useAuth';

import User from '@models/User';

import { useMutation } from '@apollo/client';

interface ISignupFormState {
  email: string;
  password: string;
}

export default function SignupPage() {
  useAuth({
    allowedStates: [IUserAuthState.GUEST],
  });

  const [formState, setFormState] = useState<ISignupFormState>({
    email: '',
    password: '',
  });

  const [signup, { loading }] = useMutation<Pick<Mutation, 'signup'>, MutationSignupArgs>(UserQueries.signup);

  const onSignupPress = async () => {
    try {
      const data = await signup({
        variables: {
          data: {
            email: formState.email,
            password: formState.password,
          },
        },
      });

      if (data.data) {
        await User.login(data.data?.signup);
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
        <TextInput name="email" onValueChange={onChange('email')} />
      </FormRow>
      <FormRow label="Пароль">
        <TextInput name="password" onValueChange={onChange('password')} />
      </FormRow>
      <FormRow>
        <Button isLoading={loading} onPress={onSignupPress}>
          Зарегистрироваться
        </Button>
      </FormRow>
    </div>
  );
}
