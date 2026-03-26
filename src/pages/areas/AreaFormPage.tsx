import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAreas } from '@/hooks/useAreas';
import { AreaForm } from '@/components/areas/AreaForm';
import { Skeleton } from '@/components/ui/Skeleton';
import type { CreateAreaInput } from '@/types';

export default function AreaFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getAreaById, createArea, updateArea, isLoading } = useAreas();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = Boolean(id);
  const area = id ? getAreaById(id) : undefined;

  // Redirect if editing and area not found
  useEffect(() => {
    if (isEditing && !area && !isLoading) {
      navigate('/areas');
    }
  }, [isEditing, area, isLoading, navigate]);

  const handleSubmit = async (data: CreateAreaInput) => {
    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await updateArea(id, data);
        navigate(`/areas/${id}`);
      } else {
        await createArea(data);
        navigate('/areas');
      }
    } catch (error) {
      console.error('Error saving area:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto py-6 px-3 sm:px-4 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-6 px-3 sm:px-4">
      <AreaForm area={area} onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
}
