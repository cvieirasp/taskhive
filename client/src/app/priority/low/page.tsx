import ReusablePriorityPage from "../_components/PriorityPage";
import { Priority } from "@/state/api";

const LowPage = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default LowPage;
