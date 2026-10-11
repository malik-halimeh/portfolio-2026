import { getSkillIcons } from "@/lib/skill-icons";
import { StackProof } from "./StackProof";

/** Server wrapper: resolves the official logos once, so the icon library never ships to the browser. */
export function Stack() {
  return <StackProof icons={getSkillIcons()} />;
}
