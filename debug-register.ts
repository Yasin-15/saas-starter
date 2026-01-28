import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    console.log("Starting DB check...");

    // 1. Check bcrypt
    try {
        console.log("Testing bcrypt...");
        const hashedPassword = await hash("password123", 10);
        console.log("Bcrypt success:", hashedPassword.substring(0, 10) + "...");
    } catch (e) {
        console.error("Bcrypt failed:", e);
        return;
    }

    // 2. Check DB connection
    try {
        console.log("Testing DB connection...");
        const count = await prisma.user.count();
        console.log("User count:", count);
    } catch (e) {
        console.error("DB Connection failed:", e);
        return;
    }

    // 3. Try to clean up test user if exists
    const testEmail = "test-script@example.com";
    try {
        await prisma.tenantUser.deleteMany({
            where: { user: { email: testEmail } }
        })
        await prisma.user.deleteMany({
            where: { email: testEmail }
        })
        console.log("Cleaned up old test users");
    } catch (e) { /* ignore */ }

    // 4. Simulate Register logic
    try {
        console.log("Simulating registration transaction...");

        const email = testEmail;
        const name = "Test Script User";
        const password = "password123";

        const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        })
        console.log("User created:", user.id);

        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-') + "-" + Math.floor(Math.random() * 10000)

        const tenant = await prisma.tenant.create({
            data: {
                name: `${name}'s Org`,
                slug,
                members: {
                    create: {
                        userId: user.id,
                        role: "OWNER" // Check if this matches enum
                    }
                },
                subscription: {
                    create: {
                        plan: "FREE", // Check if this matches enum
                        status: "active"
                    }
                }
            }
        })
        console.log("Tenant created:", tenant.id);
        console.log("SUCCESS: Registration logic works.");

    } catch (e) {
        console.error("Registration logic failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
