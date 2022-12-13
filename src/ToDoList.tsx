import { setDefaultResultOrder } from 'dns';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInputs {
  name: string;
  email: string;
  nickname: string;
  id: string;
  pw: string;
  checkpw: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInputs>({
    defaultValues: { email: '@naver.com' },
  });

  const onValid = (data: any) => {
    if (data.pw !== data.checkpw) {
      setError(
        'checkpw',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
    //setError('extraError', { message: 'Server Offline' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('name', {
            required: 'write here',
            validate: {
              nostar: (value) =>
                value.includes('*') ? 'no * is allowed' : true,
              noexclamation: (value) =>
                value.includes('!') ? 'no ! is allowed' : true,
            },
          })}
          placeholder="Name"
        />
        <span>{errors?.name?.message}</span>
        <input
          {...register('email', {
            required: 'required!!',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'only @naver.com',
            },
          })}
          placeholder="email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register('nickname', { required: 'set your nick name' })}
          placeholder="UserName"
        />
        <span>{errors?.nickname?.message}</span>
        <input
          {...register('id', {
            minLength: { value: 5, message: 'too short >5' },
          })}
          placeholder="ID"
        />
        <span>{errors?.id?.message}</span>
        <input {...register('pw')} placeholder="PW" />
        <span>{errors?.pw?.message}</span>
        <input {...register('checkpw')} placeholder="write again PW" />
        <span>{errors?.checkpw?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
// function ToDoList() {
//   const [todo, setToDo] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(todo);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={todo} placeholder="Write" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }
export default ToDoList;
