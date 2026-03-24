import { individualRooms, groupRooms } from "@/data/roomData";
import RoomsGrid from "@/components/RoomsGrid";

export default function RoomsPage() {
  return <RoomsGrid individualRooms={individualRooms} groupRooms={groupRooms} />;
}
