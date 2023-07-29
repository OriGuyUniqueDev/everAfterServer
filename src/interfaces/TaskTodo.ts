export default interface TodoType {
  id: number;
  task: string;
  priority: 'High' | 'Low';
  completed: boolean;
}
