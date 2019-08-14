import React from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { mdiKeyboardReturn } from '@mdi/js';
import Icon from '@mdi/react';
import Input from './Input';
import Button from './Button';
import './DialogInputBox.css';


interface FormValues {
  content: string;
}
interface Props {
  onSend: (msg: string) => void;
}
function DialogInputBox({
  onSend,
}: Props) {
  function handleOnSubmit(
    values: FormValues,
    actions: FormikHelpers<FormValues>,
  ) {
    const { content } = values;
    onSend(content);
    actions.resetForm();
  }

  return (
    <div className="DialogInputBox">
      <Formik
        onSubmit={handleOnSubmit}
        initialValues={{ content: '' }}
      >
        {({ values }: FormikProps<FormValues>) => (
          <Form>
            <Input
              placeholder="Message"
              name="content"
              autoComplete="off"
              endAdornment={
                <Button
                  type="submit"
                  disabled={!values.content}
                >
                  <Icon size={1} path={mdiKeyboardReturn} />
                </Button>
              }
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default DialogInputBox;
