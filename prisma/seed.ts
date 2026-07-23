import { PrismaClient, Status } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@issue-tracker.dev" },
    update: {
      name: "Admin User",
      hashedPassword,
    },
    create: {
      name: "Admin User",
      email: "admin@issue-tracker.dev",
      hashedPassword,
    },
  });

  const issueCount = await prisma.issue.count();
  if (issueCount === 0) {
    await prisma.issue.createMany({
      data: [
        {
          title: "Fix login redirect after sign in",
          description:
            "Users should land on the dashboard after authenticating successfully.",
          status: Status.OPEN,
          assignedToUserId: admin.id,
        },
        {
          title: "Improve dashboard issue summary cards",
          description:
            "Make status cards clearer with stronger hierarchy and quick filters.",
          status: Status.IN_PROGRESS,
          assignedToUserId: admin.id,
        },
        {
          title: "Add empty state for latest issues",
          description:
            "Show a helpful message when there are no recent issues to display.",
          status: Status.CLOSED,
        },
        {
          title: "Validate assignee updates on issue detail",
          description:
            "Ensure assignee changes persist and show toast feedback on failure.",
          status: Status.OPEN,
        },
        {
          title: "Polish navigation auth menu",
          description:
            "Display user name and email cleanly in the account dropdown.",
          status: Status.IN_PROGRESS,
          assignedToUserId: admin.id,
        },
      ],
    });
  }

  console.log("Seed complete.");
  console.log("Login: admin@issue-tracker.dev / password123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
