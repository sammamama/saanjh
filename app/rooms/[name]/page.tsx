import { individualRooms, groupRooms } from "@/data/roomData";
import RoomDetail from "@/components/RoomDetail";
import { toRoomSlug } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const allRooms = [...individualRooms, ...groupRooms];
  const room = allRooms.find((r) => toRoomSlug(r.name) === name);

  if (!room) notFound();

  return <RoomDetail room={room} />;
}
