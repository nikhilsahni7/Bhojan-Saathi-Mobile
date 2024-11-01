import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import admin from "firebase-admin";
import serviceAccount from "./../bhojansaathi-firebase-adminsdk-lanes-639a570afc.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.post(
  "/api/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, firebaseToken } = req.body;

      if (!phone || !firebaseToken) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Verify Firebase token
      const decodedToken = await admin.auth().verifyIdToken(firebaseToken);

      // Create or update user
      const user = await prisma.user.upsert({
        where: { phone },
        update: {
          firebaseUid: decodedToken.uid,
          lastLoginAt: new Date(),
        },
        create: {
          phone,
          firebaseUid: decodedToken.uid,
          lastLoginAt: new Date(),
        },
      });

      // Generate JWT with expiration
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      res.json({ token });
    } catch (error) {
      console.error("Verification error:", error);
      res.status(400).json({ error: "Verification failed" });
    }
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
