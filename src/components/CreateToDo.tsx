import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
<<<<<<< HEAD
import { Button, categoryList, categoryState, toDoState } from './atoms';
=======
import { categoryList, categoryState, toDoState } from './atoms';
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9

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
<<<<<<< HEAD
=======

>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
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
<<<<<<< HEAD
=======
      console.log(categoryList);
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
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
<<<<<<< HEAD
        <Button>Add</Button>
=======
        <button>Add</button>
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
        <span>{errors?.toDo?.message}</span>
      </form>
    </>
  );
}
export default CreateToDo;
