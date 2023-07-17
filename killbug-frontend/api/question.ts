import request from '../util/request';

interface QuestionForm {
  title: string;
  content: string;
  tags: Array<string>;
}

interface AnswerForm {
  content: string;
  userId: string;
  questionId: string;
}

interface ReplyForm {
  replyType: number;
  commentId: string;
  replyId: string;
  fromUserId: string;
  toUserId: string;
  replyContent: string;
}

interface ThumbupForm {
  likedId: string;
  userId: string;
  type: number;
}

export const createQuestion = (data: QuestionForm) => {
  return request.post('/question/createQuestion', data);
};

export const getQuestionList = (
  pageNum: number,
  pageSize: number,
  type: number,
  token: string=''
): any => {
  return request.get(
    `/question/getQuestionList/${pageNum}/${pageSize}/${type}`,
    { headers: { Authorization: token } }
  );
};

// export const getQuestionList = (
//   pageNum: number,
//   pageSize: number,
//   type: number
// ): any => {
//   return request.get(
//     `/question/getQuestionList/${pageNum}/${pageSize}/${type}`
//   );
// };

export const getQuestion = (id: string, token: string=''): any => {
  return request.get(`/question/getQuestion/${id}`, {
    headers: { Authorization: token },
  });
};

export const getAnswers = (id: string, token: string=''): any => {
  return request.get(`/question/getComments/${id}`, {
    headers: { Authorization: token },
  });
};

export const submitAnswer = (data: AnswerForm) => {
  return request.post('/question/createComment', data);
};

export const submitReply = (data: ReplyForm) => {
  return request.post('/question/createReply', data);
};

export const like = (data: ThumbupForm) => {
  return request.post('/question/like', data);
};
