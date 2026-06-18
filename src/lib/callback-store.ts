import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type ShopAlert = {
  id: string;
  name: string;
  phone: string;
  phoneDigits: string;
  preferredTime: string;
  message: string;
  urgent: boolean;
  status: "pending" | "acknowledged";
  createdAt: string;
  acknowledgedAt?: string;
};

export type ShopAlertInput = {
  name: string;
  phone: string;
  phoneDigits: string;
  preferredTime: string;
  message: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "shop-alerts.json");
const MAX_ALERTS = 100;

async function readAlerts(): Promise<ShopAlert[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as ShopAlert[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAlerts(alerts: ShopAlert[]) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(alerts, null, 2), "utf8");
}

export async function queueCallbackAlert(
  input: ShopAlertInput,
): Promise<ShopAlert> {
  const alerts = await readAlerts();
  const urgent = input.preferredTime.startsWith("ASAP");

  const alert: ShopAlert = {
    id: randomUUID(),
    name: input.name,
    phone: input.phone,
    phoneDigits: input.phoneDigits,
    preferredTime: input.preferredTime,
    message: input.message,
    urgent,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const next = [alert, ...alerts.filter((item) => item.status === "pending")]
    .concat(alerts.filter((item) => item.status === "acknowledged"))
    .slice(0, MAX_ALERTS);

  await writeAlerts(next);
  return alert;
}

export async function getPendingAlerts(): Promise<ShopAlert[]> {
  const alerts = await readAlerts();
  return alerts
    .filter((alert) => alert.status === "pending")
    .sort(
      (a, b) =>
        Number(b.urgent) - Number(a.urgent) ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export async function acknowledgeAlert(id: string): Promise<ShopAlert | null> {
  const alerts = await readAlerts();
  let updated: ShopAlert | null = null;

  const next = alerts.map((alert) => {
    if (alert.id !== id) return alert;
    updated = {
      ...alert,
      status: "acknowledged",
      acknowledgedAt: new Date().toISOString(),
    };
    return updated;
  });

  if (!updated) return null;

  await writeAlerts(next);
  return updated;
}

export async function createTestAlert(): Promise<ShopAlert> {
  return queueCallbackAlert({
    name: "Test Customer",
    phone: "(406) 555-0199",
    phoneDigits: "4065550199",
    preferredTime: "ASAP — truck down / urgent",
    message: "Test alert — 2015 F-250 Power Stroke, check engine light",
  });
}
