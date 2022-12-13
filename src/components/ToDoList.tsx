import { useRecoilValue } from 'recoil';
import { toDoState } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDo = useRecoilValue(toDoState);

  return (
    <div>
      <CreateToDo />
      <ul>
        {toDo.map((toDoo) => (
          <ToDo key={toDoo.id} {...toDoo} />
        ))}
      </ul>
    </div>
  );
}
export default ToDoList;
