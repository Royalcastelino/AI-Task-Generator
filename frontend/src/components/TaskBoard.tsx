import { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskBoardProps {
    tasks: {
        frontend: string[];
        backend: string[];
        devops: string[];
    };
    onTasksChange: (updatedTasks: any) => void;
}

const SortableTaskItem = ({ id, task, onUpdate, onDelete }: any) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (editValue.trim() !== task) {
            onUpdate(editValue);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative bg-white/5 border border-white/5 p-4 rounded-xl flex items-start gap-3 hover:border-white/20 transition-all cursor-default"
        >
            <div {...attributes} {...listeners} className="mt-1 cursor-grab active:cursor-grabbing text-white/20 hover:text-white/60 transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M5 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-6 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
            </div>

            <div className="flex-1">
                {isEditing ? (
                    <textarea
                        autoFocus
                        className="w-full bg-white/10 border-none p-0 focus:ring-0 text-white leading-relaxed resize-none"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleBlur();
                            }
                        }}
                    />
                ) : (
                    <p onClick={() => setIsEditing(true)} className="text-white/80 leading-relaxed text-sm cursor-text">
                        {task}
                    </p>
                )}
            </div>

            <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-red-500 transition-all"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onTasksChange }) => {
    type Category = 'frontend' | 'backend' | 'devops';

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent, category: Category) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const categoryTasks = [...tasks[category]];
            const oldIndex = categoryTasks.indexOf(active.id as string);
            const newIndex = categoryTasks.indexOf(over.id as string);

            const newTasks = {
                ...tasks,
                [category]: arrayMove(categoryTasks, oldIndex, newIndex),
            };
            onTasksChange(newTasks);
        }
    };

    const updateTask = (category: Category, index: number, newValue: string) => {
        const newCategoryTasks = [...tasks[category]];
        newCategoryTasks[index] = newValue;
        onTasksChange({ ...tasks, [category]: newCategoryTasks });
    };

    const deleteTask = (category: Category, index: number) => {
        const newCategoryTasks = [...tasks[category]];
        newCategoryTasks.splice(index, 1);
        onTasksChange({ ...tasks, [category]: newCategoryTasks });
    };

    const addTask = (category: Category) => {
        const newCategoryTasks = [...tasks[category], "New Task " + Date.now()];
        onTasksChange({ ...tasks, [category]: newCategoryTasks });
    };

    const categories: { id: Category; label: string; color: string }[] = [
        { id: 'frontend', label: 'Frontend', color: 'bg-blue-500' },
        { id: 'backend', label: 'Backend', color: 'bg-green-500' },
        { id: 'devops', label: 'DevOps', color: 'bg-purple-500' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
                <div key={cat.id} className="flex flex-col h-full bg-white/2 space-y-4 rounded-2xl p-4">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${cat.color}`} />
                            <h4 className="font-bold text-white/50 uppercase tracking-widest text-xs">{cat.label}</h4>
                            <span className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-white/40">{tasks[cat.id as keyof typeof tasks].length}</span>
                        </div>
                        <button
                            onClick={() => addTask(cat.id)}
                            className="p-1 text-white/20 hover:text-white transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                        </button>
                    </div>

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(e) => handleDragEnd(e, cat.id as any)}
                    >
                        <div className="flex flex-col gap-3 min-h-[100px]">
                            <SortableContext
                                items={tasks[cat.id as keyof typeof tasks]}
                                strategy={verticalListSortingStrategy}
                            >
                                {tasks[cat.id as keyof typeof tasks].map((task, index) => (
                                    <SortableTaskItem
                                        key={task} // Note: Using task content as key is risky but simple here; ideally use IDs
                                        id={task}
                                        task={task}
                                        onUpdate={(val: string) => updateTask(cat.id, index, val)}
                                        onDelete={() => deleteTask(cat.id, index)}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                    </DndContext>
                </div>
            ))}
        </div>
    );
};

export default TaskBoard;
