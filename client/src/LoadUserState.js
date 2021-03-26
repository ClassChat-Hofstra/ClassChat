import { loadCourses, loadInitialCourses } from "./actions";
import { useAuth } from "./contexts/AuthContext";

export default function LoadUserState() {
  const { currentUser } = useAuth();
  loadCourses(currentUser.email);
}
