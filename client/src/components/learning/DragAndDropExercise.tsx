'use client';

import { useState, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCcw, GripVertical } from 'lucide-react';

interface DragAndDropExerciseProps {
  prompt: string;
  blocks: string[];
  correctOrder: string[];
  onComplete?: (isCorrect: boolean) => void;
}

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  index: number;
}

function SortableItem({ id, children, index }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-black/80 border border-white/10 rounded-lg p-3 font-mono text-green-400 text-sm transition-shadow flex items-center gap-2 ${isDragging ? 'shadow-lg opacity-50' : ''}`}
      tabIndex={0}
      aria-label={`Code block ${index + 1}: ${children}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
        aria-label="Drag handle"
      >
        <GripVertical className="w-4 h-4 text-white/50" />
      </div>
      <span className="flex-1">{children}</span>
    </div>
  );
}

export default function DragAndDropExercise({ prompt, blocks, correctOrder, onComplete }: DragAndDropExerciseProps) {
  const [items, setItems] = useState(blocks);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSubmit = () => {
    const correct = items.join('|||') === correctOrder.join('|||');
    setIsCorrect(correct);
    setSubmitted(true);
    if (onComplete) onComplete(correct);
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = correct ? 'Correct order!' : 'Incorrect order, try again.';
    }
  };

  const handleReset = () => {
    setItems(blocks);
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <Card className="cyber-card">
      <CardHeader>
        <CardTitle>Drag-and-Drop Coding Exercise</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 text-white font-medium">{prompt}</div>
        <div ref={liveRegionRef} aria-live="polite" className="sr-only" />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <div
              className="space-y-2 mb-4"
              aria-label="Code blocks to reorder"
            >
              {items.map((block, idx) => (
                <SortableItem key={block} id={block} index={idx}>
                  {block}
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="flex items-center space-x-2">
          <Button onClick={handleSubmit} disabled={submitted} className="cyber-button" aria-label="Submit code order">
            Submit
          </Button>
          <Button onClick={handleReset} variant="outline" className="cyber-button-secondary" aria-label="Reset code order">
            <RefreshCcw className="w-4 h-4 mr-1" />Reset
          </Button>
          {submitted && (
            isCorrect ? (
              <span className="flex items-center text-green-400 font-semibold ml-2" role="status"><CheckCircle className="w-5 h-5 mr-1" />Correct!</span>
            ) : (
              <span className="flex items-center text-red-400 font-semibold ml-2" role="status"><XCircle className="w-5 h-5 mr-1" />Try Again</span>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
} 