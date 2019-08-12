import React from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { trim, reduce, capitalize } from 'lodash';
import { Credential } from 'SCModels';
import Input from './Input';
import Button from './Button';
import Modal from './Modal';
import Loading from './Loading';
import './Login.css';


interface Props {
  isAuthorized: boolean;
  postSession: (credential: Credential) => void;
  isLoading: boolean;
  error: string;
}
function Login({
  isAuthorized, postSession, isLoading, error,
}: Props) {
  function handleOnSubmit(
    values: Credential,
    actions: FormikHelpers<Credential>,
  ) {
    postSession(values);
    actions.resetForm();
  }

  function handleValidation(values: Credential) {
    return reduce(values, (vals, val, key) => {
      if (!trim(val)) {
        return { ...vals, [key]: `${capitalize(key)} is required!` };
      }
      return vals;
    }, {});
  }

  return (
    <Modal
      isOpen={!isAuthorized}
      onRequestClose={() => {}}
    >
      <Formik
        onSubmit={handleOnSubmit}
        validate={handleValidation}
        initialValues={{
          name: '',
        }}
        validateOnChange
      >
        {({ isValid }: FormikProps<Credential>) => (
          <Form
            className="LoginForm"
          >
            <h2 className="LoginFormTitle">
              Login
            </h2>
            <p>
              Please input your name to join the chat.
            </p>
            <Input
              placeholder="Name"
              type="text"
              name="name"
              disabled={isLoading}
            />
            <div className="LoginFormGroup">
              <Button
                type="submit"
                primary
                disabled={isLoading || !isValid}
              >
                Login
                <Loading isLoading={isLoading} />
              </Button>
            </div>
            {error && (
              <p className="LoginError">
                Error: {error}
              </p>
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default Login;
