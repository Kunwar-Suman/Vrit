import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import Column from './Column';
import '../styles/Board.css';

const initialData = {
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  tasks: {
    'task-1': { id: 'task-1', content: 'First Task' },
    'task-2': { id: 'task-2', content: 'Second Task' },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const Board: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('kanban-board');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('kanban-board', JSON.stringify(data));
  }, [data]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];
    const sourceTasks = Array.from(sourceColumn.taskIds);
    const destTasks = Array.from(destColumn.taskIds);

    sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, draggableId);

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [source.droppableId]: { ...sourceColumn, taskIds: sourceTasks },
        [destination.droppableId]: { ...destColumn, taskIds: destTasks },
      },
    };

    updateBoardState(newState);
  };

  const addTask = (columnId: string, taskContent: string) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask = { id: newTaskId, content: taskContent };

    const newState = {
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: [...data.columns[columnId].taskIds, newTaskId],
        },
      },
    };

    updateBoardState(newState);
  };

  const addColumn = () => {
    const newColumnId = `column-${Date.now()}`;
    const newColumn = { id: newColumnId, title: 'New Column', taskIds: [] };

    const newState = {
      ...data,
      columns: { ...data.columns, [newColumnId]: newColumn },
      columnOrder: [...data.columnOrder, newColumnId],
    };

    updateBoardState(newState);
  };

  const removeColumn = (columnId: string) => {
    const newState = {
      ...data,
      columns: Object.fromEntries(Object.entries(data.columns).filter(([id]) => id !== columnId)),
      columnOrder: data.columnOrder.filter(id => id !== columnId),
    };

    updateBoardState(newState);
  };

  const updateBoardState = (newState: any) => {
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, newState]);
    setHistoryIndex(historyIndex + 1);
    setData(newState);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setData(history[historyIndex + 1]);
    }
  };

  const filteredColumns = data.columnOrder.map(columnId => {
    const column = data.columns[columnId];
    const tasks = column.taskIds
      .map(taskId => data.tasks[taskId])
      .filter(task => task.content.toLowerCase().includes(searchTerm.toLowerCase()));

    return {
      ...column,
      tasks,
    };
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {filteredColumns.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={column.tasks}
              addTask={addTask}
              removeColumn={removeColumn}
            />
          ))}
          <button className="add-column" onClick={addColumn}>
            Add Column
          </button>
        </div>
      </DragDropContext>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default Board;
