import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { toDoState } from './atoms';

//interface
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  // const value= useRecoilValue(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    console.log('add to-to', toDo);
    setToDos((oldToDo) => [
      { text: toDo, id: Date.now(), category: 'NOT_YET' },
      ...oldToDo,
    ]);
    setValue('toDo', '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('toDo', { required: 'Please write a To-do' })}
        placeholder="Write"
      />
      <button>Add</button>
      <span>{errors?.toDo?.message}</span>
    </form>
  );
}
export default CreateToDo;
