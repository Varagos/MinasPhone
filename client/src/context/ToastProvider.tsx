'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ToastType = 'default' | 'success' | 'warning' | 'error';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast = { ...toast, id };

      setToasts((prevToasts) => [...prevToasts, newToast]);

      if (toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || 3000);
      }

      return id;
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            variant={toast.type === 'error' ? 'destructive' : 'default'}
            className="w-80 animate-in fade-in slide-in-from-right-5 duration-300 shadow-md"
          >
            {toast.type === 'success' && <Check className="h-4 w-4" />}
            {toast.type === 'error' && <X className="h-4 w-4" />}
            {toast.type === 'default' && toast.title.includes('cart') && (
              <ShoppingCart className="h-4 w-4" />
            )}

            <AlertTitle>{toast.title}</AlertTitle>
            {toast.description && (
              <AlertDescription>{toast.description}</AlertDescription>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => removeToast(toast.id)}
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
