import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FinancialPlan {
  id: string;
  name: string;
  goal: string;
  age: number;
  targetAge: number;
  gender: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  monthlyContribution: number;
  totalAmount: number;
  years: number;
  planContent: string; // AI generated Arabic plan
  createdAt: Date;
  status: 'active' | 'completed' | 'paused';
}

interface PlanState {
  plans: FinancialPlan[];
  currentPlan: FinancialPlan | null;
  
  addPlan: (plan: Omit<FinancialPlan, 'id' | 'createdAt' | 'status'>) => void;
  updatePlan: (id: string, updates: Partial<FinancialPlan>) => void;
  removePlan: (id: string) => void;
  getPlan: (id: string) => FinancialPlan | undefined;
  setCurrentPlan: (plan: FinancialPlan | null) => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plans: [],
      currentPlan: null,
      
      addPlan: (planData) => {
        const newPlan: FinancialPlan = {
          ...planData,
          id: Date.now().toString(),
          createdAt: new Date(),
          status: 'active',
        };
        
        set((state) => ({
          plans: [...state.plans, newPlan],
          currentPlan: newPlan,
        }));
      },
      
      updatePlan: (id, updates) => {
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.id === id ? { ...plan, ...updates } : plan
          ),
          currentPlan: state.currentPlan?.id === id 
            ? { ...state.currentPlan, ...updates }
            : state.currentPlan,
        }));
      },
      
      removePlan: (id) => {
        set((state) => ({
          plans: state.plans.filter((plan) => plan.id !== id),
          currentPlan: state.currentPlan?.id === id ? null : state.currentPlan,
        }));
      },
      
      getPlan: (id) => {
        return get().plans.find((plan) => plan.id === id);
      },
      
      setCurrentPlan: (plan) => {
        set({ currentPlan: plan });
      },
    }),
    {
      name: 'plan-storage',
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined,
    }
  )
);