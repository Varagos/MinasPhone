'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Link as NavigationLink } from '@/i18n/navigation';

import FormInput from './FormInput';
import { useTranslations } from 'next-intl';

type AccountProps = {
  next: (data: AccountFormData) => void;
};

export type AccountFormData = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const Account = ({ next }: AccountProps) => {
  const methods = useForm();
  const t = useTranslations('landing');

  const { errors } = methods.formState;
  // useEffect(() => {
  //   console.error('Errors:::', errors);
  // }, [errors]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        {"Προσωπικά στοιχεία"}
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            console.log(data);
            next({
              ...(data as AccountFormData),
            });
          })}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <FormInput
              name="firstName"
              label="'Ονομα"
              required
              rules={{
                required: 'Υποχρεωτικό πεδίο',
              }}
            />
            <FormInput
              name="lastName"
              label="Επώνυμο"
              required
              rules={{
                required: 'Υποχρεωτικό πεδίο',
              }}
            />
            <FormInput
              name="email"
              label="Email"
              required
              rules={{
                required: 'Υποχρεωτικό πεδίο',
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
                  message: 'Λανθασμένη διεύθυνση email',
                },
              }}
            />
            <FormInput
              name="phoneNumber"
              label="Αριθμός Τηλεφώνου"
              required
              rules={{
                required: 'Υποχρεωτικό πεδίο',
                validate: {
                  isNumber: (value: string) => {
                    return (
                      value.match(/\d/g)?.length === 10 ||
                      'Πρέπει να είναι 10-ψήφιος αριθμός'
                    );
                  },
                },
              }}
            />
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <Button asChild variant="outline" className="cursor-pointer">
              <NavigationLink href="/cart">{t('CHECKOUT.BACK_TO_CART')}</NavigationLink>
            </Button>

            <Button type="submit" className="cursor-pointer">
              {t('CHECKOUT.NEXT_BUTTON')}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default Account;
