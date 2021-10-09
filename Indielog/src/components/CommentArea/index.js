import { useState, useEffect } from "react";
import {
  CommentsContainer,
  CommentAddSection,
  Notice,
  CommentAddArea,
  CommentInfo,
  CommentorImgDiv,
  CommentorName,
  CommentTextArea,
  CommentButtons,
  SubmitButton,
} from "./CommentAreaElements.js";
import Comment from "../Comment";
import { useSelector } from "react-redux";
import {
  addNewComment,
  getCommentsOnSnapshot,
  userInfoOnSnapShot,
} from "../../utils/firebase.js";

const CommentArea = ({ area, id }) => {
  const user = useSelector((store) => store.user.currentUser);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  function handleCommentInputSubmit() {
    addNewComment(area, id, commentInput, user.uid).then(() => {
      setCommentInput("");
    });
  }

  useEffect(() => {
    if (!user) return;
    userInfoOnSnapShot(user.uid, setCurrentUser);
  }, [user]);

  useEffect(() => {
    getCommentsOnSnapshot(area, id, setComments);
  }, [area, id]);

  return (
    <CommentsContainer>
      <CommentAddSection>
        <h3>留言</h3>
        {user ? (
          <CommentAddArea>
            <CommentInfo>
              <CommentorImgDiv>
                <img
                  alt=""
                  src={
                    currentUser?.photoURL
                      ? currentUser?.photoURL
                      : "/default-user-image.png"
                  }
                />
              </CommentorImgDiv>
              <CommentorName>{currentUser?.displayName}</CommentorName>
            </CommentInfo>
            <CommentTextArea
              placeholder="點此輸入留言..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            ></CommentTextArea>
            <CommentButtons>
              <SubmitButton onClick={handleCommentInputSubmit}>
                送出留言
              </SubmitButton>
            </CommentButtons>
          </CommentAddArea>
        ) : (
          <Notice>
            請先<span>登入</span>以留言
          </Notice>
        )}
      </CommentAddSection>
      {comments.map((comment) => {
        return <Comment key={comment.id} currentComment={comment}></Comment>;
      })}
    </CommentsContainer>
  );
};

export default CommentArea;
