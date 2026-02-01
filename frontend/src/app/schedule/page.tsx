import type { Metadata } from "next";
import ScheduleContent from "./ScheduleContent";

export const metadata: Metadata = {
    title: "Schedule | Kalam 2026",
    description: "The official event timeline for Kalam 2026. Explore workshops, hackathons, and keynotes.",
};

export default function SchedulePage() {
    return <ScheduleContent />;
}
