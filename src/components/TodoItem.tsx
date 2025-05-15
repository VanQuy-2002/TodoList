import React, { useState } from 'react';
import type { TodoItemProps } from '../types';

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    const confirmSave = window.confirm(
      'Bạn có chắc muốn lưu thay đổi này không?',
    );
    if (confirmSave && editText.trim() !== '') {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };
  return (
    <li className="flex items-center justify-between p-2 border-b">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border rounded px-2 py-1"
          />
        ) : (
          <span className={todo.completed ? 'line-through text-gray-400' : ''}>
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        {/* <button
          onClick={() =>
            onEdit(todo.id, prompt('Edit todo:', todo.text) || todo.text)
          }
          className="text-yellow-500"
        >
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500">
          Delete
        </button> */}
        {isEditing ? (
          <button onClick={handleSave} className="text-green-500">
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-500"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => {
            const confirmDelete = window.confirm('Có chắc là muốn xóa không?');
            if (confirmDelete) {
              onDelete(todo.id);
            }
          }}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
