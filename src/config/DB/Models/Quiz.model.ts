import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.model';
import { IQuizResponse } from './QuizResponse.model';

export interface IQuiz extends Document {
  user: IUser['_id'];
  score: number;
  totalQuestions: number;
  QuizResponse: IQuizResponse;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const QuizSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: [true, 'Please provide a total questions'],
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  QuizResponse: {
    type: Schema.Types.ObjectId,
    ref: 'QuizResponse',
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true 
});

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
