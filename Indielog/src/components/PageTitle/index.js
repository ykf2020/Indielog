import { useEffect } from "react";
import { useSelector } from "react-redux";
const PageTitle = () => {
  const currentTitle = useSelector((store) => store.pageTitle.currentTitle);
  useEffect(() => {
    document.title = currentTitle;
  }, [currentTitle]);
  return <></>;
};

export default PageTitle;
