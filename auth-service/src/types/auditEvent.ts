export type AuditEvent = {
  eventType: "USER_REGISTERED" | "USER_LOGGED_IN";
  timestamp: string;
  userId: number;
  metadata: {
    email: string;
  };
};
