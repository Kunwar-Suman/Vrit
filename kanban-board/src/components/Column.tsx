import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import '../styles/Column.css';

interface ColumnProps {
  column: { id: string; title: string; taskIds: string[] };
  tasks: { id: string; content: string }[];
  addTask: (columnId: string, taskContent: string) => void;
  removeColumn: (columnId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, addTask, removeColumn }) => {
  const [taskContent, setTaskContent] = useState('');

  const handleAddTask = () => {
    if (taskContent.trim()) {
      addTask(column.id, taskContent);
      setTaskContent('');
    }
  };

  return (
    <div className="column">
      <h3>{column.title}</h3>
      <button onClick={() => removeColumn(column.id)}>Delete Column</button>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="task-list"
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="add-task">
        <input
          type="text"
          value={taskContent}
          onChange={(e) => setTaskContent(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Column;
