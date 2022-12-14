import React from 'react';
import { IToDo, toDoState, Categories, categoryList, Button } from './atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategory = useRecoilValue(categoryList);
  const newCategory = Object.keys(customCategory);
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
        ))}
    </li>
  );
}

export default ToDo;
