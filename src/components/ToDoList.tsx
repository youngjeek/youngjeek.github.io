import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Button,
  categoryList,
  categoryState,
  Div,
  Div2,
  Tab,
  toDoSelector,
  toDoState,
} from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDo = useRecoilValue(toDoState);
  const customCategory = useRecoilValue(categoryList);
  const [toDos, doing, done, others] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) =>
    setCategory(event.currentTarget.value as any);
  console.log(toDo);

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
      <Div>
        <Tab>
          <h2>To-do</h2>
          <ul>
            {toDos.map((toDoo) => (
              <ToDo key={toDoo.id} {...toDoo} />
            ))}
          </ul>
        </Tab>
        <Tab>
          <h2>in Progress</h2>
          <ul>
            {doing.map((toDoo) => (
              <ToDo key={toDoo.id} {...toDoo} />
            ))}
          </ul>
        </Tab>
        <Tab>
          <h2>Done</h2>
          <ul>
            {done.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </Tab>
      </Div>
      <Div2>
        {Object.keys(customCategory).map((newOpt) => (
          <>
            <Tab>
              <h2>{newOpt}</h2>
              <ul>
                {others.map((toDo) =>
                  newOpt === toDo.category ? (
                    <ToDo key={toDo.id} {...toDo} />
                  ) : null
                )}
              </ul>
            </Tab>
          </>
        ))}
      </Div2>
    </div>
  );
}
export default ToDoList;
