import { createFileRoute } from "@tanstack/react-router";
import { PlayerApp } from "@/components/player/PlayerApp";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <PlayerApp />;
}
