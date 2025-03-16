import ReusablePriorityPage from "../_components/PriorityPage";
import { Priority } from "@/state/api";

const HighPage = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default HighPage;
