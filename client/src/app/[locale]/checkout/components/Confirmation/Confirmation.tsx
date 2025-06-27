import React from 'react';

import LinkButton from '@/components/common/LinkButton';
import { Loader2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export type CheckoutOrderResponse = {
  customer: {
    firstName: string;
    lastName: string;
  };
  orderReference: string;
};

type ConfirmationProps = {
  orderResponse: CheckoutOrderResponse | null;
};
const Confirmation = ({ orderResponse }: ConfirmationProps) => {
  return (
    <div className="w-full">
      {orderResponse !== null ? (
        <div className="max-w-4xl mx-auto p-6">
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Σας ευχαριστούμε για την παραγγελία,{' '}
              {orderResponse.customer.firstName}{' '}
              {orderResponse.customer.lastName}
            </h2>
            <div className="border-t border-gray-200 my-4"></div>
            <p className="text-sm text-gray-600">
              Κωδικός παραγγελίας:{' '}
              <span className="font-semibold">
                {orderResponse.orderReference}
              </span>
            </p>
            <p className="mt-4 text-gray-600">
              Έχουμε στείλει ένα email επιβεβαίωσης με τις λεπτομέρειες της
              παραγγελίας σας. Παρακαλώ ελέγξτε το email σας (και τον φάκελο
              ανεπιθύμητης αλληλογραφίας).
            </p>
          </div>

          <Link
            href="/"
            className="mt-6 inline-block px-6 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Πίσω στην αρχική
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
};
export default Confirmation;
