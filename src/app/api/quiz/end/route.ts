import { NextRequest, NextResponse } from 'next/server';
import Quiz from '@/config/DB/Models/Quiz.model';
import { jwtVerify } from 'jose';
import { connectDB } from '@/config/DB/connect';

interface QuestionData {
  id: number;
  text: string;
  correctAnswer: number;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { score, totalQuestions, questions, userAnswers } = await req.json();

    // Get the token from the cookies
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    // Verify and decode the token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const decodedToken = payload;

    if (!decodedToken || !decodedToken.userId) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.userId;

    // Create a new quiz entry with detailed information
    const newQuiz = new Quiz({
      user: userId,
      score,
      totalQuestions,
      isCompleted: true,
      questions: questions.map((q: QuestionData, index: number) => ({
        questionId: q.id,
        questionText: q.text,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswers[index]
      }))
    });

    await newQuiz.save();

    return NextResponse.json({ success: true, message: 'Quiz submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
