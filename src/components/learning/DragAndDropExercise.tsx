'use client';

import { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RefreshCcw } from 'lucide-react';

interface DragAndDropExerciseProps {
  prompt: string;
  blocks: string[];
  correctOrder: string[];
  onComplete?: (isCorrect: boolean) => void;
}

export default function DragAndDropExercise({ prompt, blocks, correctOrder, onComplete }: DragAndDropExerciseProps) {
  const [items, setItems] = useState(blocks);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="code-blocks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 mb-4"
                role="list"
                aria-label="Code blocks to reorder"
              >
                {items.map((block, idx) => (
                  <Draggable key={block} draggableId={block} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-black/80 border border-white/10 rounded-lg p-3 font-mono text-green-400 text-sm transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                        tabIndex={0}
                        aria-label={`Code block ${idx + 1}: ${block}`}
                        role="listitem"
                      >
                        {block}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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