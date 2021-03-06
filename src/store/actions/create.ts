import API from '@/api';

import { RootState } from '@/types/root';
import { Dispatch } from 'redux';

import { QUIZ } from '@/store/constants';
import { QuizQuestionType } from '@/types';
import { InferActionsType } from '@/utils/typing';

/* DispatchType Usage Example - DispatchType */
type DispatchType = Dispatch<CreateActionsTypes>;

/* DispatchType Usage Example - call */
export const finishCreateQuiz = (name: string) => {
    return async (dispatch: DispatchType, getState: () => RootState) => {
        const { newQuiz } = getState().create;

        try {
            await API.quiz.create(newQuiz, name);

            dispatch(actions.finishQuizCreation());
        } catch (error) {
            console.log(error);
        }
    };
};

export const actions = {
    createQuizQuestion: (question: QuizQuestionType) => ({ type: QUIZ.question.create, question }),
    finishQuizCreation: () => ({ type: QUIZ.creation.finish }),
};

export type CreateActionsTypes = InferActionsType<typeof actions>;
