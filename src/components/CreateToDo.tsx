import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryList, categoryState, toDoState } from './atoms';

//interface
interface IForm {
  customCategory: string;
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryList);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = ({ customCategory, toDo }: IForm) => {
    if (customCategory) {
      setCategory((prev) => {
        return {
          ...prev,
          [customCategory]: [],
        };
      });
      setToDos((oldToDo) => [
        { text: toDo, id: Date.now(), category: customCategory },
        ...oldToDo,
      ]);
      console.log(categoryList);
    } else {
      setToDos((oldToDo) => [
        { text: toDo, id: Date.now(), category },
        ...oldToDo,
      ]);
    }
    setValue('customCategory', '');
    setValue('toDo', '');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        Create a New Category :
        <input
          {...register('customCategory')}
          placeholder="Create new category"
        ></input>
        <br />
        Text a To-do :
        <input
          {...register('toDo', { required: 'Please write a To-do' })}
          placeholder="Write To-do"
        />
        <button>Add</button>
        <span>{errors?.toDo?.message}</span>
      </form>
    </>
  );
}
export default CreateToDo;
