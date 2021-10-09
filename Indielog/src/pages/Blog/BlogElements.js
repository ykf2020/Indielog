import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  gray3,
  green2,
  gray4,
  MEDIA_QUERY_1024,
  MEDIA_QUERY_768,
  MEDIA_QUERY_568,
} from "../../utils/constants.js";

export const BlogPageContainer = styled.div`
  min-height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  padding-left: 60px;
  padding-top: 80px;
  justify-content: center;

  ${MEDIA_QUERY_1024} {
    flex-direction: column;
    padding: 80px 10px 0;
    justify-content: start;
    align-items: center;
  }
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 40px;
`;

export const TopicsContainer = styled.div`
  max-height: 200px;
  border-radius: 6px;
  width: 400px;
  border: 1px solid ${gray3};
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  padding: 0 8px;

  ${MEDIA_QUERY_1024} {
    width: 80%;
    padding: 6px 8px;
  }

  ${MEDIA_QUERY_768} {
    width: 90%;
  }
`;

export const Title = styled.h3`
  font-size: 20px;
  color: #010606;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;

  ${MEDIA_QUERY_568} {
    font-size: 1rem;
    margin-top: 0px;
    margin-left: 0px;
  }
`;

export const TopicsWrap = styled.div`
  display:flex;
  flex-wrap: wrap;
  width: 100%:
`;

export const Topic = styled(Link)`
  text-decoration: none;
  color: ${gray3};
  border: 1px solid ${gray3};
  border-radius: 26px;
  height: 26px;
  min-width: 40px;
  background: none;
  padding: 0 10px;
  margin: 6px 6px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;

  &:hover {
    color: ${gray3};
  }

  ${MEDIA_QUERY_568} {
    font-size: 0.5rem;
    margin: 2px 2px;
  }

  ${({ active }) =>
    active &&
    `
    background: ${green2};
    color: white;
    border: none;

    &:hover {
      color: white;
    }
  `}
`;

export const PostLink = styled(Link)`
  text-decoration: none;
`;

export const PaginatorContainer = styled.div`
  margin-top: 30px;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  margin: 0 10px;
  border-radius: 50%;
  border: 1px solid ${gray4};
  font-size: 12px;
  cursor: pointer;
  transiton: all 0.2s ease;
  &:hover {
    color: white;
    background: ${gray4};
    border: none;
  }
`;
