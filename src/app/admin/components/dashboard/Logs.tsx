"use client";
import React from "react";
import { useDB } from "../context/dbContext";
import { actionLabels } from "@/app/utils/utils";
import { capitalizeName } from "@/app/utils/functions";

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "hace segundos";
  if (diff < 3_600_000) return `hace ${Math.floor(diff/60_000)}m`;
  if (diff < 86_400_000) return `hace ${Math.floor(diff/3_600_000)}h`;
  const d = new Date(ts).toLocaleDateString("es-VE", { day: "2-digit", month: "short" });
  return d;
}

export default function ActivityWidget() {
  const { logs, canViewUsersLogs } = useDB();
  const latest = (logs ?? []).slice(0, 5);

  if (canViewUsersLogs) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
        <h3 className="font-semibold mb-3">Actividad reciente</h3>
        <ul className="space-y-3">
          {latest.length === 0 && <li className="text-sm text-gray-500">No hay actividad reciente</li>}
          {latest.map((log) => {
            const meta = actionLabels.get(log.action) ?? { label: log.action, color: "" };
            return (
              <li key={log.id} className="flex items-start gap-3">
                <div className={`rounded-full size-5 bg-${meta.color}`}></div>
                <div className={`w-2 h-2 rounded-full mt-2 bg-${meta.color ?? "gray"}-500`} />
                <div className="flex-1">
                  <div className="text-sm">
                    <strong>{capitalizeName(log.username)}</strong>{" "}
                    <span className="opacity-80">· {meta.label}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {log.target ? `${log.target.collection} #${log.target.item}` : ""}
                    {log.diff?.length ? ` — ${log.diff.map(d => `${d.item}: ${d.newValue}`).join(", ")}` : ""}
                  </div>
                </div>
                <div className="text-xs text-gray-400">{timeAgo(log.timestamp)}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return;
  }
}
