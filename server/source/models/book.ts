import mongoose, { Schema } from 'mongoose';
import IBook from '../interfaces/book';

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        extraInformation: { type: String }
    },
    { timestamps: true }
);

/** Mongoose pre-after functions */
/** We can alter the data after its saved,
 * Like triggers
 */
BookSchema.post<IBook>('save', function () {
    this.extraInformation = 'This is some extra info we want to put onto this entry after we save';
});

/** Anytime we use a mongoose function, then function will use IBook,
 * therefore we will have access to our variables
 */
export default mongoose.model<IBook>('Book', BookSchema);
