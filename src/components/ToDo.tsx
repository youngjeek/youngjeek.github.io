import { IToDo } from './atoms';

function ToDo({ text, category }: IToDo) {
  const onClick = (newCategory: IToDo['category']) => {
    console.log('I wanna to', newCategory);
  };
  return (
    <li>
      <span>{text}</span>
      {category !== 'NOT_YET' && (
        <button onClick={() => onClick('NOT_YET')}>Not yet</button>
      )}
      {category !== 'ACTIVE' && (
        <button onClick={() => onClick('ACTIVE')}>Active</button>
      )}
      {category !== 'DONE' && (
        <button onClick={() => onClick('DONE')}>Done</button>
      )}
    </li>
  );
}
export default ToDo;
