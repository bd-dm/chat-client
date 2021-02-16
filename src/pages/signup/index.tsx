import React, { useState } from 'react';

import Button from '@components/ui/Button';
import FormRow from '@components/ui/FormRow';
import TextInput from '@components/ui/TextInput';

interface ISignupFormState {
  email: string;
  password: string;
}

export default function SignupPage() {
  const [formState, setFormState] = useState<ISignupFormState>({
    email: '',
    password: '',
  });

  const onSignupPress = () => {
    console.log('signup', formState);
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
        <Button onPress={onSignupPress}>
          Зарегистрироваться
        </Button>
      </FormRow>
    </div>
  );
}
