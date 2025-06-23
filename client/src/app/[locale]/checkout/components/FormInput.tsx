"use client";

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormControl, FormItem, FormMessage } from '@/components/ui/form';

import { RegisterOptions } from 'react-hook-form';

type FormInputProps = {
  name: string;
  label: string;
  required?: boolean;
  rules?: RegisterOptions;
};

const FormInput = ({ name, label, required, rules }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="w-full">
      <Controller
        name={name}
        control={control}
        rules={rules ?? {}}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <FormItem>
            <FormControl>
              <div className="relative">
                <Input
                  id={name}
                  placeholder=" "
                  className={`h-12 pt-4 border-2 ${error ? "border-red-500" : "border-gray-300"}`}
                  onBlur={onBlur}
                  onChange={onChange}
                  ref={ref}
                  value={value || ""}
                />
                <Label 
                  htmlFor={name} 
                  className="absolute left-3 top-1 text-xs text-muted-foreground pointer-events-none">
                  {label}{required && <span className="text-red-500 ml-1">{"*"}</span>}
                </Label>
              </div>
            </FormControl>
            {error && (
              <FormMessage className="text-red-500 text-sm mt-1">
                {error.message}
              </FormMessage>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormInput;
