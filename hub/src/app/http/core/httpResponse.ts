import express from "express";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResponse = express.Response<any, Record<string, any>>;
