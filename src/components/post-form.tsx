import React, { FC, FormEvent } from 'react';
import { Post } from '../api/types';
import { Loader } from './styled';

const defaultFormValues: PostFormState = {
  title: '',
  body: '',
};

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type PostFormState = PartialBy<Post, 'id'>;

interface Props {
  onSubmit: (values: PostFormState) => Promise<void>;
  loading: boolean;
  initialValues?: PostFormState;
  submitText: string;
  clearOnSubmit?: boolean;
}

export const PostForm: FC<Props> = ({
  onSubmit,
  loading,
  initialValues = defaultFormValues,
  submitText,
  clearOnSubmit,
}) => {
  const [values, setValues] = React.useState<PostFormState>(initialValues);

  const setValue = (field: string, value: string) =>
    setValues((old) => ({ ...old, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    if (clearOnSubmit) {
      setValues(defaultFormValues);
    }
    e.preventDefault();
    onSubmit(values);
  };

  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <div>
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={(e) => setValue('title', e.target.value)}
          required
        />
      </div>
      <br />
      <label htmlFor="body">body</label>
      <div>
        <textarea
          name="body"
          value={values.body}
          onChange={(e) => setValue('body', e.target.value)}
          required
          rows={10}
        />
      </div>
      <br />
      <button type="submit">
        {loading && <Loader />} {submitText}
      </button>
    </form>
  );
};
