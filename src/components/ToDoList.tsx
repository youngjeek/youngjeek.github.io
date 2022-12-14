import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categoryList, categoryState, toDoSelector, toDoState } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

const Div = styled.div``;

function ToDoList() {
  const toDo = useRecoilValue(toDoState);
  const customCategory = useRecoilValue(categoryList);
  const [toDos, doing, done, custom] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) =>
    setCategory(event.currentTarget.value as any);
  console.log(toDo);
  function onClick(newCategory: string) {
    return toDo
      .filter((toDo) => toDo.category === newCategory)
      .map((toDoo) => <ToDo key={toDoo.id} {...toDoo} />);
  }

  return (
    <div>
      <h1>To-do List</h1>
      <hr />
      Choose Status :
      <select value={category} onInput={onInput}>
        <option value="NOT_YET">Not yet</option>
        <option value="ACTIVE">Active</option>
        <option value="DONE">Done</option>
        {Object.keys(customCategory).map((newOpt) => (
          <option value={newOpt}>{newOpt}</option>
        ))}
      </select>
      <CreateToDo />
      <div>
        <h2>To-do</h2>
        <ul>
          {toDos.map((toDoo) => (
            <ToDo key={toDoo.id} {...toDoo} />
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <h2>in Progress</h2>
        <ul>
          {doing.map((toDoo) => (
            <ToDo key={toDoo.id} {...toDoo} />
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <h2>Done</h2>
        <ul>
          {done.map((toDoo) => (
            <ToDo key={toDoo.id} {...toDoo} />
          ))}
        </ul>
        <hr />
      </div>
      <div>
        <h2>Custom</h2>
        <ul>
          {Object.keys(customCategory).map((toDoo) => (
            <button key={toDoo} onClick={() => onClick(toDoo)}>
              {toDoo}
            </button>
          ))}
        </ul>
        <ul>
          {custom.map((toDoo) => (
            <ToDo key={toDoo.id} {...toDoo} />
          ))}
        </ul>
        <hr />
      </div>
    </div>
  );
}
export default ToDoList;
