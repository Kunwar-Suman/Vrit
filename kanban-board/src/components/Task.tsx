import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import '../styles/Task.css';

interface TaskProps {
  task: { id: string; content: string };
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="task"
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
