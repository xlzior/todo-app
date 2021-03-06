import { useSelector } from 'react-redux';
import { tasksSelector } from "./tasksSlice";

export default function useDataFiller(rawTasks = []) {
  const allTasks = useSelector(tasksSelector);
  return rawTasks
    .map(({ id }) => allTasks.find((elem: { id: string; }) => elem.id === id))
    .filter(Boolean);
}