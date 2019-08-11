import React from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { isEmpty, trim, reduce, capitalize } from 'lodash';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';
import './Login.css';


interface FormValues {
  name: string;
  password: string;
}
function Login() {
  function handleOnSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) {
    actions.setSubmitting(false);
  }

  function handleValidation(values: FormValues) {
    return reduce(values, (vals, val, key) => {
      if (!trim(val)) {
        return { ...vals, [key]: `${capitalize(key)} is required!` };
      }
      return vals;
    }, {});
  }

  return (
    <Modal
      isOpen={true}
      onRequestClose={() => {}}
    >
      <Formik
        onSubmit={handleOnSubmit}
        validate={handleValidation}
        initialValues={{
          name: '',
          password: '',
        }}
      >
        {({ touched, isValid }: FormikProps<FormValues>) => (
          <Form
            className="LoginForm"
          >
            <h2 className="LoginFormTitle">
              Login
            </h2>
            <p>
              Please input your name and password to join the chat.
            </p>
            <Input placeholder="Name" type="text" name="name" />
            <Input placeholder="Password" type="password" name="password" />
            <div className="LoginFormGroup">
              <Button
                type="submit"
                primary
                disabled={isEmpty(touched) || !isValid}
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default Login;
