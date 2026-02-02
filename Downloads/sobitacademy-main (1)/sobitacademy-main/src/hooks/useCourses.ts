import { useState, useEffect } from "react";
import {
  categories as staticCategories,
  Category,
  Lesson,
  getLessonById as getLessonByIdStatic,
  getCategoryById as getCategoryByIdStatic,
  getNextLesson as getNextLessonStatic,
  getPreviousLesson as getPreviousLessonStatic
} from "@/data/coursesData";

export type { Category, Lesson };

export function useCourses() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Return static data immediately (small timeout for smoother UI transition if needed, or 0)
      await new Promise(resolve => setTimeout(resolve, 100));
      setCategories(staticCategories);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Use the imported static helper functions, but we can also use the state if we wanted to be dynamic.
  // Since the data is static, using the imported functions directly is safer/simpler for now.

  const getLessonById = (id: string): Lesson | undefined => {
    return getLessonByIdStatic(id);
  };

  const getCategoryById = (id: string): Category | undefined => {
    return getCategoryByIdStatic(id);
  };

  const getNextLesson = (currentId: string): Lesson | undefined => {
    return getNextLessonStatic(currentId);
  };

  const getPreviousLesson = (currentId: string): Lesson | undefined => {
    return getPreviousLessonStatic(currentId);
  };

  return {
    categories,
    isLoading,
    error,
    refetch: fetchData,
    getLessonById,
    getCategoryById,
    getNextLesson,
    getPreviousLesson,
  };
}

// Admin functions for CRUD operations (Mocked)
export function useAdminCourses() {
  const extractVideoId = (url: string): string => {
    const match = url.match(/(?:embed\/|v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    return match ? match[1] : "";
  };

  const generateThumbnail = (videoUrl: string): string => {
    const videoId = extractVideoId(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
  };

  const saveLesson = async (
    lesson: {
      id?: string;
      title: string;
      description: string;
      duration: string;
      videoUrl: string;
      learningPoints: string[];
    },
    categoryId: string,
    isEditing: boolean
  ) => {
    console.log("Mock saveLesson called:", { lesson, categoryId, isEditing });
    // In a real mock, we might update a state, but for now just return success
    await new Promise(resolve => setTimeout(resolve, 500));
    return lesson.id || "mock-id";
  };

  const deleteLesson = async (lessonId: string) => {
    console.log("Mock deleteLesson called:", lessonId);
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  return {
    saveLesson,
    deleteLesson,
    generateThumbnail,
  };
}
