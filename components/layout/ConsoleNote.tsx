"use client";

import { useEffect } from "react";

/** A short note for people who open the console. Runs once, after idle. */
export function ConsoleNote() {
  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        console.log(
          "%cMalik Halimeh%c\nYou opened the console, so you are my kind of visitor.\nSource: https://github.com/malik-halimeh/malik-halimeh-portfolio\nResume as JSON: /resume.json   Portfolio as MCP: /mcp\nEmail: malikhalimeh37@gmail.com",
          "font-weight:700;font-size:16px;color:#5ad39a",
          "font-weight:400;font-size:12px;color:inherit",
        );
      } catch {
        /* no console */
      }
    }, 1500);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
