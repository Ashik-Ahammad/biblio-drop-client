import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import nodemailer from "nodemailer";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db(process.env.DB_NAME);

// Nodemailer Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),

  // Email Password Auth with Reset
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"BiblioDrop" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Reset Your Password",
        html: `
          <div style="font-family: sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #10b981;">BiblioDrop</h2>
            <p>Hello ${user.name}, click the button below to reset your password.</p>
            <a href="${url}" style="display: inline-block; margin-top: 15px; padding: 10px 20px; background: #10b981; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Reset Password
            </a>
          </div>
        `,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        defaultValue: "user", // user, librarian, admin
      },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 3 * 24 * 60 * 60,
    },
  },

  plugins: [
    jwt(),
  ],

});