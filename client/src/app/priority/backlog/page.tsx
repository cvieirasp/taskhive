import ReusablePriorityPage from "../_components/PriorityPage";
import { Priority } from "@/state/api";

const BacklogPage = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default BacklogPage;
