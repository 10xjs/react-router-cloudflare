import { AsyncLocalStorage } from "node:async_hooks";
import { type Session, redirect } from "react-router";

type SessionData = {
  userId?: number;
};

export const SessionContext = new AsyncLocalStorage<Session<SessionData>>();

export function session() {
  const session = SessionContext.getStore();

  if (!session) {
    throw new Error("SessionContext not set");
  }
  return session;
}

export function setUserId(userId: number | undefined) {
  session().set("userId", userId);
}

export function getUserId() {
  return session().get("userId");
}

export function requireUser() {
  const userId = getUserId();
  if (typeof userId !== "number") {
    throw redirect("/");
  }
  return userId;
}
