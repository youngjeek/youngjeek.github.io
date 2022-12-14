import React from 'react';
import { IToDo, toDoState, Categories, categoryList } from './atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const customCategory = useRecoilValue(categoryList);
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
        ))}
    </li>
  );
}

export default ToDo;
