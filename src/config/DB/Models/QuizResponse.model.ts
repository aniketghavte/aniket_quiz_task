import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.model';

interface IQuestionResponse {
  questionId: mongoose.Types.ObjectId;
  userAnswer: string;
  isCorrect: boolean;
}

export interface IQuizResponse extends Document {
  user: IUser['_id'];
  quizId: mongoose.Types.ObjectId;
  score: number;
  totalQuestions: number;
  responses: IQuestionResponse[];
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionResponseSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  userAnswer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

const QuizResponseSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  responses: [QuestionResponseSchema],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.QuizResponse || mongoose.model<IQuizResponse>('QuizResponse', QuizResponseSchema);
