import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
<<<<<<< HEAD
import {
  categoryList,
  categoryState,
  Div,
  Div2,
  Tab,
  toDoSelector,
  toDoState,
} from './atoms';
=======
import { categoryList, categoryState, toDoSelector, toDoState } from './atoms';
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDo = useRecoilValue(toDoState);
  const customCategory = useRecoilValue(categoryList);
<<<<<<< HEAD
  const [toDos, doing, done, others] = useRecoilValue(toDoSelector);
=======
  const [toDos, doing, done, custom] = useRecoilValue(toDoSelector);
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) =>
    setCategory(event.currentTarget.value as any);
  console.log(toDo);
<<<<<<< HEAD
=======
  function onClick(newCategory: string) {
    return toDo
      .filter((toDo) => toDo.category === newCategory)
      .map((toDoo) => <ToDo key={toDoo.id} {...toDoo} />);
  }
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9

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
<<<<<<< HEAD
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
=======
      <h2>To-do</h2>
      <ul>
        {toDos.map((toDoo) => (
          <ToDo key={toDoo.id} {...toDoo} />
        ))}
      </ul>
      <hr />
      <h2>in Progress</h2>
      <ul>
        {doing.map((toDoo) => (
          <ToDo key={toDoo.id} {...toDoo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDoo) => (
          <ToDo key={toDoo.id} {...toDoo} />
        ))}
      </ul>
      <hr />
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
>>>>>>> c51757daf963f7ecf15f3fe4d3bb5917658044d9
    </div>
  );
}
export default ToDoList;
