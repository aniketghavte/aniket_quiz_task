import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.model';

interface IQuestionAnswer {
  questionId: number;
  questionText: string;
  correctAnswer: number;
  userAnswer: number;
}

export interface IQuiz extends Document {
  user: IUser['_id'];
  score: number;
  totalQuestions: number;
  isCompleted: boolean;
  questions: IQuestionAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionAnswerSchema: Schema = new Schema({
  questionId: Number,
  questionText: String,
  correctAnswer: Number,
  userAnswer: Number
});

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
  isCompleted: {
    type: Boolean,
    default: false
  },
  questions: [QuestionAnswerSchema]
}, {
  timestamps: true 
});

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
