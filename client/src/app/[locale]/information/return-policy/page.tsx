import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          Πολιτική Επιστροφών
        </h1>

        <div className="prose prose-gray max-w-none">
          {/* Introduction */}
          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-gray-700 leading-relaxed">
              Ως μικρό κατάστημα ηλεκτρονικών ειδών, εφαρμόζουμε αυστηρή πολιτική επιστροφών
              για την προστασία της επιχείρησής μας. Οι επιστροφές γίνονται δεκτές <strong>μόνο</strong> σε
              συγκεκριμένες περιπτώσεις που προβλέπονται από την ελληνική και ευρωπαϊκή νομοθεσία.
            </p>
          </div>

          {/* Section 1: Who Can Return */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Πότε Γίνονται Δεκτές Επιστροφές
            </h2>
            <p className="text-gray-700 mb-4">
              Οι επιστροφές γίνονται δεκτές <strong>αποκλειστικά</strong> στις ακόλουθες περιπτώσεις:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Ελαττωματικά προϊόντα:</strong> Προϊόντα που παρουσιάζουν εργοστασιακό ελάττωμα
                ή δυσλειτουργία από την παραλαβή τους
              </li>
              <li>
                <strong>Λανθασμένη παράδοση:</strong> Λάβατε διαφορετικό προϊόν από αυτό που παραγγείλατε
              </li>
              <li>
                <strong>Ζημιά κατά τη μεταφορά:</strong> Το προϊόν έφτασε φθαρμένο ή σπασμένο
              </li>
            </ul>
          </section>

          {/* Section 2: Right of Withdrawal */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Δικαίωμα Υπαναχώρησης (14 Ημέρες)
            </h2>
            <p className="text-gray-700 mb-4">
              Για αγορές που πραγματοποιούνται μέσω της ιστοσελίδας μας, έχετε δικαίωμα υπαναχώρησης
              εντός <strong>14 ημερών</strong> από την ημερομηνία παραλαβής του προϊόντος,
              χωρίς να χρειάζεται να αιτιολογήσετε την απόφασή σας.
            </p>

            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Όροι Υπαναχώρησης:
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Το προϊόν πρέπει να επιστραφεί στο κατάστημα στην <strong>αρχική του κατάσταση</strong></li>
                <li>• Πρέπει να περιλαμβάνει <strong>όλα τα αξεσουάρ</strong> και την <strong>πρωτότυπη συσκευασία</strong></li>
                <li>• Εάν το προϊόν έχει χρησιμοποιηθεί πέρα από το αναγκαίο για τον έλεγχό του
                    (π.χ. εγκατάσταση, εκτεταμένη χρήση), ενδέχεται να <strong>αφαιρεθεί ποσό</strong> από την επιστροφή χρημάτων</li>
                <li>• Τα <strong>έξοδα επιστροφής</strong> (μεταφορά πίσω στο κατάστημα) <strong>βαρύνουν τον πελάτη</strong></li>
                <li>• Η επιστροφή γίνεται στο φυσικό μας κατάστημα κατά τις ώρες λειτουργίας</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-gray-700 text-sm">
                <strong>⚠️ Σημαντικό:</strong> Το δικαίωμα υπαναχώρησης <strong>ΔΕΝ ισχύει</strong> για
                προϊόντα υγιεινής (ακουστικά, earbuds, earphones) εφόσον έχει ανοιχτεί η συσκευασία τους,
                καθώς και για προϊόντα λογισμικού με σπασμένη σφραγίδα ασφαλείας.
              </p>
            </div>
          </section>

          {/* Section 3: Conditions */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Προϋποθέσεις Επιστροφής
            </h2>
            <p className="text-gray-700 mb-4">
              Για να γίνει δεκτή η επιστροφή, πρέπει να πληρούνται <strong>όλες</strong> οι παρακάτω προϋποθέσεις:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Το προϊόν να βρίσκεται στην αρχική του κατάσταση</li>
              <li>Να περιλαμβάνει όλα τα αξεσουάρ, εγχειρίδια και δώρα που το συνόδευαν</li>
              <li>Να βρίσκεται στην πρωτότυπη συσκευασία του (κουτί, προστατευτικά υλικά)</li>
              <li>Να συνοδεύεται από την απόδειξη αγοράς</li>
              <li>Να μην φέρει σημάδια χρήσης ή φθοράς (εκτός εάν είναι ελαττωματικό)</li>
            </ul>
          </section>

          {/* Section 4: How to Return */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Διαδικασία Επιστροφής
            </h2>
            <p className="text-gray-700 mb-4">
              Οι επιστροφές γίνονται δεκτές <strong>μόνο στο φυσικό μας κατάστημα</strong>
              κατά τις ώρες λειτουργίας μας:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-800 font-medium mb-2">Ωράριο Καταστήματος:</p>
              <ul className="space-y-1 text-gray-700">
                <li>• <strong>Δευτέρα - Παρασκευή:</strong> 10:00-15:30 & 18:00-21:00</li>
                <li>• <strong>Σάββατο:</strong> 10:00-15:30</li>
              </ul>
            </div>
            <p className="text-gray-700">
              Παρακαλούμε να φέρετε μαζί σας το προϊόν με όλα τα παραπάνω στοιχεία και την απόδειξη αγοράς.
              Το προσωπικό μας θα εξετάσει το προϊόν και θα επιβεβαιώσει εάν πληροί τις προϋποθέσεις επιστροφής.
            </p>
          </section>

          {/* Section 5: Refund Process */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Επιστροφή Χρημάτων
            </h2>
            <p className="text-gray-700">
              Εφόσον εγκριθεί η επιστροφή, η επιστροφή των χρημάτων θα πραγματοποιηθεί:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
              <li>Με τον <strong>ίδιο τρόπο πληρωμής</strong> που χρησιμοποιήθηκε για την αγορά</li>
              <li>Εντός <strong>5-7 εργάσιμων ημερών</strong> από την ημερομηνία έγκρισης της επιστροφής</li>
              <li>Για πιστωτικές/χρεωστικές κάρτες, το ποσό θα πιστωθεί στον λογαριασμό σας</li>
              <li>Για πληρωμές με μετρητά, η επιστροφή θα γίνει με μετρητά στο κατάστημα</li>
            </ul>
          </section>

          {/* Section 6: Excluded Products */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Προϊόντα που Εξαιρούνται από Επιστροφές
            </h2>
            <p className="text-gray-700 mb-4">
              Για λόγους υγιεινής και ασφάλειας, τα παρακάτω προϊόντα <strong>δεν μπορούν να επιστραφούν</strong>
              εφόσον έχει ανοιχτεί η συσκευασία τους, <strong>εκτός εάν είναι ελαττωματικά</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ακουστικά (headphones) και ενδώτια (earphones/earbuds)</li>
              <li>Προϊόντα λογισμικού (software) με σπασμένη σφραγίδα</li>
              <li>Οποιοδήποτε προϊόν με σπασμένη σφραγίδα ασφαλείας ή protective seal</li>
              <li>Προϊόντα υγιεινής και προσωπικής φροντίδας</li>
            </ul>
            <p className="text-gray-700 mt-4 italic">
              * Σε περίπτωση που τα παραπάνω προϊόντα είναι ελαττωματικά, η επιστροφή γίνεται κανονικά δεκτή.
            </p>
          </section>

          {/* Section 7: Warranty */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Εγγύηση Προϊόντων
            </h2>
            <p className="text-gray-700">
              Όλα τα προϊόντα μας καλύπτονται από την εγγύηση του κατασκευαστή.
              Για θέματα εγγύησης μετά την περίοδο επιστροφής των 14 ημερών,
              παρακαλούμε επικοινωνήστε μαζί μας για να σας κατευθύνουμε στο
              κατάλληλο εξουσιοδοτημένο service center.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Επικοινωνία
            </h2>
            <p className="text-gray-700">
              Για οποιαδήποτε απορία σχετικά με την πολιτική επιστροφών μας,
              μπορείτε να επικοινωνήσετε μαζί μας στο κατάστημα κατά τις ώρες λειτουργίας
              ή να μας στείλετε μήνυμα μέσω της φόρμας επικοινωνίας μας.
            </p>
          </section>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 italic">
              Η παρούσα πολιτική επιστροφών συμμορφώνεται με την ελληνική και ευρωπαϊκή νομοθεσία
              περί καταναλωτών (Οδηγία 2011/83/ΕΕ και Ν. 2251/1994).
              Τελευταία ενημέρωση: Δεκέμβριος 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
