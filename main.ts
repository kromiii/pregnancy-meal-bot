import { LineEvent } from "./types";
import { sendReply } from "./line";

function doPost(e: GoogleAppsScript.Events.DoPost): void {
  const event = JSON.parse(e.postData.contents).events[0] as LineEvent;
  sendReply(event);
}

// Keep the global function declaration for Apps Script
declare global {
  function doPost(e: GoogleAppsScript.Events.DoPost): void;
}

globalThis.doPost = doPost;
