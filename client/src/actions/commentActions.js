// // commentActions.js
// import {
//     CREATE_COMMENT,
//     EDIT_COMMENT,
//     DELETE_COMMENT,
//     LIKE_COMMENT,
//     DISLIKE_COMMENT,
// } from '../services/actionTypes';
// import * as api from '../services/api';
//
// // Здесь необходимо подставить соответствующие API-запросы
//
// export const createCommentAction = (commentData) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для создания комментария
//         const response = await api.createComment(commentData);
//         dispatch({ type: CREATE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error creating comment:', error);
//     }
// };
//
// export const editCommentAction = (commentId, commentData) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для редактирования комментария
//         const response = await api.editComment(commentId, commentData);
//         dispatch({ type: EDIT_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error editing comment:', error);
//     }
// };
//
// export const deleteCommentAction = (commentId) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для удаления комментария
//         const response = await api.deleteComment(commentId);
//         dispatch({ type: DELETE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error deleting comment:', error);
//     }
// };
//
// export const likeCommentAction = (commentId) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для лайка комментария
//         const response = await api.likeComment(commentId);
//         dispatch({ type: LIKE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error liking comment:', error);
//     }
// };
//
// export const dislikeCommentAction = (commentId) => async (dispatch) => {
//     try {
//         // Здесь вызывайте соответствующий API-метод для дизлайка комментария
//         const response = await api.dislikeComment(commentId);
//         dispatch({ type: DISLIKE_COMMENT, payload: response });
//     } catch (error) {
//         console.error('Error disliking comment:', error);
//     }
// };
