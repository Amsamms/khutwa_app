import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Child {
  id: string;
  name: string;
  gender: 'Girl' | 'Boy';
  age: number;
  goal: string;
  progress: number;
  avatar: string;
  createdAt: Date;
}

interface ChildrenState {
  children: Child[];
  addChild: (child: Omit<Child, 'id' | 'progress' | 'avatar' | 'createdAt'>) => void;
  updateChild: (id: string, updates: Partial<Child>) => void;
  removeChild: (id: string) => void;
  getChild: (id: string) => Child | undefined;
}

export const useChildrenStore = create<ChildrenState>()(
  persist(
    (set, get) => ({
      children: [],
      
      addChild: (childData) => {
        const newChild: Child = {
          ...childData,
          id: Date.now().toString(),
          progress: 0,
          avatar: childData.gender === 'Girl' ? '👧' : '👦',
          createdAt: new Date(),
        };
        
        set((state) => ({
          children: [...state.children, newChild],
        }));
      },
      
      updateChild: (id, updates) => {
        set((state) => ({
          children: state.children.map((child) =>
            child.id === id ? { ...child, ...updates } : child
          ),
        }));
      },
      
      removeChild: (id) => {
        set((state) => ({
          children: state.children.filter((child) => child.id !== id),
        }));
      },
      
      getChild: (id) => {
        return get().children.find((child) => child.id === id);
      },
    }),
    {
      name: 'children-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
    }
  )
);