import ReusablePriorityPage from "../_components/PriorityPage";
import { Priority } from "@/state/api";

const UrgentPage = () => {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default UrgentPage;
