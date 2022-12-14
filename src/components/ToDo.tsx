import React from 'react';
<<<<<<< HEAD
import { IToDo, toDoState, Categories, categoryList, Button } from './atoms';
=======
import { IToDo, toDoState, Categories, categoryList } from './atoms';
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
import { useRecoilValue, useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategory = useRecoilValue(categoryList);
<<<<<<< HEAD
  const newCategory = Object.keys(customCategory);
=======
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      // const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name };
      console.log('i wanna go to', targetIndex, 'with', newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.NOT_YET && (
<<<<<<< HEAD
        <Button name={Categories.NOT_YET + ''} onClick={onClick}>
          Not yet
        </Button>
      )}
      {category !== Categories.ACTIVE && (
        <Button name={Categories.ACTIVE + ''} onClick={onClick}>
          Active
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button name={Categories.DONE + ''} onClick={onClick}>
          Done
        </Button>
      )}
      {category !== newCategory &&
        Object.keys(customCategory).map((newOpt) => (
          <Button name={newOpt} onClick={onClick}>
            {newOpt}
          </Button>
=======
        <button name={Categories.NOT_YET + ''} onClick={onClick}>
          Not yet
        </button>
      )}
      {category !== Categories.ACTIVE && (
        <button name={Categories.ACTIVE + ''} onClick={onClick}>
          Active
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ''} onClick={onClick}>
          Done
        </button>
      )}
      {category !== Object.keys(customCategory) &&
        Object.keys(customCategory).map((newOpt) => (
          <button name={newOpt} onClick={onClick}>
            {newOpt}
          </button>
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
        ))}
    </li>
  );
}

export default ToDo;
